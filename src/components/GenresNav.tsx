import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button/Button";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function GenresNav({
  selectedGenreId,
  setSelectedGenreId,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

    return (
    <HStack alignItems="center" w="100%" p={2}>
      {genres.map((genre) => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </HStack>
  );
}
