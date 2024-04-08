import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoAddOutline, IoKeyOutline } from "react-icons/io5";
import { RiDeleteBin3Line } from "react-icons/ri";
import Logo from "../../assets/images/Logo.png";
import rightSvg from "../../assets/images/registerBanner.svg";

const RegStep1 = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <HStack h={"100vh"}>
      <VStack h={"100%"} w={"60%"}>
        <HStack w={"100%"} justifyContent={"space-between"} p={"20px 30px"}>
          <Text style={{ fontWeight: 600, fontSize: "1.1rem", color: "gray" }}>
            Step 1/2
          </Text>
        </HStack>

        <VStack
          // border={"2px solid pink"}
          mt={16}
          w={"60%"}
        >
          <Heading mb={8}>Set up your Account</Heading>

          <form style={{ width: "100%" }}>
            <HStack justifyContent={"space-between"} p={"10px 5px"} mb={4}>
              <Avatar
                size="xl"
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
              />

              <HStack>
                <Button colorScheme="blue">
                  <IoAddOutline style={{ marginRight: "4px" }} /> Upload Avatar
                </Button>
                <Button>
                  {" "}
                  <RiDeleteBin3Line style={{ marginRight: "4px" }} /> Delete
                  Picture
                </Button>
              </HStack>
            </HStack>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <InputGroup mb={4}>
                <Input
                  // value={""}
                  // onChange={(e) => setEmail(e.target.value)}
                  size={"lg"}
                  variant={"filled"}
                  placeholder="First and Last Name"
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>

              <InputGroup mb={4}>
                <InputLeftElement h={"full"} pointerEvents="none">
                  <IoKeyOutline
                    style={{ cursor: "pointer", color: "gray" }}
                    size={20}
                  />
                </InputLeftElement>
                <Input
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
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
            </FormControl>

            <Button
              //   isDisabled={buttonLoading}
              type="submit"
              size={"lg"}
              m={"10px 0"}
              colorScheme="blue"
              display={"block"}
              margin={"4rem auto"}
            >
              Update Account
            </Button>
          </form>
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

export default RegStep1;
