import { useEffect, useState } from "react";
import "./App.css";

import { Socket } from "phoenix";

function App() {
  const [messages, setMessage] = useState([])
  
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

      channel.push("ping", { body: "A client is connected..."})

      channel.push("new_message", { body: "Chinmay is saying hello..."})

      channel.on("new_message", payload => {
        console.log('Reponse from phoenix backend', payload.body);
      })

      return () => channel.leave();
  }, []);
  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export default App;
