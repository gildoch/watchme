import { Icon } from "../Icon";
import { ButtonHTMLAttributes } from "react";
import { Button as ChackraButton, ButtonGroup } from "@chakra-ui/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  selected: boolean;
}

export function Button({ iconName, title, selected, ...rest }: ButtonProps) {
  return (


      <ChackraButton
        name={iconName}
        w="100%"
        maxW="20rem"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={0}
        borderRadius={10}
        bg="gray.500"
        fontSize="1.125rem"
        padding="1.1875rem 2rem"
        color={selected ? "#FAE800" : "#FBFBFB"}
        leftIcon={<Icon name={iconName} color={selected ? "#FAE800" : "#FBFBFB"} />}
        _hover={{
          bg:"blue"
        }}
        
        transition="background 200ms"
        {...rest}
      >
        {title}
      </ChackraButton>

  );
}
