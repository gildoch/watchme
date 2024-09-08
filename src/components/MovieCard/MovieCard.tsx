import { Star, Clock } from "react-feather";
import { Box, Flex, HStack, Image } from "@chakra-ui/react";

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export function MovieCard({title,poster,rating,runtime}:MovieCardProps) {
  return (
    <Box position="relative">
      <Image
        src={poster}
        alt={title}
        width="100%"
        height="21.25rem"
        fit="cover"
      />

      <Flex
        position="absolute"
        justifyContent="center"
        top={0}
        bottom={0}
        right={0}
        left={0}
        _hover={{
          bg: "red",
        }}
      >
        <Flex w="100%" flexDirection="column" px={2} >
          <Box as="span" fontWeight={600} fontSize="1rem" mt="auto" mb="0.5rem">
            {title}
          </Box>
          <Flex flexDirection="row" justifyContent="space-between" mb="1rem">
            <Flex
              alignItems="center"
              fontWeight={600}
              px={4}
              py={1}
              align="center"
              gap={2}
            >
              <Star color="#FAE800" /> {rating}
            </Flex>

            <Flex
              alignItems="center"
              fontWeight={600}
              px={4}
              py={1}
              align="center"
              gap={2}
            >
              <Clock color="#FAE800" /> {runtime}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
