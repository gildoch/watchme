import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import Button from "./PaginationItem";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void

}


function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export default function Pagination({ totalCountOfRegisters, registerPerPage = 10, currentPage = 1, onPageChange }: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)
  const siblingsCount = 1
  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  return (
    <Stack
      direction={["column", "row"]}
      mt={["6", "8"]}
      justify="space-between"
      align="center">
      <Box>
        <strong>0-10</strong> de <strong>100</strong>
      </Box>

      <HStack spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange}  number={1} />
            {currentPage > (2 + siblingsCount) && <Text color='gray.300' width='8' textAlign='center'>...</Text>}
          </>)}

        {previousPages.length > 0 && (previousPages.map(page => (<PaginationItem onPageChange={onPageChange}  key={page} number={page} />)))}

        <PaginationItem onPageChange={onPageChange}  number={currentPage} isCurrent />

        {nextPages.length > 0 && (nextPages.map(page => (<PaginationItem onPageChange={onPageChange}  key={page} number={page} />)))}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + siblingsCount + 1) < lastPage && <Text color='gray.300' width='8' textAlign='center'>...</Text>}
            <PaginationItem onPageChange={onPageChange}  number={lastPage} />
          </>)}
      </HStack>
    </Stack>
  );
}
