import React from "react";
import Link from "next/link";
import classes from "../../styles/Login.module.css";
import Input from "../UI/Input";
import Button from '../UI/Button'
import { LoginProps } from "../../Types/interfaces";

function Login(props: LoginProps) {
  return (
    <form className={classes.FormCont} onSubmit={props.onSubmit}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Email"
          value={props.email.inputValue}
          onChange={props.email.valueChangeHandler}
          onBlur={props.email.inputBlurHandler}
          type="text"
          styles={undefined}
        />
        <div className="error" data-testid="email-err-msg">
          {props.email.hasError && "Email must include @ symbol"}
        </div>
      </div>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Password"
          value={props.password.inputValue}
          onChange={props.password.valueChangeHandler}
          onBlur={props.password.inputBlurHandler}
          type="password"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.password.hasError &&
            "Length of the password must be greater than 6"}
        </div>
      </div>
      {props.message != "" && <div className={classes.ErrorContainer}>
          <p className={props.success ? "success" : "error"}>{props.message}</p>
      </div>}
      <Button
        type="submit"
        onClick={undefined}
      >
        {props.sending ? "Validatiing..." : "Login"}
      </Button>
      <p>Don&apos;t have an accoutn? <Link href="/auth/register">Register</Link></p>
    </form>
  );
}

export default Login;
