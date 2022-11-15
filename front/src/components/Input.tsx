import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  errorMessage?: string;
}

export function Input({ name, label, errorMessage, ...rest }: InputProps) {
  const { register } = useFormContext();

  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        id={name}
        bgColor="gray.900"
        variant="filled"
        borderColor={errorMessage && "red"}
        size="lg"
        focusBorderColor="blue.400"
        _hover={{ bgColor: "gray.900" }}
        {...register(name)}
        {...rest}
      />
      <Text color="red">{errorMessage}</Text>
    </FormControl>
  );
}