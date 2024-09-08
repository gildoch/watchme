import { Input } from "@/components/Form/Input";
import { Textarea } from "@/components/Form/TextArea";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import WatchlistMovieDeleteCard from "@/components/WatchlistMovieDeleteCard";
import { useMovies } from "@/hooks/useMovies";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type CreateWatchlistFormData = {
  name: string;
  description: string;
};

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

const CreateWatchlistFormSchema = yup.object().shape({
  name: yup.string().required("Please Provide a Name"),
  description: yup.string(),
});

export default function EditWatchlist() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, error } = useMovies(page);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateWatchlistFormData>({
    resolver: yupResolver(CreateWatchlistFormSchema),
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box as="form" p={["6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <HStack justifyContent="space-between">
            <Heading size="lg" fontWeight="normal">
              Edit your Watchlist
            </Heading>
            <Button color="red">Delete Watchlist</Button>
          </HStack>
          <Divider my="6" borderColor="gray.700"></Divider>
          <VStack spacing={["6", "8"]}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input {...register("name")} name="name" error={errors.name} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Description</FormLabel>
              <Textarea
                {...register("description")}
                name="description"
                error={errors.description}
              />
            </FormControl>
          </VStack>
          <Box pt={6} >
            <Text>Movies</Text>
            {data?.movies.map((movie:Movie)=>(<WatchlistMovieDeleteCard poster={movie.Poster} title={movie.Title}  />))}
            
          </Box>
          <Pagination totalCountOfRegisters={24} currentPage={page} onPageChange={setPage} />
          <Flex mt="8" justify="flex-start">
            <HStack spacing="4">
              <Link href="/watchlist" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink">
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
