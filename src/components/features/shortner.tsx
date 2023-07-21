import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import QRCode from "qrcode.react";
import Image from "next/image";
import MagicWand from "../../../public/assets/magic-wand.png";
import { toPng } from "html-to-image";
import styled from "@emotion/styled";
import Link from "next/link";

const getLocalStorage = () => {
  // check if localStorage is empty or undefined.
  //This prevents the undefined error from your browser
  // if localStorage is empty
  if (typeof localStorage !== "undefined") {
    let links = localStorage.getItem("links");
    if (links) {
      return JSON.parse(links);
    }
  }
  return [];
};
const Scissor = () => {
  const [text, setText] = useState("");
  const [links, setLinks] = useState(getLocalStorage());
  const [buttonText, setButtonText] = useState("Copy");
  const [showOutput, setShowOutput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("shorten_url");
  const [generateQRCodeClicked, setGenerateQRCodeClicked] = useState(false);
  const [downloadQRCode, setDownloadQRCode] = useState(false);

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    setDownloadQRCode(false); // Reset downloadQRCode when the option is changed
  };
  const toast = useToast();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValidUrl = (text: string) => {
      // Regular expression pattern to validate pasted URLs
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // IP address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      return pattern.test(text);
    };

    if (!isValidUrl(text)) {
      alert("Link is Incorrect");
    } else {
      try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${text}`);
        const data = await res.json();
        setLinks(data.result);
        setText("");
        setShowOutput(true); // Show the output container after a successful response
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong! Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(links.full_short_link);
    setButtonText("Link copied!");
  };

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const generateQRCode = (text: string) => {
    return (
      <div ref={qrCodeRef}>
        <QRCode value={text} fgColor="#054074" />
      </div>
    );
  };

  const downloadQRCodeImage = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.getElementsByTagName("canvas")[0];
      if (canvas) {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  return (
    <Box
      pb={8}
      pt={12}
      width={{ base: "100%", md: "60%" }}
      px={{ base: "6", md: "0" }}
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir={{ base: "column", md: "column" }} mb="4" gap="2">
          <FormControl>
            <Input
              type="url"
              placeholder="Shorten a link here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{
                borderRadius: "5px",
                padding: "10px",
                outline: "none",
                width: "100%",
                height: "50px",
                fontSize: "18px",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "hsl(0, 0%, 99.6078431372549%)",
              }}
            />
          </FormControl>
          <StyledSelect>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="shorten_url">Shorten Url</option>
              <option value="qr_code" onChange={() => setDownloadQRCode(false)}>
                Generate QR Code
              </option>
              <option disabled>Custom Domain</option>
            </select>
          </StyledSelect>
          <Button
            type="submit"
            colorScheme="blue"
            p="6"
            mt={6}
            onClick={() => {
              setGenerateQRCodeClicked(selectedOption === "qr_code");
              setDownloadQRCode(selectedOption === "qr_code");
            }}
          >
            {selectedOption === "qr_code" ? "Generate QR Code" : "Shorten URL"}
            <Image src={MagicWand} alt="trim URL" width={30} />
          </Button>
        </Flex>
      </form>

      {/* Output container */}
      {showOutput && (
        <Box
          bg="white"
          rounded="md"
          shadow="md"
          p="4"
          mt="4"
          display="flex"
          flexDirection={"column"}
          justifyContent="space-between"
          alignItems="center"
        >
          {selectedOption === "qr_code" ? (
            <div>
              <Text mb="2">Congratulations! Here&apos;s your QR Code:</Text>
              <Box mt={{ base: "2", md: "4" }}>
                <Flex align="center" flexDir={"column"} gap={2}>
                  <Box>{generateQRCode(links.full_short_link)}</Box>
                  <Box>
                    <Button
                      onClick={downloadQRCodeImage}
                      colorScheme="blue"
                      size="lg"
                      mt={4}
                    >
                      Export QR Code
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </div>
          ) : (
            <div>
              <Text mb="2">
                Congratulations! Here&apos;s your shortened URL:
              </Text>
              <Box mt={{ base: "2", md: "4" }}>
                <Flex align="center">
                  <Text mr="4" color="cyan.500">
                    {links.full_short_link}
                  </Text>
                  <Button onClick={handleCopy} colorScheme="blue" size="lg">
                    {buttonText}
                  </Button>
                </Flex>
              </Box>
            </div>
          )}
        </Box>
      )}
      <Text
        color={"#fff"}
        textAlign={"center"}
        width={"70%"}
        mx={"auto"}
        fontFamily={"cursive"}
        pt={8}
      >
        By clicking Shorten URL or Generate QR Code, I agree to the{" "}
        <Link
          href="/"
          style={{ textDecoration: "underline", color: "#c0c3c5" }}
        >
          Terms of Service,
        </Link>{" "}
        <Link
          href="/"
          style={{ textDecoration: "underline", color: "#c0c3c5" }}
        >
          Privacy Policy
        </Link>{" "}
        and Use of Cookies.
      </Text>
    </Box>
  );
};

export default Scissor;

const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 5px;

  select {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    font-family: Poppins;
    font-weight: 500;

    option {
      font-size: 18px;
      font-family: Poppins;
      font-weight: 500;
    }
  }
`;
