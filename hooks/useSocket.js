import { useEffect, useState } from 'react'
import { Socket } from 'phoenix';

export const useSocket = channelName => {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const socket = new Socket("ws:localhost:4000/socket", { params: { token: "chinmay 123"}});
        socket.connect();

        const channel = socket.channel(channelName, {});

        channel
          .join()
          .receive("ok", (resp) => {
            console.log("Joined successfully", resp);
          })
          .receive("error", (resp) => {
            console.log("Unable to join", resp);
          });

        setChannel(channel);

        return () => channel.leave();
    }, [])

    return { channel };
}