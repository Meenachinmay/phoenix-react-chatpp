import { useEffect, useState } from "react";
import { Flex, Input, Button, Text, Box } from "@chakra-ui/react";
import "./App.css";

import { useSocket } from "../hooks/useSocket";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [messages, setMessage] = useState([{ message: "Hey", id: uuidv4() }]);
  const [newMessage, setNewMessage] = useState("");
  const { channel } = useSocket("room:lobby");

  useEffect(() => {
    if (channel) {
      // confirm is client connected
      channel.push("ping", { body: "A client is connected..." });

      // load messages from phoenix server
      channel.on("new_message", (payload) => {
        console.log("Reponse from phoenix backend", payload.body);
        setMessage((prevMessage) => [...prevMessage, payload.body]);
      });
    }
  }, [channel]);

  function handleSendMessage() {
    channel.push("new_message", {
      body: { message: newMessage, id: uuidv4() },
    });
    // setMessage((prevMessage) => [...prevMessage, newMessage]);
    setNewMessage("");
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"auto"}
        height={"100vh"}
        bg={"gray.800"}
        flexDir={"column"}
        padding={"20px"}
      >
        <Flex
          width={"full"}
          height={"600"}
          maxHeight={"600"}
          bg={"white"}
          overflowY={"scroll"}
          borderRadius={"10px"}
          padding={"10"}
          flexDir={"column"}
        >
          <Box>
            {messages.map((message) => (
              <Text
                px={"10px"}
                py={"5px"}
                borderRadius={"5px"}
                bg={"gray.100"}
                alignItems={"center"}
                fontWeight={"semibold"}
                marginBottom={"10px"}
                key={message.id}
              >
                {message.message}
              </Text>
            ))}
          </Box>
        </Flex>
        <Flex
          width={"full"}
          height={"50px"}
          marginTop={"5"}
          borderRadius={"10px"}
          gap={10}
        >
          <Input
            width={"full"}
            type="text"
            placeholder="Enter your messages here..."
            borderRadius={"5px"}
            px={"10px"}
            py={"5xp"}
            _focus={{ outline: "none" }}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
        </Flex>
        <Button
          bg={"white"}
          marginTop={"10px"}
          color={"gray.900"}
          fontWeight={'semibold'}
          width={"full"}
          p={"5px"}
          borderRadius={"5px"}
          onClick={handleSendMessage}
          _hover={{ bg: "gray.200"}}
        >
          Send
        </Button>
      </Flex>
    </>
  );
}

export default App;
