import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./utils/firebase";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reduxToolkit/store";
import axios, { AxiosError } from "axios";
import { userExist, userNotExist } from "./reduxToolkit/slices/userSlice";
import ProtectedRoute from "./components/ProtectedRoutes";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const App = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const url = `${import.meta.env.VITE_SERVER}/user/me`;

  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await axios.get(url, {
          withCredentials: true,
        });

        console.log("data", data);
        dispatch(userExist(data));
      } catch (error: any) {
        console.log("error", error.response.data.message)
        dispatch(userNotExist());
      }
    }

    fetchUserData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                isAuthenticated={user ? false : true}
                redirect="/dashboard"
              >
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={user ? false : true}
                redirect="/dashboard"
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={user ? true : false}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
