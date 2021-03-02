import React, {useContext} from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {UserContext, UserContextModel} from "infrastructure/context";
import {getAxiosInstance} from "../../../infrastructure/axios";

export const ProfilePage: FC = () => {
  const {user} = useContext<UserContextModel>(UserContext);

  const handleClickData = async () => {
    const axios = await getAxiosInstance();
    const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/api/data`);
    console.log('getResponse', data);
  };

  const handleClickWhoAmI = async () => {
    const axios = await getAxiosInstance();
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/whoami`);
    console.log('getResponse', data);
  };

  return (
    <Container>
      <h2>Profile</h2>
      <div>{user?.id}</div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <button onClick={handleClickData}>Seed Data</button>
      <button onClick={handleClickWhoAmI}>Who Am I</button>
    </Container>
  );
}
