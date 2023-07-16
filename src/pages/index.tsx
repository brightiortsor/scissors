import Footer from "@/components/footer/footer";
import Header from "@/components/home/header";
import Navbar from "@/components/navbar/navbar";
import { Container } from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  const handleClick = () => {
    toast.success("Hello world!");
  };

  return (
    <>
      <Navbar />
      <Header />
      <Container maxW={"7xl"}>
        {/* <Analytics />
        <Faq /> */}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
