import React, {useContext} from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {UserContext, UserContextModel} from "../../infrastructure/context";
import axios, {AxiosRequestConfig} from "axios";
import {useMsal} from "@azure/msal-react";
import {SilentRequest} from "@azure/msal-browser";

type RouteParams = {}

export const ProfilePage: FC = () => {
  const {user} = useContext<UserContextModel>(UserContext);
  const {instance, accounts} = useMsal();

  const handleClick = async () => {
    const tokenRequest: SilentRequest = {
      scopes: ["openid", "offline_access","api://97a9eace-9524-43ce-b326-dcbce7cb5cbc/read"],
      forceRefresh: true
    };

    // await axios.put(`${process.env.REACT_APP_API_URL}/api/data`);
    const tokenResponse = await instance.acquireTokenSilent(tokenRequest);
    console.log('tokenResponse', tokenResponse);
    const accessToken = tokenResponse.accessToken;
    console.log('accessToken', accessToken);
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    const getResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/whoami`, config);
    console.log('getResponse', getResponse);
  };

  return (
    <Container>
      <h2>Profile</h2>
      <div>{user?.id}</div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <button onClick={handleClick}>Test</button>
    </Container>
  );
}

