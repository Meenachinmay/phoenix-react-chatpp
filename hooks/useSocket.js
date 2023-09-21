import { useEffect, useState } from 'react'
import { Socket } from 'phoenix';

export const useSocket = channelName => {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const socket = new Socket("ws:localhost:4000/socket");
        socket.connect({ params: { token: "chinmay 123"}});

        // this is to connect a CHANNEL / ROOM (Can pass params and receive it in )
        const channel = socket.channel(channelName, {name: "Chinmay anand !!!"});

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