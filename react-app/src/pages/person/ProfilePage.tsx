import React, {useContext} from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {UserContext, UserContextModel} from "../../infrastructure/context";

type RouteParams = {
}

export const ProfilePage: FC = () => {
  const {user} = useContext<UserContextModel>(UserContext);

  return (
    <Container>
      <h2>Profile</h2>
      <div>{user?.id}</div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
    </Container>
  );
}

