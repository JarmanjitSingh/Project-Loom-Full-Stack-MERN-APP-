import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRef } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { useDispatch } from "react-redux";
import GroupModal from "../components/GroupModal";
import ProjectModal from "../components/ProjectModal";
import SideBar from "../components/SideBar";
import { LogoutUser } from "../reduxToolkit/api_functions/user";
import { userNotExist } from "../reduxToolkit/slices/userSlice";
import { auth } from "../utils/firebase";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const GroupModalButtonRef = useRef<HTMLButtonElement>(null!);
  const ProjectModalButtonRef = useRef<HTMLButtonElement>(null!);

  const handleLogoutClick = async () => {
    const data = await LogoutUser();
    dispatch(userNotExist());
    await signOut(auth);
    console.log("logout data", data);
  };

  return (
    <>
      <HStack
       //border={"1px solid green"}
        w={"100vw"} h={"100vh"} gap={0}>
        <SideBar logoutFunction={handleLogoutClick} />

        <VStack
          h={"full"}
          w={"100%"}
          gap={0}
          //border={"2px solid blue"}
        >
          {/* <Button colorScheme="red" onClick={handleLogoutClick}>
          Logout
        </Button> */}
          <HStack
            w={"full"}
            //border={"1px solid green"}
            p={"10px 20px"}
            justifyContent={"space-between"}
          >
            <HStack>
              <GoHome size={20} />
              <Heading size={"md"}>Ciao! </Heading>
              <Text>When all is said and done, more is said than done.</Text>
            </HStack>
            <Box>
              <Button
                colorScheme="blue"
                variant={"outline"}
                mr={4}
                leftIcon={<BsPlusLg />}
                onClick={() => GroupModalButtonRef.current.click()}
              >
                Add Group
              </Button>
              <Button
                colorScheme="green"
                leftIcon={<BsPlusLg />}
                onClick={() => ProjectModalButtonRef.current.click()}
              >
                Add Project
              </Button>
            </Box>
          </HStack>

          <HStack
            background={"gray.100"}
            h={"full"}
            w={"full"}
            border={"3px solid oranges"}
          ></HStack>
        </VStack>
      </HStack>

      <GroupModal referernce={GroupModalButtonRef} />
      <ProjectModal referernce={ProjectModalButtonRef} />
    </>
  );
};

export default DashboardPage;
