import { Input } from "@/components/Form/Input";
import { Textarea } from "@/components/Form/TextArea";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type CreateWatchlistFormData = {
  name: string;
  description: string;
};

const CreateWatchlistFormSchema = yup.object().shape({
  name: yup.string().required("Please Provide a Name"),
  description: yup.string(),
});

export default function CreateWatchlist() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateWatchlistFormData>({
    resolver: yupResolver(CreateWatchlistFormSchema),
  });

  const router = useRouter();

  const createWatchlist = useMutation({
    mutationFn: async (watchlist: CreateWatchlistFormData) => {
      const response = await api.post("/api/watchlist", {
        watchlist: {
          ...watchlist,
          created_at: new Date(),
        },
      });

      return response.data.watchlist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const handleCreateWatchlist: SubmitHandler<CreateWatchlistFormData> = async (
    values
  ) => {
    await createWatchlist.mutateAsync(values);
    router.push("/watchlist");
    console.log(values);
    
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />

        <Box
          as="form"
          p={["6", "8"]}
          bg="gray.800"
          borderRadius={8}
          flex="1"
          onSubmit={handleSubmit(handleCreateWatchlist)}
        >
          <Heading size="lg" fontWeight="normal">
            Create a new Watchlist
          </Heading>
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
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/watchlist" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>Save</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
