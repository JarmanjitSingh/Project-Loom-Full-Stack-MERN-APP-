import { Button, HStack, VStack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import SideBar from "../components/SideBar";
import { LogoutUser } from "../reduxToolkit/api_functions/user";
import { userNotExist } from "../reduxToolkit/slices/userSlice";
import { auth } from "../utils/firebase";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    const data = await LogoutUser();
    dispatch(userNotExist());
    await signOut(auth);
    console.log("logout data", data);
  };
  return (
    <HStack border={"1px solid green"} w={"100vw"} h={"100vh"} gap={0}>
      <SideBar />

      <VStack h={"full"} w={"100%"} border={"2px solid blue"}>
        <Button colorScheme="red" onClick={handleLogoutClick}>
          Logout
        </Button>
      </VStack>
    </HStack>
  );
};

export default DashboardPage;
