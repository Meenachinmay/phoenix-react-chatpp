import { Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Flex
      height={"100vh"}
      width={"100%"}
      bg={"gray.800"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack gap={"5"}>
        <Text fontSize={"3xl"} color={"white"}>
          Welcome
        </Text>
        <Text
          fontSize={"xl"}
          color={"white"}
          bg={"gray.600"}
          p={"10px"}
          borderRadius={"10px"}
          cursor={'pointer'}
          _hover={{ bg: "gray.700"}}
        >
          <Link to={"/chat-room"}>Enter in Chatting Room</Link>
        </Text>
      </VStack>
    </Flex>
  );
}

export default App;
