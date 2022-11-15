import { Box, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useContext } from "react";
import { SidebarDrawerContext } from "../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const {isOpen, onClose} = useContext(SidebarDrawerContext);
    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    })
    console.log(isOpen)
    console.log(isOpen)
        
        if(isDrawerSidebar){
        return(
        <Drawer isOpen={isOpen} onClose={onClose} placement="left" >
            <DrawerOverlay>
                <DrawerContent bg="gray.800 " p="8">
                <DrawerCloseButton />
                <DrawerHeader>Navegação</DrawerHeader>
                <SidebarNav />
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )}
    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    )
}