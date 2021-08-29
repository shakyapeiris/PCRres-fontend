import React, { FormEventHandler, useEffect, useState, useContext } from "react";
import classes from "../../styles/Register.module.css";
import RegisterForm from "../../Components/Auth/Register";
import useInput from "../../Hooks/useInput";
import useSelect from "../../Hooks/use-select";
import { AuthContext } from "../../Store/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
const Register = () => {

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
  const name = useInput((inputVal) => inputVal.toString().trim() != "");
  const age = useInput(
    (age) => new Date().getTime() - new Date(age).getTime() > 0
  );
  const [success, setSuccess] = useState(false)
  const address = useInput((inputVal) => inputVal.toString().trim() != "");
  const contactNo = useInput((inputVal) => inputVal.toString().length === 10);
  const NIC = useInput(
    (inputVal) =>
      (inputVal.toString().endsWith("V") &&
        inputVal.toString().length === 10) ||
      inputVal.toString().length === 12
  );
  const email = useInput((inputVal) => inputVal.toString().includes("@"));
  const gender = useInput((inputVal) => inputVal.toString() != "");
  const province = useSelect((inputVal) => inputVal.toString() != "");
  const district = useSelect((inputVal) => inputVal.toString() != "");
  const password = useInput(
    (inputVal) => inputVal.toString().trim().length > 6
  );
  const [sending, setSending] = useState(false);
  const [message, setMeassage] = useState("");
  const submitFormHandler: FormEventHandler<HTMLFormElement> = async(e: any) => {
    e.preventDefault();

    if (!name.isInputValid) return name.inputBlurHandler();
    if (!age.isInputValid) return age.inputBlurHandler();
    if (!gender.isInputValid) return gender.inputBlurHandler();
    if (!contactNo.isInputValid) return contactNo.inputBlurHandler();
    if (!email.isInputValid) return email.inputBlurHandler();
    if (!NIC.isInputValid) return NIC.inputBlurHandler();
    if (!address.isInputValid) return address.inputBlurHandler();
    if (!password.isInputValid) return password.inputBlurHandler();

    setSending(true)
    const url = 'https://pcrresapi.herokuapp.com/user/register'
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name.inputValue,
        age: age.inputValue,
        gender: gender.inputValue,
        address: address.inputValue,
        NIC: NIC.inputValue,
        email: email.inputValue,
        contactNo: contactNo.inputValue,
        province: province.inputValue,
        district: district.inputValue,
        password: password.inputValue
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();
    name.reset();
    age.reset();
    gender.reset();
    address.reset();
    NIC.reset();
    email.reset();
    contactNo.reset();
    province.reset();
    district.reset();
    password.reset();
    setMeassage(data.message)
    setSending(false)
    setSuccess(data.successful)
  }
  const properties = {
    name,
    age,
    address,
    contactNo,
    NIC,
    email,
    gender,
    province,
    district,
    sending,
    message,
    password,
    successful: success
  };

  // useEffect(() => {
  //   province.setInputValue("Central");
  // });
  return (
    <>
    <Head>
      <title>Register</title>
    </Head>
    <div className={classes.Container}>
      <RegisterForm {...properties} onSubmit={submitFormHandler} />
      <div className={classes.Image}>
        <h1>Welcome to PCRres.Lk!</h1>
        <h3>Who we are?</h3>
        <p>
          PCRres.Lk is a platform where you can book PCR test, obtaine the
          results of PCR results. Also we provid another service where you will
          be able to see the analytics related with PCR tests and nearest
          patients.
        </p>
        <h3>What we offer?</h3>
        <ul>
          <li>Online PCR Test Booking</li>
          <li>Real time data visualization</li>
          <li>Fast result delivery</li>
          <li>Can understand what's happening around you</li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Register;
