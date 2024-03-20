import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./utils/firebase";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

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
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
