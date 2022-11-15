import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { List } from "phosphor-react";
import { useContext } from "react";
import { SidebarDrawerContext } from "../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header(){
    const {onOpen} = useContext(SidebarDrawerContext);
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    console.log(isWideVersion)
    return(
        <Flex as="header" w="100vw" h="20" maxW={1480} mx="auto" mt="4" px="6" align="center" borderBottomWidth={1} borderColor="gray.700">

            {!isWideVersion && (<IconButton aria-label="Abrir Navegação"  icon={<Icon as={List} fontSize={24}/>} variant="unstyled" mr="2" onClick={onOpen} />)}
            <Logo />
            {isWideVersion && <SearchBox />}
            
                <Flex align="center" ml="auto">
                <NotificationNav />
                <Profile showProfileData={isWideVersion} />
                </Flex>
        </Flex>
    )
}