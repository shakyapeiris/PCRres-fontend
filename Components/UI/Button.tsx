import React, { MouseEventHandler, ReactElement } from "react";

import classes from "./Button.module.css";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactElement | string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button(props: Props) {
  return (
    <button
      type={props.type}
      className={classes.btn}
      onClick={props.onClick || undefined}
      
    >
      {props.children}
    </button>
  );
}

export default Button;
