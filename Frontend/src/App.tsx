import { useEffect } from "react";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in ");
      } else {
        console.log(`logged out`);
      }
    });
  }, []);

  return (
    <div>
      <h1>Project Loom</h1>
      <Login />
    </div>
  );
};

export default App;
