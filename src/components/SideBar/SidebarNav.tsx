import { Button, Stack } from "@chakra-ui/react";
import {
    RiContactsLine,
    RiDashboardLine,
    RiGitMergeLine,
    RiInputMethodLine,
} from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";
import { useWatchlists } from "@/hooks/useWatchlists";
import { useState } from "react";
import Link from "next/link";

type Watchlist = {
    id?:string,
    name: string,
    description: string
  }

export default function SiderbarNav() {
    const [page, setPage] = useState(1)
    const {data, isLoading, isFetching, error} = useWatchlists(page)
    console.log(data);
    

    return (
    <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
            <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
            <NavLink icon={RiContactsLine} href="/users">Usuarios</NavLink>
        </NavSection>

        <NavSection title="WATCHLISTS">
            <Link href="/watchlist/create"><Button leftIcon={<RiInputMethodLine />}>Create Watchlist </Button></Link>
            {/* {data?.watchlists.map((list:Watchlist)=>(<NavLink icon={RiInputMethodLine} href="/forms">{list.name}</NavLink>))} */}
            <NavLink icon={RiInputMethodLine} href="/watchlist">My Lists</NavLink>
        </NavSection>
    </Stack>)
}