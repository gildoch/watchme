import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { convertStringToLocalDate } from "@/utils/convertStringToDate";
import NextLink from "next/link";
import { api } from "@/services/api";
import { useState } from "react";
import { queryClient } from "@/services/queryClient";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useUsers } from "@/hooks/useUsers";
import Pagination from "@/components/Pagination";

type User = {
  id: string,
  name: string,
  email: string,
  created_at: string,
}

export default function UserList() {
  const [page, setPage] = useState(1)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { data, isFetching, isLoading, error } = useUsers(page)


  async function handlePreFetchUser(userId: string) {
    await queryClient.prefetchQuery({
      queryKey: ["users", userId], queryFn: async () => {
        const { data } = await api.get(`/api/users/${userId}`)
        return data
      }
    })
  }


  return (
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px={["4", "6"]} pt={["4", "6"]}>
        <SideBar />

        <Box p={["4", "6", "8"]} bg="gray.800" borderRadius={8} flex="1">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (<Spinner size='sm' marginLeft="2" />)}
            </Heading>
            <NextLink href="/users/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuarios</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="6" >
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Th>
                    <Th>Usuarios</Th>
                    {isWideVersion && (<Th>Data de cadastro</Th>)}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map((user: User) => {
                    return (<Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink"></Checkbox>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePreFetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (<Td>
                        <Text>{convertStringToLocalDate(`${user.created_at}`)}</Text>
                      </Td>)}
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        >
                        </Button>
                      </Td>
                    </Tr>)
                  })}
                </Tbody>
              </Table>
              <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}
