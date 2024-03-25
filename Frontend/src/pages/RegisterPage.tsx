import {
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import rightSvg from "../assets/images/registerBanner.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FormEvent, useState } from "react";
import { RegisterUserLoginApi } from "../reduxToolkit/api_functions/user";
import { useDispatch } from "react-redux";
import { userExist } from "../reduxToolkit/slices/userSlice";
import axios, { AxiosError } from "axios";

const RegisterPage = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const dispatch = useDispatch();

  const googleSignup = async () => {
    setButtonLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log("user", user);
      if (!user) return;
      const formData = {
        email: user.email as string,
        googleUID: user.uid,
        name: user.displayName as string,
        photoURL: user.photoURL as string,
      };

      const data = await RegisterUserLoginApi(formData);
      dispatch(userExist(data));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        const axiosError = error as AxiosError;
        console.error("Axios Error:", axiosError.message);
        console.error("Axios Response Data:", axiosError.response?.data);
      } else {
        console.error("Non-Axios Error:", error);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  const EmailSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    const data = await RegisterUserLoginApi({ email });
    console.log("email signup data", data)
    setButtonLoading(false);
    dispatch(userExist(data));
  };

  return (
    <HStack h={"100vh"}>
      <VStack h={"100%"} w={"60%"}>
        <HStack w={"100%"} justifyContent={"space-between"} p={"20px 30px"}>
          <Link
            to={"/"}
            style={{ fontWeight: 600, fontSize: "1.1rem", color: "gray" }}
          >
            Back
          </Link>

          <Text fontWeight={600} fontSize={"1.1rem"} color={"gray"}>
            Already have an account?{" "}
            <Link to={"/login"} style={{ color: "black" }}>
              Log In
            </Link>
          </Text>
        </HStack>

        <VStack
          //border={"2px solid pink"}
          mt={16}
          w={"40%"}
        >
          <Heading mb={16}>Sign Up</Heading>

          <form style={{ width: "100%" }} onSubmit={EmailSignup}>
            <InputGroup mb={4}>
              <InputLeftElement h={"full"} pointerEvents="none">
                <CiMail
                  style={{ cursor: "pointer", color: "gray" }}
                  size={20}
                />
              </InputLeftElement>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size={"lg"}
                variant={"filled"}
                type="email"
                placeholder="Email Address"
                required
              />
            </InputGroup>

            <Text
              fontWeight={500}
              textAlign={"center"}
              p={"10px"}
              fontSize={"sm"}
            >
              By clicking 'Sign Up' you are agreeing to the <br />
              Freedcamp{" "}
              <Text display={"inline"} color={"blue.500"}>
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text display={"inline"} color={"blue.500"}>
                Privacy Policy
              </Text>
            </Text>

            <Button
              isDisabled={buttonLoading}
              type="submit"
              size={"lg"}
              m={"10px 0"}
              colorScheme="blue"
              w={"full"}
            >
              Sign Up
            </Button>
          </form>

          <Text color={"gray"}>or sign up with </Text>

          <Button
            isLoading={buttonLoading}
            onClick={googleSignup}
            m={"10px 0"}
            variant={"outline"}
            size="lg"
            w={"100%"}
          >
            <FcGoogle size={24} />{" "}
            <Text ml={4} color={"gray"}>
              Sign up with Google
            </Text>
          </Button>
        </VStack>
      </VStack>

      <VStack h={"100%"} w={"40%"} background={"#2448b1"}>
        <HStack justifyContent={"center"} h={"100px"} w={"full"} p={"20px 0"}>
          <img src={Logo} alt="logo" height={"60px"} width={"60px"} />
          <Heading fontFamily={"monospace"} color={"white"}>
            Projectloom
          </Heading>
        </HStack>
        <img src={rightSvg} alt="svg" />
      </VStack>
    </HStack>
  );
};

export default RegisterPage;
