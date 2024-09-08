import { Flex, Button, Stack, Heading, Divider, Text } from "@chakra-ui/react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/Form/Input";
import Link from "next/link";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
  password: yup.string().required("Password Obrigatorio"),
});

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInFormSchema) });

  console.log(errors);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Heading as="h5" size="md">
          Hello! Please log in or create an account to use the features of this
          app
        </Heading>
        <Divider my="6" borderColor="gray.700"></Divider>
        <Stack spacing="4">
          <Input
            {...register("email")}
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
          />

          <Input
            {...register("password")}
            name="password"
            type="password"
            label="Password"
            error={errors.password}
          />
        </Stack>

        <Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            isLoading={isSubmitting}
          >
            {" "}
            Log in
          </Button>
          <Link href="/signup">
          or
            <Text as="span" color="pink.400"> create an account</Text>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
}
