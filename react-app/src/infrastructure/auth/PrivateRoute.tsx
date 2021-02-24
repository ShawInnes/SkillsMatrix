import React, {FC, useContext} from "react";
import {Route, RouteProps} from "react-router";
import {UserContext, UserContextModel} from "../context";
import {Redirect} from "react-router-dom";

export const PrivateRoute: FC<RouteProps> = ({children, ...rest}) => {
  const {user} = useContext<UserContextModel>(UserContext);

  return (
    <Route {...rest}>
      {user ? (
        <>{children}</>
      ) : (
        <Redirect to='/'/>
      )
      }
    </Route>
  )
}
