import {
  Flex,
  Box,
  Text,
  HStack,
  Input,
  VStack,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

// define the animation variants
const fadeInUpwards = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7, // This will make the animation take 1 second.
    },
  },
};

const SignUp = () => {
  return (
    <>
      <Flex
        initial="hidden"
        animate="visible"
        variants={fadeInUpwards}
        as={motion.div}
        className="login_container"
        width={"400px"}
        height={"400px"}
        borderRadius={"5px"}
        padding={"50px"}
        bg={"white"}
        boxShadow={"xl"}
        flexDir={"column"}
      >
        <VStack marginTop={"50px"} width={"full"} height={"full"} spacing={"5"}>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <EmailIcon color={"gray.400"} />
            </InputLeftElement>
            <Input
              placeholder="Email address..."
              fontFamily={"Raleway"}
              outline={"none"}
              fontWeight={"bold"}
              size={"sm"}
              width={"full"}
              variant={"flushed"}
              type="email"
              required="true"
            />
          </InputGroup>
          <InputGroup marginTop={"10px"}>
            <InputLeftElement pointerEvents={"none"}>
              <LockIcon color={"gray.400"} />
            </InputLeftElement>
            <Input
              placeholder="Password..."
              fontFamily={"Raleway"}
              outline={"none"}
              fontWeight={"bold"}
              size={"sm"}
              width={"full"}
              variant={"flushed"}
              type="email"
              required="true"
            />
          </InputGroup>
          <Button
            width={"full"}
            color={"gray.800"}
            fontWeight={"bold"}
            fontSize={"lg"}
            fontFamily={"Raleway"}
            bg={"orange.300"}
            marginTop={"10px"}
          >
            Signup
          </Button>
          <Text fontFamily={"Rajdhani"} fontWeight={"bold"} fontSize={"sm"}>
            You can <Link to={"/login"}>Login</Link> here.
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default SignUp;
