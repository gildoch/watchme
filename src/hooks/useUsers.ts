import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type GetUsersResponse = {
    totalCount:number;
    users:User[]
}
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/api/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);
  const { users } = data;
  
  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });
}
