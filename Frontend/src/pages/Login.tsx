import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import axios from "axios";

const Login = () => {
  const handleLoginClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log("User: ", user);
    } catch (error) {
      console.log(`Login Error`);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      console.log(`user logged out`);
    } catch (error) {
      console.log("logout user error: ", error);
    }
  };

  const serverRequest = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/register`
      );

      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login with google</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={serverRequest}>Server request</button>
    </div>
  );
};

export default Login;
