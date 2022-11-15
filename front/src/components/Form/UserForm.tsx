import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    SimpleGrid,
    VStack,
  } from "@chakra-ui/react";
  import { FormProvider } from "react-hook-form";
  import { Input } from "../Input";
  import * as zod from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { useEffect } from "react";
  
  const newUserValidationSchema = zod
    .object({
      id: zod.number().optional(),
      name: zod.string().min(3, "Informe um nome válido"),
      email: zod.string().email("Informe um e-mail válido"),
      password: zod.string().min(5, "Sua senha deve conter 5 digítos"),
      password_confirmation: zod
        .string()
        .min(5, "Sua senha deve conter 5 digítos"),
      age: zod.string(),
      gender: zod.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Senhas não conferem",
      path: ["password_confirmation"],
    });
  
  export type User = zod.infer<typeof newUserValidationSchema>;
  
  interface UserFormProps {
    userData?: User;
    isModal?: boolean;
    onClose?: () => void;
  }
  
  export function UserForm({ userData, isModal, onClose }: UserFormProps) {
    const navigate = useNavigate();
    const methods = useForm<User>({
      resolver: zodResolver(newUserValidationSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        age: "",
        gender: "",
      },
    });
  
    const { handleSubmit, formState, setValue } = methods;
  
    useEffect(() => {
      if (userData) {
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("password", userData.password);
        setValue("age", userData.age);
        setValue("gender", userData.gender);
      }
    }, []);
  
    async function handleCreteNewUser(data: User) {
      try {
        if (userData) {
          await axios.put(`http://localhost:3000/users/${userData.id}`, {
            name: data.name,
            email: data.email,
            password: data.password,
            age: Number(data.age),
            gender: data.gender,
          });
          toast.success("Usuário editado com sucesso!");
  
          onClose && onClose();
          navigate("/users");
        } else {
          await axios.post("http://localhost:3000/users", {
            name: data.name,
            email: data.email,
            password: data.password,
            age: Number(data.age),
            gender: data.gender,
          });
          toast.success("Usuário criado com sucesso!");
        }
        navigate("/users");
      } catch (error) {
        toast.error("Erro ao criar usuário");
      }
    }
  
    const errors = formState.errors;
    console.log(errors);
  
    return (
      <FormProvider {...methods}>
        <Box as="form" onSubmit={handleSubmit(handleCreteNewUser)}>
          <VStack spacing="8">
            <Grid
              w="100%"
              templateColumns={
                isModal
                  ? ["repeat(3, 1fr)"]
                  : ["repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(8, 1fr)"]
              }
              gap="8"
            >
              <GridItem colSpan={3}>
                <Input
                  name="name"
                  label="Nome Completo"
                  errorMessage={errors.name?.message}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Input
                  name="email"
                  label="E-mail"
                  errorMessage={errors.email?.message}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Input
                  name="age"
                  label="Idade"
                  type="number"
                  errorMessage={errors.age?.message}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Input
                  name="gender"
                  label="Genêro"
                  errorMessage={errors.gender?.message}
                />
              </GridItem>
            </Grid>
  
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                errorMessage={errors.password?.message}
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                errorMessage={errors.password_confirmation?.message}
              />
            </SimpleGrid>
          </VStack>
  
          <Flex mt="8" justify="flex-end" gap="4">
            <Link to="/users">
              <Button colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
            <Button type="submit" colorScheme="blue">
              Salvar
            </Button>
          </Flex>
        </Box>
      </FormProvider>
    );
  }