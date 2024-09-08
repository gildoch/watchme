import { useEffect, useState } from "react";
import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { api } from "@/services/api";

import { Content } from "@/components/Content";
import { GenresNav } from "@/components/GenresNav";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export default function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <Flex direction="column" h="100vh" >
      <Header />
      <Flex w="100%" maxW={1480} mx="auto" px="6" pt="8" >
        <SideBar />
        <Stack w="100%">
          <Box>
            <Text>
              Genre
            </Text>
          <GenresNav
            selectedGenreId={selectedGenreId}
            setSelectedGenreId={setSelectedGenreId}
          />
          </Box>
          <Content
            selectedGenre={selectedGenre}
            selectedGenreId={selectedGenreId}
          />
        </Stack>
      </Flex>
    </Flex>
  );
}
