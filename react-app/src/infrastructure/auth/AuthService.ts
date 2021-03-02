import {
  Configuration,
  InteractionRequiredAuthError,
  PublicClientApplication,
  SilentRequest
} from "@azure/msal-browser";

import {Identity} from "./Identity";
import {InteractiveSignInRequired} from "./InteractiveSignInRequired";
import {getAxiosInstance} from "../axios";
import {Person} from "../../models";

export class AuthService {
  msalConfig: Configuration;
  msalClient: PublicClientApplication;
  signInOptions: SilentRequest;

  constructor() {
    this.signInOptions = {
      forceRefresh: false,
      scopes: ["openid", "offline_access", `${process.env.REACT_APP_B2C_SCOPE}`]
    };

    this.msalConfig = {
      auth: {
        clientId: `${process.env.REACT_APP_B2C_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_B2C_TENANT}`
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
      }
    };

    this.msalClient = new PublicClientApplication(this.msalConfig);
  }

  async signIn() {
    const response = await this.msalClient.loginPopup(this.signInOptions);
    return new Identity(response);
  }

  async signOut() {
    await this.msalClient.logout();
  }

  async getProfile() {
    const axios = await getAxiosInstance();
    const {data} = await axios.get<Person>(`${process.env.REACT_APP_API_URL}/api/person`);
    return data;
  }

  async getIdentity() {
    this.msalClient.setActiveAccount(this.msalClient.getAllAccounts()[0] ?? {});
    if (this.msalClient.getActiveAccount()) {
      try {
        const response = await this.msalClient.acquireTokenSilent(this.signInOptions);
        return new Identity(response);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          throw new InteractiveSignInRequired();
        }
        throw error;
      }
    }
    return new Identity();
  }
}

const authService = new AuthService();

export default authService;
