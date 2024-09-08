import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    SimpleGrid,
    VStack,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { useMutation } from "@tanstack/react-query";
  import { api } from "@/services/api";
  import { queryClient } from "@/services/queryClient";
  import { useRouter } from "next/router";
  import Header from "@/components/Header";
  import SideBar from "@/components/SideBar";
  import { Input } from "@/components/Form/Input";
  
  type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatorio"),
    email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
    password: yup
      .string()
      .required("Password Obrigatorio")
      .min(6, "No minimo 6 caracteres"),
    password_confirmation: yup.string().required().oneOf([yup.ref('password')], "As Senhas devem ser iguais"),
  });
  
  export default function CreateUser() {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm<CreateUserFormData>({
      resolver: yupResolver(createUserFormSchema),
    });
  
    const router = useRouter()
  
    const createUser = useMutation({
      mutationFn: async (user: CreateUserFormData) => {
        const response = await api.post("/api/users", {
          user: {
            ...user,
            created_at: new Date()
          }
        })
  
        return response.data.user
      },
      onSuccess: () => {queryClient.invalidateQueries({queryKey:['users']})}
    })
  
    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
      values
    ) => {
      await createUser.mutateAsync(values)
      router.push('/users')
    };
  
    return (
      
        <Flex w="100%" h="100vh" maxWidth={1480} m="auto" px="6" pt="8" alignItems="center">
          <Box
            as="form"
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            flex="1"
            onSubmit={handleSubmit(handleCreateUser)}
          >
                    <Heading as='h5' size="md" mb={30}>Hello!
Please log in or create an account
to use the features of this app</Heading>
            <Divider my="6" borderColor="gray.700"></Divider>
            <VStack spacing={["6", "8"]}>
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...register("name")} name="name" error={errors.name} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    {...register("email")}
                    name="email"
                    type="email"
                    error={errors.email}
                  />
                </FormControl>
              </SimpleGrid>
  
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <FormControl>
                  <FormLabel htmlFor="password">Password *</FormLabel>
                  <Input
                    {...register("password")}
                    name="password"
                    type="password"
                    error={errors.password}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirmaSenha">
                    Comfirm Password *
                  </FormLabel>
                  <Input
                    {...register("password_confirmation")}
                    name="password_confirmation"
                    type="password"
                    error={errors.password_confirmation}
                  />
                </FormControl>
              </SimpleGrid>
            </VStack>
  
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Sign in
                  </Button>
                </Link>
                <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>Create Profile</Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      
    );
  }
  