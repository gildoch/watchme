import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Textarea as ChackraTextarea,TextareaProps as ChakraTextareaProps, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  error?: FieldError;
  label?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, TextareaProps> = ({ label, className, error = null, name, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChackraTextarea
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        size="lg"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        ref={ref}
        {...rest}

      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Textarea = forwardRef(InputBase)