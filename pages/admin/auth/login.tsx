import React, { useState, FormEventHandler, useContext, useEffect } from "react";
import useInput from "../../../Hooks/useInput";
import LoginForm from "../../../Components/Admin/Auth/Login";
import classes from "../../../styles/admin/login.module.css";
import { AuthContext } from "../../../Store/AuthContext";
import { useRouter } from "next/router";

const login = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const email = useInput((inputValue) => inputValue.toString().includes("@"));
  const password = useInput((inputValue) => inputValue.toString().trim().length >= 6);

  const [success, setSuccess] = useState(false)

  const ctx = useContext(AuthContext);

  const router = useRouter()
  if (ctx.loginId && ctx.isAdmin){
    router.push('/admin/home')
  }


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

    const url = "http://localhost:5000/admin/login"
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email.inputValue,
        password: password.inputValue,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setSending(false)
    if (data.successful || data.verified){
      ctx.login(data.userId, true);
    }
    else {
      setMessage(data.message)
      setSuccess(false)
    }
  };
  return (
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
          <h1>Welcome Admin!</h1>
          <h3>What are the advantages you will obtain?</h3>
          <ul>
              <li>Will be able to obtain more customers</li>
              <li>Will helpful when it comes to managing your work and maintaining social distance.</li>
              <li>Will be able to connect the patient with the distance of a finger tip</li>
          </ul>
          <h3>FAQ</h3>
          <ul>
              <li>Will there be any commission cut-offs?</li>
                <p>Yes. You will have to pay 5% of your earning through this website to us.</p>
              <li>How can we contact you?</li>
                <p>Send an email to admin@pcrres.lk</p>
          </ul>
      </div>
    </div>
  );
};

export default login;
