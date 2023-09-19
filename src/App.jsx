import { useEffect, useRef, useState } from "react";
import { Flex, Input, Button, Text, Box, Image } from "@chakra-ui/react";
import "./App.css";

import { useSocket } from "../hooks/useSocket";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [messages, setMessage] = useState([{ message: "Hey", id: uuidv4() }]);
  const [newMessage, setNewMessage] = useState("");
  const { channel } = useSocket("room:lobby");
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSendMessage() {
    channel.push("new_message", {
      body: { message: newMessage, id: uuidv4() },
    });
    // setMessage((prevMessage) => [...prevMessage, newMessage]);
    setNewMessage("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100vh"}
        bg={"gray.100"}
      >
        <Flex
          width={{ base: "10%", sm: "20%", md: "50%" }}
          bg={"blue.500"}
          height={"100vh"}
        >
          <Image
            src="https://images.unsplash.com/photo-1505322101000-19457cff32ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            alt="side-banner"
            width={'full'}
            objectFit={"fit"}
            height={"full"}
          />
        </Flex>
        <Flex
          flexDir={"column"}
          width={{ base: "auto", sm: "auto", md: "50%" }}
          alignItems={"center"}
          justifyContent={"center"}
          padding={"50px"}
        >
          <Flex
            width={"full"}
            height={"600"}
            maxHeight={"600"}
            bg={"gray.800"}
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
            <div ref={messageEndRef}></div>
          </Flex>
          <Flex
            width={"full"}
            height={"40px"}
            marginTop={"5"}
            borderRadius={"10px"}
            gap={10}
          >
            <Input
              onKeyDown={handleKeyDown}
              width={"full"}
              type="text"
              placeholder="Enter your messages here..."
              borderRadius={"5px"}
              px={"10px"}
              py={"5xp"}
              _focus={{ outline: "none" }}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              bg={"gray.200"}
            />
          </Flex>
          <Button
            bg={"gray.700"}
            _hover={{bg: "gray.800"}}
            marginTop={"10px"}
            color={"white"}
            fontWeight={"semibold"}
            width={"full"}
            p={"5px"}
            borderRadius={"5px"}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
