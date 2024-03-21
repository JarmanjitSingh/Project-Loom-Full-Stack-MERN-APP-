import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutePropType = {
  isAuthenticated: boolean;
  children: ReactElement;
  redirect?: string;
};
const ProtectedRoute = ({
  isAuthenticated,
  children,
  redirect = "/",
}: ProtectedRoutePropType) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
