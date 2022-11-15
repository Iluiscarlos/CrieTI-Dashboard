import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Icon,
    Text,
    Flex,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { WarningCircle } from "phosphor-react";
  import { useMemo, useState } from "react";
  import { Link } from "react-router-dom";
  import { User } from "../Form/UserForm";
  import { toast } from "react-toastify";
  
  export default function UserDelete() {
    const [user, setUser] = useState<User>();
    const { isOpen, onClose, onOpen } = useDisclosure();
  
    async function handleDelete() {
      console.log(user);
      if (user) {
        await axios.delete(`http://localhost:3000/users/${user.id}`);
  
        toast.success("Usuário excluído com sucesso");
        onClose();
      }
    }
  
    const UserDeleteModal = useMemo(() => {
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Icon as={WarningCircle} color="red" font-size={50} mb={4} />
              <Text>Você está escluindo o usuário {user?.name}</Text>
              <Text>Essa ação é irreversível</Text>
            </ModalBody>
            <ModalFooter>
              <Flex mt="8" justify="flex-end" gap="4">
                <Link to="/users">
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button onClick={handleDelete} colorScheme="red">
                  Confirmar
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    }, [isOpen, onClose]);
  
    return {
      onOpen,
      onClose,
      UserDeleteModal,
      setUser,
      isOpen,
    };
  }