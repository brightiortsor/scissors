import React, { useState, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Scissor from "./shortner";
import "../../styles/features.scss";

function Features() {
  return (
    <Box
      className="analytics__container"
      id="scissor"
      scrollMarginTop={"150px"}
    >
      <Scissor />
    </Box>
  );
}

export default Features;
