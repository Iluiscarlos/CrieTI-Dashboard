import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import { SidebarDrawerContext, SidebarDrawerProvider } from './components/contexts/SidebarDrawerContext';
import { Router } from './Routes';
import { theme } from './styles/theme'

function App() {

  return (
    <AuthProvider>
    <ChakraProvider theme={theme}>
    <SidebarDrawerProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SidebarDrawerProvider>
    </ChakraProvider>
    </AuthProvider>
  )
}

export default App
