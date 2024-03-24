import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LogoutUser } from "../reduxToolkit/api_functions/user";
import { useDispatch } from "react-redux";
import { userNotExist } from "../reduxToolkit/slices/userSlice";
import { Button } from "@chakra-ui/react";

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
      This is a dashboard page
      <Button colorScheme="red" onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
