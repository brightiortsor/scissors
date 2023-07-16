import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/firebase/ClientApp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { ref, update } from "firebase/database";

interface userProps {
  user: {
    uid: string;
    email: string;
    lastLogin: string;
  };
}

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      //add user with a type of user
      const user = auth.currentUser;

      const dt = new Date();
      update(ref(database, `users/${user?.uid}`), {
        lastLogin: dt.toISOString(),
      });

      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });

      router.push("/");
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW={"7xl"} mt={"5rem"} mb={"6rem"}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          p="10"
          borderRadius="md"
          boxShadow="0 0 10px 0 rgba(0,0,0,0.1)"
          border="1px solid rgba(0,0,0,0.1)"
          width={{ base: "90%", md: "600px" }}
        >
          <Box mb={8}>
            <Text fontSize="3xl" fontWeight="bold" pb={2} textAlign={"center"}>
              LOGIN
            </Text>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              margin={"0 auto"}
              width={"50px"}
              height={"2px"}
              background={"black"}
            ></Box>
            <Text fontSize="xl" pb={2} textAlign={"center"} mt={4}>
              Enter your credentials below to Sign in
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl mb="6">
              <FormLabel htmlFor="username" color={"gray.500"}>
                Email address
              </FormLabel>
              <InputGroup>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  focusBorderColor="blackAlpha.700"
                  required
                />
              </InputGroup>
            </FormControl>
            <FormControl mb="6">
              <FormLabel htmlFor="password" color={"gray.500"}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  focusBorderColor="blackAlpha.700"
                  required
                />
              </InputGroup>
            </FormControl>
            {error && <Text color="red">{error}</Text>}
            <HStack mb="4" justifyContent="space-between">
              <Checkbox name="rememberMe" size="sm">
                Keep me signed in
              </Checkbox>
              <Text>
                <Link
                  color="gray.500"
                  href="/forgot_password"
                  _hover={{
                    color: "blue.300",
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </Link>
              </Text>
            </HStack>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Sign In"}
            </Button>
            <Text mt="4" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link
                color="blue.600"
                fontWeight={500}
                href="/signup"
                style={{ textDecoration: "underline" }}
              >
                Sign Up
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
