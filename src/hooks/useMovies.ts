import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


type GetMoviesResponse = {
  totalCount: number;
  movies: Movie[]
}

console.log(process.env.NEXT_PUBLIC_OMDB);

export async function getMovies(page: number): Promise<GetMoviesResponse> {
  const { data, headers } = await api.get("/api/movies", {
    params: {
      page,
    },


  });

  const totalCount = Number(headers["x-total-count"]);
  const { movies } = data;
  return {
    movies,
    totalCount,
  };
}

export function useMovies(page: number) {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMovies(page),
  });
}
