import { createContext, ReactNode, useContext, useEffect } from 'react'

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router';

interface SidebarDrawerProviderProps {
    children: ReactNode;
}

type SiderbarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SiderbarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
    const disclosure = useDisclosure()
    const router = useRouter()

    useEffect(()=>{
        disclosure.onClose()
    },[router.asPath])

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)