import { useEffect, useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import "./App.css";

import { Socket } from "phoenix";

function App() {
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const socket = new Socket("ws:localhost:4000/socket", {
      params: { token: "chinmay 123" },
    });
    socket.connect();
    const channel = socket.channel("room:lobby", {});
    channel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    // confirm is client connected
    channel.push("ping", { body: "A client is connected..." });

    // load messages from phoenix server
    channel.on("new_message", (payload) => {
      console.log("Reponse from phoenix backend", payload.body);
    });

    // disconnect the connection as soon as component unmount
    return () => channel.leave();
  }, []);

  function handleSendMessage() {
    console.log("message", newMessage);
    setNewMessage('');
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"full"}
        height={"100vh"}
        bg={"orange.300"}
        flexDir={"column"}
      >
        <Flex
          width={"600px"}
          height={"600"}
          bg={"blue.500"}
          borderRadius={"10px"}
          padding={"10"}
        ></Flex>
        <Flex
          width={"600px"}
          height={"70px"}
          marginTop={"5"}
          borderRadius={"10px"}
          gap={10}
        >
          <Input
            width={"full"}
            type="text"
            placeholder="Enter your messages here..."
            padding={"5px"}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <Button
            bg={"white"}
            p={"5px"}
            color={"gray.500"}
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
