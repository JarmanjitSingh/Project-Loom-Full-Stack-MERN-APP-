import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    Text,
    VStack,
} from "@chakra-ui/react";
import { PiSquaresFourThin } from "react-icons/pi";
import { RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import rightSvg from "../../assets/images/registerBanner.svg";

const RegStep2 = () => {
  return (
    <HStack h={"100vh"}>
      <VStack h={"100%"} w={"60%"}>
        <HStack w={"100%"} justifyContent={"space-between"} p={"20px 30px"}>
          <Link
            to={"/register/account_settings1"}
            style={{ fontWeight: 600, fontSize: "1.1rem", color: "gray" }}
          >
            Back
          </Link>
          <Text style={{ fontWeight: 600, fontSize: "1.1rem", color: "gray" }}>
            Step 2/2
          </Text>
        </HStack>

        <VStack
          // border={"2px solid pink"}
          mt={16}
          w={"60%"}
        >
          <Heading mb={8}>Set up your Project</Heading>

          <form style={{ width: "100%" }}>
            <FormControl>
              <FormLabel>Group Name</FormLabel>
              <InputGroup mb={4}>
                <Input
                  value={"General Projects"}
                  // onChange={(e) => setEmail(e.target.value)}
                  size={"lg"}
                  variant={"filled"}
                  placeholder="Group Name"
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <InputGroup mb={4}>
                <Input
                  //   value={""}
                  // onChange={(e) => setEmail(e.target.value)}
                  size={"lg"}
                  variant={"filled"}
                  placeholder="Project Name"
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Project Description</FormLabel>
              <InputGroup mb={4}>
                <Input
                  //   value={""}
                  // onChange={(e) => setEmail(e.target.value)}
                  size={"lg"}
                  variant={"filled"}
                  placeholder="Project Description"
                  required
                />
              </InputGroup>
            </FormControl>

            <HStack justifyContent={"center"} gap={12} mt={"4rem"}>
              <Button
                //   isDisabled={buttonLoading}
                type="submit"
                size={"lg"}
                colorScheme="blue"
              >
                <PiSquaresFourThin size={22} style={{ marginRight: "10px" }} />
                Home Page
              </Button>

              <Button
                //   isDisabled={buttonLoading}
                type="submit"
                size={"lg"}
              >
                <RiUserAddLine
                  size={20}
                  style={{ marginRight: "10px", color: "gray" }}
                />
                Invite Users
              </Button>
            </HStack>
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

export default RegStep2;
