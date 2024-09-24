import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WatchlistMovieCastCard from "@/components/WatchlistMovieCastCard";
import WatchlistStatusBox from "@/components/WatchlistStatusBox";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { api } from "@/services/api";

type MovieDetailsProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  Genre: string;
  Plot: string;
  Metascore: string;
  Actors: string
};

export default function MovieDetails({
  Poster,
  Title,
  Ratings,
  Runtime,
  Genre,
  Plot,
  Metascore,
}: MovieDetailsProps) {
  
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetailsProps>(null);
    
  useEffect(() => {
    if (id) {      
      const fetchMovieDetails = async () => {
        const { data, headers } = await api.get(`/api/movies/${id}`)       
        setMovie(data.movie[0]);
      };
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <Flex justifyContent="space-between" gap={10}>
            <Image
              src={movie.Poster}
              alt={Title}
              width="40rem"
              height="21.25rem"
              fit="cover"
            />
            <Box>
              <Box mb={5}>
                <Heading>{movie.Title}</Heading>
                <Text>{movie.Genre} - {movie.Runtime}</Text>
              </Box>

              <Box>
                <Heading as="h2" size="md" py={2}>
                  Overview
                </Heading>
                <Text>
                  {movie.Plot}
                </Text>
              </Box>
              <HStack mt={10} justifyContent="space-between" alignItems="center">
                <VStack>
                  <WatchlistStatusBox title="Score" status={movie.Metascore} />
                </VStack>
                <Button>Add to Watchlist</Button>
              </HStack>
            </Box>
          </Flex>
          <Box mt={10}>
            <Heading as='h2' size="md" mb={2}>Cast</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} >
              {movie.Actors}             
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
