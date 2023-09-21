import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraBaseProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./not-found.jsx";
import ChatRoom from "./ChatRoom.jsx";
import TestPhoenix from "./TestPhoenix.jsx";
import Welcome from "./components/Welcome.jsx";

import theme  from '../src/chakraUI/theme.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat-room",
    element: <ChatRoom />,
  },
  {
    path: "/test-phoenix",
    element: <TestPhoenix />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  </React.StrictMode>
);
