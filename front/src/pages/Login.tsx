import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Input";

import * as zod from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const newLoginValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Informe o seu email")
    .email("Informe um e-mail válido"),
  password: zod.string().min(1, "Informe a sua senha"),
});

type Login = zod.infer<typeof newLoginValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState("");

  const { signIn } = useContext(AuthContext);

  const methods = useForm<Login>({
    resolver: zodResolver(newLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState } = methods;

  async function handleSubmitLogin(data: Login) {
    const login = await signIn(data);
    if (login) {
      navigate("/users");
    } else {
      setErrorLogin("Login e/ou senha incorreto(s)");
    }
  }

  const errors = formState.errors;

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <FormProvider {...methods}>
        <Flex
          as="form"
          onSubmit={handleSubmit(handleSubmitLogin)}
          w="100%"
          maxW={360}
          p="8"
          bg="gray.700"
          borderRadius={8}
          flexDir="column"
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              label="Email"
              errorMessage={errors?.email?.message}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              errorMessage={errors?.password?.message}
            />
          </Stack>
          <Button type="submit" mt="6" size="lg" colorScheme="blue">
            Entrar
          </Button>
          {errorLogin && (
            <Text color="red" mt={3} align="center">
              {errorLogin}
            </Text>
          )}
        </Flex>
      </FormProvider>
    </Flex>
  );
}