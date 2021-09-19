import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => 
        isLoggedIn && !user.isPasswordTemp? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
