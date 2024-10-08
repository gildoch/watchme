import { signOut } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const apiauth = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
});

apiauth.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
            cookies = parseCookies()
            const { "nextauth.refreshToken": refreshToken } = cookies;
            const originalConfig = error.config

            if (!isRefreshing) {
                isRefreshing = true

                apiauth.post('/refresh', {
                    refreshToken,
                }).then(response => {
                    const { token } = response.data;

                    setCookie(undefined, "nextauth.token", token, {
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        path: "/",
                    });
                    setCookie(undefined, "nextauth.refreshToken", response.data.refreshToken, {
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        path: "/",
                    });

                    apiauth.defaults.headers['Authorization'] = `Bearer ${token}`
                    failedRequestQueue.forEach(request => request.onSuccess(token))
                    failedRequestQueue = []
                }).catch(err => {
                    failedRequestQueue.forEach(request => request.onFailure(error))
                    failedRequestQueue = []
                }).finally(() => {
                    isRefreshing = false;
                })
            }

            return new Promise((resolve, reject) => {
                failedRequestQueue.push({
                    onSuccess: (token: string) => {
                        originalConfig.headers['Authorization'] = `Bearer ${token}`
                        resolve(apiauth(originalConfig))
                    },
                    onFailure: (err: AxiosError) => {
                        reject(err)
                    }
                })
            })
        } else {
            signOut()
        }
    }

    return Promise.reject(error)
})