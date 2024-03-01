import {Button as MUIButton, ButtonProps} from "@mui/material";

import Styles from './Button.module.scss';

export const Button = (props: ButtonProps) => {
  return (
    <MUIButton
      {...props}
      classes={{
        root: Styles.button,
        disabled: Styles.buttonDisabled,
      }}
    >
      {props.children}
    </MUIButton>
  )
}
