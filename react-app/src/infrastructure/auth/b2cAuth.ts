import {Configuration, PublicClientApplication} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: `${process.env.REACT_APP_B2C_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_B2C_TENANT}`
  }
};

export type TokenClaims = {
  oid: string;
  name: string;
  preferred_username: string;
}

export const msalInstance = new PublicClientApplication(msalConfig);

