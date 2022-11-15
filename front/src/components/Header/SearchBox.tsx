import { Flex, Icon, Input } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

export function SearchBox(){
    return(
        <Flex as="label" flex="1" py="4" px="8" ml="6" maxW={400} alignSelf="center" color="gray.200" position="relative" bg="gray.800" borderRadius="full">
            <Input color="gray.500" px="4" mr="4" placeholder="Busque na plataforma" variant="unstyled" />
            <Icon as={MagnifyingGlass} fontSize={20} />
            </Flex>
    )
}