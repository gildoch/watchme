import { api } from "../services/api";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard/MovieCard";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { useMovies } from "@/hooks/useMovies";
import { queryClient } from "@/services/queryClient";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  selectedGenre: {
    title: string;
  };
  selectedGenreId: number;
};

export function Content({ selectedGenre, selectedGenreId }: ContentProps) {
  
  const [page, setPage] = useState(1)

  const {data, isFetching, isLoading, error} = useMovies(page)
    
  async function handlePreFetchMovie(imdbID: string) {
    await queryClient.prefetchQuery({
      queryKey: ["movies", imdbID], queryFn: async () => {
        const { data } = await api.get(`/api/movies/${imdbID}`)
        return data
      }
    })
  }

  return (
    <Box w="100%" m="0 auto" p={6}>
      <Box as="header">
        <Box
          as="span"
          display="block"
          mt={4}
          fontSize="2.25rem"
          fontWeight={600}
          color="#FAE800"
        >
          <Box as="span"> {selectedGenre.title}</Box>
        </Box>
      </Box>

      <Box as="main" w="100%" mt={6} >
        <Grid templateColumns="repeat(4, 1fr)" gap={6} >
          {data?.movies.map((movie:Movie) => (
            <GridItem >
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
