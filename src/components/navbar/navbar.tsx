import React from "react";
import "./navbar.scss";
import Hamburger from "hamburger-react";
import logo from "../images/logo.png";
import { Box, Button, Container, Image } from "@chakra-ui/react";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Box ml={16}>
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" width="155px" />
          </Link>
        </Box>

        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler">
          <Hamburger />
        </label>

        <div className="navbar__links">
          <ul className="links1">
            <li>
              <a href="#features">Features</a>
            </li>

            <li>
              <a href="#pricing">Pricing</a>
            </li>

            <li>
              <a href="#analytics"> Analytics</a>
            </li>
            <li>
              <a href="#faqs"> FAQs</a>
            </li>
          </ul>

          <Box
            mb={{ base: "2rem", md: "2rem", lg: "2rem", xl: "0" }}
            mt={{ base: "2rem", md: "2rem", lg: "2rem", xl: "0" }}
            display={"flex"}
            justifyContent={"space-between"}
            gap={2}
          >
            <Button bg={"transparent"} fontSize={"xl"} borderRadius={"3rem"}>
              <Link href="/signin">Login</Link>
            </Button>

            <Button
              bg={"transparent"}
              fontSize={"xl"}
              borderRadius={"3rem"}
              bgColor={"blue"}
            >
              <Link
                href="#scissor"
                style={{
                  color: "white",
                }}
              >
                Try for free
              </Link>
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Navbar;
