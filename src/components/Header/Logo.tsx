import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text fontSize={["2xl","3xl"]} fontWeight="bold" letterSpacing="tight" w="60">
      Watchme
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
}
