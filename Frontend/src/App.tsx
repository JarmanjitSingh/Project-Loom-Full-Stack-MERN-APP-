import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import { GetMyProfile } from "./reduxToolkit/api_functions/user";
import { RootState } from "./reduxToolkit/store";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RegStep1 = lazy(() => import("./pages/register/RegStep1"));
const RegStep2 = lazy(() => import("./pages/register/RegStep2"));
const TasklistPage = lazy(() => import("./pages/TasklistPage"));
const ForgetPasswordPage = lazy(() => import("./pages/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

const App = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    GetMyProfile(dispatch);
    console.log("App Rendered");
  }, [dispatch]);

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
                isAuthenticated={user ? false : true}
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
                isAuthenticated={user ? false : true}
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

          <Route
            path="/tasklist/:id"
            element={
              <ProtectedRoute isAuthenticated={user ? true : false}>
                <TasklistPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forgetpassword"
            element={
              <ProtectedRoute
                isAuthenticated={user ? false : true}
                redirect="/dashboard"
              >
                <ForgetPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resetpassword/:token"
            element={
              <ProtectedRoute
                isAuthenticated={user ? false : true}
                redirect="/dashboard"
              >
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
