import React from "react";
import { Progress } from "@chakra-ui/react";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Progress value={progress} colorScheme="teal" size="sm" mt={2} w="100%" />
  );
};

export default ProgressBar;
