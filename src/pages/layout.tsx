import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function layout() {
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
        ></Box>
      </Flex>
    </Box>
  );
}
