import {extendTheme} from '@chakra-ui/react';


export const theme = extendTheme({
    colors: {
        gray: {
            900: "#181B23",
        },
    },
    styles:{
        global: {
            fonts: {
                heading: "Reboto",
                body: "Reboto",
            },
            body:{
            bg: "gray.900",
            color: "gray.50",
            }
        }
    }
});