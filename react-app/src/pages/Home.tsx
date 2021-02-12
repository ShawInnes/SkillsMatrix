import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import React from "react";

export const Home: React.FC = () => (
        <>
            <h2>Home</h2>
            <AuthenticatedTemplate>
                <h3>Authenticated</h3>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h3>Not Authenticated</h3>
            </UnauthenticatedTemplate>
        </>
    )


