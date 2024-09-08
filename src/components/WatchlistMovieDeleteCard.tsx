import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  id?: string;
}

export default function WatchlistMovieDeleteCard({
  id,
  poster,
  title,
}: MovieCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" mb={2}>
      <HStack justifyContent="space-between" p={2}>
        <Image
          src={poster}
          alt={title}
          width="2rem"
          height="3rem"
          fit="cover"
        />
        <Text>{title}</Text>
        <Button color="red" borderColor="pink.400" size="sm">Remove</Button>
      </HStack>
    </Box>
  );
}
