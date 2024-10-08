import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";


export default function SearchBox() {
  const [search, setSearch] = useState("")
  console.log(search);
  
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search"
        _placeholder={{
          color: "gray.400",
        }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
