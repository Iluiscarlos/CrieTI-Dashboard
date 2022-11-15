import { Flex, Box, Heading, Divider } from "@chakra-ui/react";
import { UserForm } from "../components/Form/UserForm";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function UserCreate() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <UserForm />
        </Box>
      </Flex>
    </Flex>
  );
}