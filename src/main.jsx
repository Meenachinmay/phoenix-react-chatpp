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

import theme from "../src/chakraUI/theme.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
