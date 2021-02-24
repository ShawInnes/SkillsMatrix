import * as msal from "@azure/msal-browser";
import {Configuration} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: `${process.env.REACT_APP_B2C_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_B2C_TENANT}`
  }
};

export const msalInstance = new msal.PublicClientApplication(msalConfig);
