import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import {darkTheme, lightTheme} from "../src/themes";
import '../src/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themes = [lightTheme, darkTheme];
addDecorator(withThemesProvider(themes));
