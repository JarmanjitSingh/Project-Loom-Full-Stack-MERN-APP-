import axios from "axios";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import { userExist, userNotExist } from "./reduxToolkit/slices/userSlice";
import { RootState } from "./reduxToolkit/store";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RegStep1 = lazy(() => import("./pages/register/RegStep1"));
const RegStep2 = lazy(() => import("./pages/register/RegStep2"));

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
        console.log("error", error?.response?.data?.message);
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
            path="/register/account_settings1"
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                redirect="/login"
              >
                <RegStep1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register/account_settings2"
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                redirect="/login"
              >
                <RegStep2 />
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
