import { Image, Text, VStack } from "@chakra-ui/react";

import React from "react";

type CastProps = {
  poster: string;
  name: string;
};
export default function WatchlistMovieCastCard({ name, poster }: CastProps) {
  return (
    <VStack>
      <Image
        src={poster}
        alt={name}
        width="124.29px"
        height="32.58px"
        fit="cover"
      />
      <Text>{name}</Text>
    </VStack>
  );
}
