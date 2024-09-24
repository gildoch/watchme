import Header from "@/components/Header";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import WatchlistStatusBox from "@/components/WatchlistStatusBox";
import { useMovies } from "@/hooks/useMovies";
import { api } from "@/services/api";
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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

type WatchlistDetailsProps = {
    id: string,
    name: string,
    description: string
  }

export default function WatchlistDetails() {
    const router = useRouter();
    const { id } = router.query;
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, error } = useMovies(page);
  const [watchlist, setWatchlist] = useState<WatchlistDetailsProps>(null);
  console.log("Watch",watchlist);
  

  useEffect(() => {
    if (id) {      
      const fetchMovieDetails = async () => {
        const { data, headers } = await api.get(`/api/watchlists/${id}`)       
        setWatchlist(data.watchlist[0]);
      };
      fetchMovieDetails();
    }
  }, [id]);

  if (!watchlist) return <div>Loading...</div>;

  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box as="form" p={["6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <HStack pb={4}>
            <Heading>{watchlist.name.toUpperCase()}</Heading>
            <Link href="/watchlist/edit">
              <RiEditBoxLine size={30} />
            </Link>
          </HStack>
          <Text variant="h5">About this watchlist</Text>
          <Text>{watchlist.description}</Text>
          <HStack py={4}>
            <WatchlistStatusBox title="ITEMS ON LIST" status="10" />
            <WatchlistStatusBox title="UNWATCHED RUNTIME" status="14h 30m" />
            <WatchlistStatusBox title="ITEMS ON LIST" status="73" />
          </HStack>
          <Box as="main" w="100%" mt={6}>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {data?.movies.map((movie: Movie) => (
                <GridItem
                key={movie.imdbID}>
                  <MovieCard
                    
                    imdbID={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    runtime={movie.Runtime}
                    rating={movie.Ratings[0].Value}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Pagination
            totalCountOfRegisters={24}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}

