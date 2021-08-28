import React from "react";
import Input from "../UI/Input";
import ReactDropdown from "react-dropdown";
import Button from "../UI/Button";

import classes from "../../styles/Register.module.css";
import { RegisterInterface } from "../../Types/interfaces";

//Props
//Namex
//NICx
//Agex
//Gender
//Contact Nox
//Emailx
//Address Linex
//Disctrict
//Province

function Register(props: RegisterInterface) {
  const dictrictsAndProvinces: any = {
    Western: ["Colombo", "Gampaha", "Kaluthara"],
    Central: ["Kandy", "Matale", "Nuwara Eliya"],
    Eastern: ["Ampara", "Batticaola", "Trincomalee"],
    Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
    Southern: ["Galle", "Mathara", "Hambanthota"],
    "North Western": ["Kurunegala", "Puttalam"],
    "North Central": ["Anuradhapura", "Polonnaruwa"],
    Uva: ["Badulla", "Monaragala"],
    Sabaragamuwa: ["Kegalle", "Ratnapura"],
  };
  const provinces: string[] = [
    "Central",
    "Eastern",
    "Northern",
    "North Central",
    "North Western",
    "Sabaragamuwa",
    "Southern",
    "Uva",
    "Western",
  ];
  return (
    <form onSubmit={props.onSubmit} className={classes.FormCont}>
      <h1>Register</h1>
      <div className={classes.ErrorContainer}>
        <Input
          placeholder="Name"
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
          placeholder="Age"
          value={props.age.inputValue}
          onChange={props.age.valueChangeHandler}
          onBlur={props.age.inputBlurHandler}
          type="date"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.age.hasError && "Please Enter a valid B'day"}
        </div>
      </div>
      <div className={classes.ErrorContainer}>
      <h3>Gender</h3>
        <div>
          <input
            value="m"
            onChange={props.gender.valueChangeHandler}
            onBlur={props.gender.inputBlurHandler}
            type="radio"
            checked={props.gender.inputValue === "m"}
          />
          <label>Male</label>
        </div>
        <div className={classes.GenderCont}>
            
          <input
            value="f"
            onChange={props.gender.valueChangeHandler}
            onBlur={props.gender.inputBlurHandler}
            type="radio"
            checked={props.gender.inputValue === "f"}
          />
          <label>Female</label>
        </div>

        <div className="error" data-testid="pwd-err-msg">
          {props.gender.hasError && "Please select a valid gender"}
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
          placeholder="NIC"
          value={props.NIC.inputValue}
          onChange={props.NIC.valueChangeHandler}
          onBlur={props.NIC.inputBlurHandler}
          type="text"
          styles={undefined}
        />
        <div className="error" data-testid="pwd-err-msg">
          {props.NIC.hasError &&
            "Please enter a valid NIC"}
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
        {/* <ReactDropdown options={provinces} onChange={props.district.valueChangeHandler} value={props.district.inputValue} placeholder="Select an option" />;
            <ReactDropdown /> */}
        <div className={classes.ProvinceContainer}>
          <select
            onChange={props.province.valueChangeHandler}
            value={props.province.inputValue}
            onBlur={props.province.inputBlurHandler}
            placeholder="Province"
            defaultValue={provinces[0]}
          >
            {provinces.map((province) => {
              return <option value={province}>{province}</option>;
            })}
          </select>
        </div>
        <div className={classes.ProvinceContainer}>
          <select
            disabled={props.province.inputValue === ""}
            placeholder="District"
            onChange={props.district.valueChangeHandler}
            value={props.district.inputValue}
            onBlur={props.district.inputBlurHandler}
          >
            {dictrictsAndProvinces[props.province.inputValue] &&
              dictrictsAndProvinces[props.province.inputValue].map(
                (province: string) => {
                  return <option value={province}>{province}</option>;
                }
              )}
          </select>
        </div>
        <div className="error" data-testid="pwd-err-msg">
          {props.district.hasError ||
            (props.province.hasError &&
              "Please enter a valid province")}
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
            {props.password.hasError && "Length of the password should be grater than 6"}
          </div>
        </div>
      {props.message != "" && <div className={classes.ErrorContainer}>
          <p className={props.successful ? "success" : "error"}>{props.message}</p>
      </div>}
      <Button type="submit" onClick={() => {}}>
        {props.sending ? "Sending" : "Register"}
      </Button>
    </form>
  );
}

export default Register;
