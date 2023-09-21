import { Flex, Text, Box, HStack, VStack, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { motion } from 'framer-motion';

// define the animation variants
const fadeInUpwards = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7, // This will make the animation take 1 second.
    },
  },
};

const Welcome = () => {
  const fullTextLines = [
    "A real-time group chat application built on phoenix backend and",
    "reactjs frontend. I am building this app to learn phoenix backend",
    "specially for real-time features of it.",
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = fullTextLines[lineIndex];

    if (!currentLine) return;

    if (charIndex < currentLine.length) {
      setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 50);
    } else if (lineIndex < fullTextLines.length - 1) {
      setLineIndex(lineIndex + 1);
      setCharIndex(0);
    }
  }, [charIndex, lineIndex, fullTextLines]);

  return (
    <>
      <Flex width={"full"} height={"100vh"} bg={"gray.800"}>
        <Flex
          width={"50%"}
          height={"full"}
          className="welcome_page_left_side"
          padding={"20px"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={'lg'}
          shadow={'lg'}
        >
          <Flex
            flexDir={"column"}
            width={"full"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              width={"full"}
              flexDir={"column"}
              alignItems={"start"}
              justifyContent={"center"}
            >
              <Text
                initial="hidden"
                animate="visible"
                variants={fadeInUpwards}
                fontFamily={"Rajdhani"}
                fontSize={"7xl"}
                fontWeight={"extrabold"}
                color={"white"}
                as={motion.div}
              >
                Phoenix & Elixir
              </Text>
              <Box
                minHeight={"4em"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  fontFamily={"Raleway"}
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  noOfLines={[1, 2, 3]}
                  color={"gray.200"}
                >
                  {fullTextLines.slice(0, lineIndex).map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  {fullTextLines[lineIndex].slice(0, charIndex)}
                  <span>|</span>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          className="welcome_page_right_side"
          width={"50%"}
          height={"full"}
        ></Flex>
      </Flex>
    </>
  );
};

export default Welcome;
