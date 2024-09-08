import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

type CardProps = {
    title:string,
    status:string
}
export default function WatchlistStatusBox({status,title}:CardProps) {
  return (
    <VStack py={2} px={4} borderWidth="1px" borderColor="pink.400">
      <Text >{title}</Text>
      <Text fontSize="2rem" color="pink.400">{status}</Text>
    </VStack>
  )
}
