import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ element: Component, role, ...rest }) {
  const isAuth = Boolean(localStorage.getItem("token"));
  const userRole = localStorage.getItem("userRole");

  return (
    <Route
      {...rest}
      element={
        isAuth && userRole === role ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
