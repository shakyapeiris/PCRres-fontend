import React from "react";
import Input from "../../UI/Input";
import ReactDropdown from "react-dropdown";
import Button from "../../UI/Button";

import classes from "../../../styles/admin/register.module.css";
import { AdminRegisterInterface } from "../../../Types/interfaces";

//Props
//Namex
//Address
//Contact
//Workin days, Open closing time
//Price Per test

function Register(props: AdminRegisterInterface) {
  return (
    <form onSubmit={props.onSubmit} className={classes.FormCont}>
      <h1>Admin Registration</h1>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Name of the Hospital/Organization"
          value={props.name.inputValue}
          onChange={props.name.valueChangeHandler}
          onBlur={props.name.inputBlurHandler}
          type="text"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.name.hasError && "Please enter a valid name"}
        </div>
      </div>

      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Contact Number"
          value={props.contactNo.inputValue}
          onChange={props.contactNo.valueChangeHandler}
          onBlur={props.contactNo.inputBlurHandler}
          type="number"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.contactNo.hasError && "Please enter a valid contact number"}
        </div>
      </div>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Email"
          value={props.email.inputValue}
          onChange={props.email.valueChangeHandler}
          onBlur={props.email.inputBlurHandler}
          type="text"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.email.hasError && "Please enter a valid Email Address"}
        </div>
      </div>

      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Address"
          value={props.address.inputValue}
          onChange={props.address.valueChangeHandler}
          onBlur={props.address.inputBlurHandler}
          type="text"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.address.hasError && "Please enter a valid address"}
        </div>
      </div>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Price per test"
          value={props.price.inputValue}
          onChange={props.price.valueChangeHandler}
          onBlur={props.price.inputBlurHandler}
          type="number"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.price.hasError && "Please enter a valid price"}
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
            "Length of the password should be grater than 6"}
        </div>
      </div>

      <div className={classes.ErrorContainer}>
        <p>Open days</p>
        {props.days.map((day, index) => {
          return (
            <label className={classes.CheckBoxContainer} key={Math.random()/Math.random()}>
              {day.date}
              <input
                type="checkbox"
                checked={day.clicked}
                onChange={(e) => {
                  props.setDateChecked(index, e.target.checked);
                }}
              />
            </label>
          );
        })}
      </div>
      <div className={classes.ErrorContainer}>
        <p>Available Time Slots</p>
        {props.timeSlots.map((time, index) => {
          return (
            <label className={classes.CheckBoxContainer} key={Math.random()/Math.random()}>
              {time.time}
              <input
                type="checkbox"
                checked={time.clicked}
                onChange={(e) => {
                  props.setTimeChecked(index, e.target.checked);
                }}
              />
            </label>
          );
        })}
      </div>
      {props.message != "" && (
        <p className={props.success ? "success" : "error"}>{props.message}</p>
      )}
      <Button type="submit" onClick={() => {}}>
        {props.sending ? "Sending" : "Register"}
      </Button>
    </form>
  );
}

export default Register;
