import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";


interface NavLinkProps extends LinkProps{
    children:string,
    icon: ElementType
    href:string
}
export default function NavLink({children,href, icon, ...rest}:NavLinkProps) {
    
  return (
    <ActiveLink href={href}>
    <ChakraLink display="flex" alignItems="center" {...rest} as='div'>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
    </ActiveLink>
  );
}
