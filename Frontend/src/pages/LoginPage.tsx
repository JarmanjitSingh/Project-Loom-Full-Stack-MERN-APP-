import {
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoKeyOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import rightSvg from "../assets/images/registerBanner.svg";
import {
  EmailPasswordLoginApi,
  GetMyProfile,
  LoginWithGoogleApi,
} from "../reduxToolkit/api_functions/user";
import { userExist } from "../reduxToolkit/slices/userSlice";
import { auth } from "../utils/firebase";
import { catchErrorFunction } from "../utils/utils";

const LoginPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const toast = useToast();

  const googleLoginClick = async () => {
    setButtonLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      if (!user) return;
      const formData = {
        email: user.email as string,
        googleUID: user.uid,
      };

      const data = await LoginWithGoogleApi(formData);

      if(data.success){
        GetMyProfile(dispatch)
      }
    } catch (error) {
      catchErrorFunction(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const LoginThroughEmailPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    const formData = {
      email,
      password,
    };
    const data = await EmailPasswordLoginApi(formData, toast);
    console.log('datafromemailpassword',data)
    setButtonLoading(false);
    dispatch(userExist(data));
  };

  return (
    <>
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
              Don't have an account?{" "}
              <Link to={"/register"} style={{ color: "black" }}>
                Sign Up
              </Link>
            </Text>
          </HStack>

          <VStack
            //border={"2px solid pink"}
            mt={16}
            w={"40%"}
          >
            <Heading mb={16}>Login</Heading>

            <form
              style={{ width: "100%" }}
              onSubmit={LoginThroughEmailPassword}
            >
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

              <InputGroup mb={4}>
                <InputLeftElement h={"full"} pointerEvents="none">
                  <IoKeyOutline
                    style={{ cursor: "pointer", color: "gray" }}
                    size={20}
                  />
                </InputLeftElement>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size={"lg"}
                  variant={"filled"}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                />

                <InputRightElement h={"full"}>
                  {show ? (
                    <FaRegEyeSlash
                      onClick={() => setShow(!show)}
                      style={{ cursor: "pointer", color: "gray" }}
                      size={20}
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShow(!show)}
                      style={{ cursor: "pointer", color: "gray" }}
                      size={20}
                    />
                  )}
                </InputRightElement>
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
                size={"lg"}
                m={"10px 0"}
                colorScheme="blue"
                w={"full"}
                type="submit"
                isDisabled={buttonLoading}
              >
                Continue with Email Address
              </Button>
            </form>

            <Text color={"gray"}>or login with </Text>

            <Button
              isLoading={buttonLoading}
              onClick={googleLoginClick}
              m={"10px 0"}
              variant={"outline"}
              size="lg"
              w={"100%"}
            >
              <FcGoogle size={24} />{" "}
              <Text ml={4} color={"gray"}>
                Sign in with Google
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
    </>
  );
};

export default LoginPage;
