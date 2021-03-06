import React, {useContext} from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {UserContext, UserContextModel} from "infrastructure/context";

export const ProfilePage: FC = () => {
  const {user} = useContext<UserContextModel>(UserContext);

  return (
    <Container>
      <h2>Profile</h2>
      <div>{user?.id}</div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </Container>
  );
}
