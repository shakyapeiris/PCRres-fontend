import React, { FormEventHandler, useEffect, useState, useContext } from "react";
import classes from "../../../styles/admin/register.module.css";
import RegisterForm from "../../../Components/Admin/Auth/Register";
import useInput from "../../../Hooks/useInput";
import { AuthContext } from "../../../Store/AuthContext";
import { useRouter } from "next/router";
const Register = () => {

  const ctx = useContext(AuthContext);

  const router = useRouter()
  
  useEffect(() => {
    if (ctx.loginId && ctx.isAdmin){
      router.replace('/admin/home')
    }
    else if (!ctx.isAdmin && ctx.loginId){
      router.replace('/profile')
    }
  }, [])

  const name = useInput((inputVal) => inputVal.toString().trim() != "");

  const address = useInput((inputVal) => inputVal.toString().trim() != "");
  const contactNo = useInput((inputVal) => inputVal.toString().length === 10);
  const price = useInput((inputVal) => inputVal > 0);

  const email = useInput((inputVal) => inputVal.toString().includes("@"));
  const password = useInput(
    (inputVal) => inputVal.toString().trim().length > 6
  );
  const [sending, setSending] = useState(false);
  const [message, setMeassage] = useState("");

  const [success, setSuccess] = useState(false);

  const [dateArr, setDateArr] = useState([
    { date: "Monday", clicked: false },
    { date: "Tuesday", clicked: false },
    { date: "Wednesday", clicked: false },
    { date: "Thursday", clicked: false },
    { date: "Firday", clicked: false },
    { date: "Saturday", clicked: false },
    { date: "Sunday", clicked: false },
  ]);
  const [timeArr, setTimeArr] = useState([
    { time: "08:00 - 10:00", clicked: false },
    { time: "10:00 - 12:00", clicked: false },
    { time: "12:00 - 14:00", clicked: false },
    { time: "14:00 - 16:00", clicked: false },
    { time: "16:00 - 18:00", clicked: false },
  ]);

  const setDateChecked = (index: number, checked: boolean) => {
    const copyDateArr = [...dateArr];
    copyDateArr[index].clicked = checked;
    setDateArr(copyDateArr);
  };

  const setTimeChecked = (index: number, checked: boolean) => {
    const copyDateArr = [...timeArr];
    copyDateArr[index].clicked = checked;
    setTimeArr(copyDateArr);
  };

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (
    e: any
  ) => {
    e.preventDefault();

    if (!name.isInputValid) return name.inputBlurHandler();
    if (!contactNo.isInputValid) return contactNo.inputBlurHandler();
    if (!email.isInputValid) return email.inputBlurHandler();
    if (!address.isInputValid) return address.inputBlurHandler();
    if (!price.isInputValid) return price.inputBlurHandler();
    if (!password.isInputValid) return password.inputBlurHandler();

    setSending(true);
    const url = "http://localhost:5000/admin/register";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name.inputValue,
        email: email.inputValue,
        address: address.inputValue,
        contactNo: contactNo.inputValue,
        dates: dateArr,
        times: timeArr,
        price: price.inputValue,
        password: password.inputValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setSuccess(data.successful);
    setMeassage(data.message);
    setSending(false);
    name.reset();
    email.reset();
    address.reset();
    contactNo.reset();
    setDateArr([
      { date: "Monday", clicked: false },
      { date: "Tuesday", clicked: false },
      { date: "Wednesday", clicked: false },
      { date: "Thursday", clicked: false },
      { date: "Firday", clicked: false },
      { date: "Saturday", clicked: false },
      { date: "Sunday", clicked: false },
    ]);
    setTimeArr([
      { time: "08:00 - 10:00", clicked: false },
      { time: "10:00 - 12:00", clicked: false },
      { time: "12:00 - 14:00", clicked: false },
      { time: "14:00 - 16:00", clicked: false },
      { time: "16:00 - 18:00", clicked: false },
    ]);
    price.reset();
    password.reset();
  };
  const properties = {
    name,
    address,
    contactNo,
    email,
    sending,
    message,
    password,
    onSubmit: submitFormHandler,
    days: dateArr,
    timeSlots: timeArr,
    setDateChecked,
    setTimeChecked,
    price,
    success,
  };

  return (
    <div className={classes.Container}>
      <RegisterForm {...properties} />
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
  );
};

export default Register;
