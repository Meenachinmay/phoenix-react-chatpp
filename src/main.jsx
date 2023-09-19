import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraBaseProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./not-found.jsx";
import ChatRoom from "./ChatRoom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat-room",
    element: <ChatRoom />
  },
  {
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraBaseProvider>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  </React.StrictMode>
);
