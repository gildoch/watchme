import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type Watchlist = {
  id:string,
  name: string,
  description: string
}

type GetWatchlistResponse = {
    totalCount:number;
    watchlists:Watchlist[]
}

export async function getWatchlists(page: number): Promise<GetWatchlistResponse> {
  const { data, headers } = await api.get("/api/watchlists",
    {
      params: {
        page,
      },
    }
  );

  const totalCount = Number(headers["x-total-count"]);
  const { watchlists } = data;
  
  return {
    watchlists,
    totalCount,
  };
}

export function useWatchlists(page: number) {
  return useQuery({
    queryKey: ["watchlists", page],
    queryFn: () => getWatchlists(page),
  });
}
