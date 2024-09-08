import { Box, Button, ButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends ButtonProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void
}

export default function PaginationItem({
  isCurrent=false,
  number,
  onPageChange,
  ...rest
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursor: "default",
        }}
        {...rest}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      {...rest}
      onClick={()=>   onPageChange(number)}
    >
      {number}
    </Button>
  );
}
