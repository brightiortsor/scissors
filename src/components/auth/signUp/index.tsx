import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, database } from "@/firebase/ClientApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, confirmPassword } = formData;

    // Form validation
    if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)) {
      setError(
        "Password must contain at least one letter and be greater than 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if user already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("User already exists");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      set(ref(database, `users/${user?.uid}`), {
        email: user?.email,
      });
      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      setTimeout(() => {
        toast.info("Redirecting to login page...", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,

          onClose: () => {
            router.push("/signin");
          },
        });
      }, 2000);

      // Clear form data
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="3xl" mt={8}>
      <Box borderWidth="1px" borderRadius="lg" p={8}>
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Sign Up
        </Heading>
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
          Just a few details and you&apos;re all set!
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Choose Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>
          {error && <Text color="red">{error}</Text>}
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={4}
            disabled={!isFormValid || loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign Up"}
          </Button>
        </form>
        <Text mt="4" textAlign="center">
          Already have an account?{" "}
          <Link
            color="blue.600"
            fontWeight={500}
            href="/signin"
            style={{ textDecoration: "underline" }}
          >
            Sign In
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default SignUp;
