import React, { useState, FormEventHandler, useContext, useEffect } from "react";
import useInput from "../../Hooks/useInput";
import LoginForm from "../../Components/Auth/Login";
import classes from "../../styles/Login.module.css";
import { AuthContext } from "../../Store/AuthContext";
import { useRouter } from "next/router";
import Head from 'next/head'

const login = () => {
  //   const history = useHistory();
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  //   const ctx = useContext(AuthContext);
  const email = useInput((inputValue) => inputValue.toString().includes("@"));
  const password = useInput((inputValue) => inputValue.toString().trim().length >= 6);
  const [success, setSuccess] = useState(false)
  const ctx = useContext(AuthContext);

  const router = useRouter()
  
  useEffect(() => {
    if (localStorage.getItem("loginId") && !(localStorage.getItem("isAdmin") === "true")){
      router.replace('/profile')
    }
    else if (localStorage.getItem("loginId") && localStorage.getItem("isAdmin") === "true"){
      router.replace('/admin/home')
    }
  }, [])
  const submitFormHandler: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();

    if (!email.isInputValid) {
      email.inputBlurHandler();
      return;
    }

    if (!password.isInputValid) {
      password.inputBlurHandler();
      return;
    }
    setSending(true);

    const url = "https://pcrresapi.herokuapp.com/user/login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email.inputValue,
        password: password.inputValue
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    if (data.successful){
      ctx.login(data.userId, false);
    }else{
      setSending(false)
      setSuccess(data.successful)
      setMessage(data.message)
      email.reset();
      password.reset();
    }
  };
  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
    <div className={classes.Container}>
      <LoginForm
        email={email}
        password={password}
        sending={sending}
        message={message}
        onSubmit={submitFormHandler}
        success={success}
      />
      <div className={classes.Image}>
          <h1>Welcome Back!</h1>
          <h3>What we offer?</h3>
          <ul>
              <li>Online PCR Test Booking</li>
              <li>Real time data visualization</li>
              <li>Fast result delivery</li>
              <li>Can understand what's happening around you</li>
          </ul>
          <h3>FAQ</h3>
          <ul>
              <li>Is this free?</li>
                <p>Not completely free because you will have to pay for PCR tests</p>
              <li>How much will be the fee?</li>
                <p>It will depend on the PCR test center you select</p>
              <li>What do I need to if I reciev a positive report?</li>
                <p>Contact the relevant medical officer ASAP</p>

          </ul>
      </div>
    </div>
    </>
  );
};

export default login;
