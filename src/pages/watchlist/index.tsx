import Header from "@/components/Header";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import WatchlistStatusBox from "@/components/WatchlistStatusBox";
import { useMovies } from "@/hooks/useMovies";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";

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

export default function index() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, error } = useMovies(page);
  
  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box as="form" p={["6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <HStack pb={4}>
            <Heading>Movies by Tom Cruise</Heading>
            <Link href="/watchlist/edit">
              <RiEditBoxLine size={30} />
            </Link>
          </HStack>
          <Text variant="h5">About this watchlist</Text>
          <Text>This list lorem ipsum dolor et blah blah blah</Text>
          <HStack py={4}>
            <WatchlistStatusBox title="ITEMS ON LIST" status="10" />
            <WatchlistStatusBox title="UNWATCHED RUNTIME" status="14h 30m" />
            <WatchlistStatusBox title="ITEMS ON LIST" status="73" />
          </HStack>
          <Box as="main" w="100%" mt={6}>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {data?.movies.map((movie: Movie) => (
                <GridItem>
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
          <Pagination totalCountOfRegisters={24} currentPage={page} onPageChange={setPage} />
        </Box>
      </Flex>
    </Box>
  );
}
