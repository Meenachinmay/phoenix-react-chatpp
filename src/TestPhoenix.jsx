import { useEffect } from "react";
import { Socket } from "phoenix";

const TestPhoenix = () => {
  const noOfConnections = 1000;
  const sockets = [];

  useEffect(() => {
    for (let i = 0; i <= noOfConnections; i++) {
      const socket = new Socket("ws:localhost:4000/socket");
      socket.connect({ params: { token: "chinmay 123" } });

      // this is to connect a CHANNEL / ROOM (Can pass params and receive it in )
      const channel = socket.channel("room:lobby", {
        name: `Chinmay anand ${i} !!!`,
      });

      channel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp);
        })
        .receive("error", (resp) => {
          console.log("Unable to join", resp);
        });
    }


    return () => {
        sockets.forEach(socket => socket.close());
    }

  }, []);

  return <div>Testing...</div>;
};

export default TestPhoenix;
