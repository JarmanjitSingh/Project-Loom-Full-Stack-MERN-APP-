import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LogoutUser } from "../reduxToolkit/api_functions/user";
import { useDispatch } from "react-redux";
import { userNotExist } from "../reduxToolkit/slices/userSlice";
import { Button, Heading } from "@chakra-ui/react";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    const data = await LogoutUser();
    dispatch(userNotExist());
    await signOut(auth);
    console.log("logout data", data);
  };
  return (
    <div>
      <Heading>This is a dashboard page</Heading>
      <Button colorScheme="red" onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
