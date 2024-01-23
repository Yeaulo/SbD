import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  function getCookieValue(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
    return false;
  }

  return getCookieValue("isAuthenticated") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
