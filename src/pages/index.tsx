import Header from "@/components/home/header";
import { Container } from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  const handleClick = () => {
    toast.success("Hello world!");
  };

  return (
    <>
      <Header />
      <Container maxW={"7xl"}>
        {/* <Analytics />
        <Faq /> */}
      </Container>
    </>
  );
};

export default HomePage;
