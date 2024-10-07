import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  IconButton,
  Divider,
  Avatar,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { Email } from "@/components/webmailer/types";
import { FaBackward, FaStar } from "react-icons/fa6";

export default function EmailDetail({ email }: { email: Email }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      p={5}
      maxW="800px"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      {/* Header */}
      <HStack justifyContent="space-between" mb={4}>
        <IconButton aria-label="Go back" icon={<FaBackward />} />
        <IconButton aria-label="Star email" icon={<FaStar />} />
      </HStack>

      {/* Sender Information */}
      <HStack spacing={3} mb={4}>
        <Avatar name={email.from} />
        <VStack align="start">
          <Text fontWeight="bold">{email.from}</Text>
          <Text fontSize="sm" color="gray.500">
            {email.from}
          </Text>
        </VStack>
        <Badge ml="auto" colorScheme="green">
          {colorMode === "light" ? "Gelesen" : "Ungelesen"}
        </Badge>
      </HStack>

      <Divider />

      {/* Email Content */}
      <Box mt={4}>
        <Heading size="md" mb={2}>
          {email.subject}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {email.time}
        </Text>
        <Text>{email.content}</Text>
      </Box>
    </Box>
  );
}
