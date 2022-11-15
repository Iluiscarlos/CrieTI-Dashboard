import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";

interface SidebarDrawerProviderProps{
    children: ReactNode;
}

type SidebarDrawerContext = UseDisclosureReturn;

export const SidebarDrawerContext = createContext({} as SidebarDrawerContext);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps){

    const disclosure = useDisclosure()
    return(
        
        <SidebarDrawerContext.Provider value={disclosure}>{children}</SidebarDrawerContext.Provider>
    )
}