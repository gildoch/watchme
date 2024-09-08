import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}
export default function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (<Box>
        <Text>Gildo Chauze</Text>
        <Text color="gray.300" fontSize="small">
          gildochauze@gmail.com
        </Text>
      </Box>)}

      <Avatar
        ml="4"
        size="md"
        name="Gildo Chauze"
        src="https://github.com/gildoch.png"
      />
    </Flex>
  );
}
