import {styled} from "@material-ui/core/styles";
import {spacing} from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import React from "react";

/**
 * Applies the spacing system to the material UI Button
 */
const Button = styled(MuiButton)(spacing);

Button.defaultProps = {
    size: "small",
    mx: 0.5,
    variant: "contained",
    color: "primary"
};

export default Button;

