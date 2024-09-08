import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
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
  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <Flex justifyContent="space-between" gap={10}>
            <Image
              src={Poster}
              alt={Title}
              width="40rem"
              height="21.25rem"
              fit="cover"
            />
            <Box>
              <Box mb={5}>
                <Heading>Top Gun Maverick (2022)</Heading>
                <Text>Action, Drama .2h 11m</Text>
              </Box>

              <Box>
                <Heading as="h2" size="md" py={2}>
                  Overview
                </Heading>
                <Text>
                  After more than thirty years of service as one of the Navy’s
                  top aviators, and dodging the advancement in rank that would
                  ground him, Pete “Maverick” Mitchell finds himself training a
                  detachment of TOP GUN graduates for a specialized mission the
                  likes of which no living pilot has ever seen.
                </Text>
              </Box>
              <HStack mt={10} justifyContent="space-between" alignItems="center">
                <VStack>
                  <WatchlistStatusBox title="Score" status="83" />
                </VStack>
                <Button>Add to Watchlist</Button>
              </HStack>
            </Box>
          </Flex>
          <Box mt={10}>
            <Heading as='h2' size="md" mb={2}>Cast</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} >
            <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
              <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
              <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
              <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
              <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
              <WatchlistMovieCastCard poster="" name="Tom Cruise With a Long Name" />
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
