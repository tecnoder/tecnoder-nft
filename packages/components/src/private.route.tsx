import { Redirect, Route } from "react-router-dom";
import React from "react";
import { RouteProps } from "react-router";
import { useAppSelector } from "@sindric-lib-ui/commons";
import { isLoggedIn } from "./utility";

export interface PrivateRouteProps extends RouteProps {

}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...props }) => {
  const { user } = useAppSelector((state) => state)

  return (
    <Route
      {...props}
      render={({ location }) => 
        isLoggedIn(user) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

// export default PrivateRoute;