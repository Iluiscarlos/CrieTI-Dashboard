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
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { User, UserForm } from "../Form/UserForm";

export default function UserEdit() {
  const [user, setUser] = useState<User>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  console.log(isOpen);

  const UserEditModal = useMemo(() => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm userData={user} isModal onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }, [isOpen, onClose]);

  return {
    onOpen,
    onClose,
    UserEditModal,
    setUser,
    isOpen,
  };
}