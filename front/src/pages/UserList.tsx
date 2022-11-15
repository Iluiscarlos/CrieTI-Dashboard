import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  theme,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Plus, PencilSimple, Trash } from "phosphor-react";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";

import useUserEditModal from "../components/Modais/UserEditModal";
import useUserDeleteModal from "../components/Modais/UserDeleteModal";
import { Table } from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../components/Form/UserForm";

export function UserList() {
  const {
    onOpen: openEditModal,
    UserEditModal,
    setUser: setUserEditModal,
    isOpen: isOpenEdit,
  } = useUserEditModal();
  const {
    onOpen: openDeleteModal,
    UserDeleteModal,
    setUser: setUserDeleteModal,
    isOpen: isOpenDelete,
  } = useUserDeleteModal();
  const [users, setUsers] = useState<User[]>([]);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    axios.get<User[]>("http://localhost:3000/users").then((response) => {
      setUsers(response.data);
    });
  }, [isOpenEdit, isOpenDelete]);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.colors.blue[100],
              borderRadius: "12px",
            },
          }}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link to="/users/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={Plus} fontSize={16} />}
              >
                Novo usuário
              </Button>
            </Link>
          </Flex>

          <Table header={["Usuário", "Idade", "Genêro", ""]}>
            <Tbody>
              {users.map((user) => {
                return (
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="blue" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    <Td>{user.age}</Td>
                    <Td>{user.gender}</Td>
                    <Td>
                      {isWideVersion ? (
                        <HStack>
                          <Button
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={PencilSimple} fontSize={16} />}
                            onClick={() => {
                              openEditModal();
                              setUserEditModal(user);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            fontSize="sm"
                            colorScheme="red"
                            leftIcon={<Icon as={Trash} fontSize={16} />}
                            onClick={() => {
                              openDeleteModal();
                              setUserDeleteModal(user);
                            }}
                          >
                            Excluir
                          </Button>
                        </HStack>
                      ) : (
                        <HStack>
                          <IconButton
                            aria-label="Editar"
                            icon={<Icon as={PencilSimple} fontSize={16} />}
                            fontSize={24}
                            colorScheme="pink"
                            mr="2"
                            onClick={() => {
                              openEditModal();
                              setUserEditModal(user);
                            }}
                          />
                          <IconButton
                            aria-label="Excluir"
                            icon={<Icon as={Trash} fontSize={16} />}
                            fontSize={24}
                            colorScheme="red"
                            mr="2"
                            onClick={() => {
                              openDeleteModal();
                              setUserDeleteModal(user);
                            }}
                          />
                        </HStack>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
      {UserEditModal}
      {UserDeleteModal}
    </Flex>
  );
}