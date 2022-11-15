import { Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean;
}


export function Profile({showProfileData = false}: ProfileProps){
    return (
        <>
         {showProfileData && (
            <Box mr="4" textAlign="right">
                <Text>Luís Carlos</Text>
                <Text>luiskochenborger@gmail.com</Text>
            </Box>
        )}
            <Avatar size="md" name="Luís Carlos" src="http://github.com/Iluiscarlos.png" />
        </>
    )
}