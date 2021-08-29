import React, { useEffect, useState, useContext } from "react";
import classes from "../../styles/Profile.module.css";
import Input from "../../Components/UI/Input";
import useInput from "../../Hooks/useInput";
import Button from "../../Components/UI/Button";
import Overlay from "../../Components/Overlay";

import { useRouter } from 'next/router'
import { AuthContext } from "../../Store/AuthContext";

function Index() {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBoking] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const changeReportFocus = (index: number) => {
    setSelectedReport(data.records[index]);
  };

  const cancelReportFocus = () => {
    setSelectedReport(null);
  };

  const changeBookingFocus = (index: number) => {
    setSelectedBoking(data.bookings[index]);
  };

  const cancelBookingFocus = () => {
    setSelectedBoking(null);
  };

  const name = useInput((inputVal) => inputVal.toString().trim() != "");
  const email = useInput((inputVal) => inputVal.toString().includes("@"));
  const contactNo = useInput((inputVal) => inputVal.toString().length === 10);
  const address = useInput((inputVal) => inputVal.toString().trim() != "");
  const NIC = useInput(
    (inputVal) =>
      (inputVal.toString().endsWith("V") &&
        inputVal.toString().length === 10) ||
      inputVal.toString().length === 12
  );
  const [gender, setGender] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const url = `http://localhost:5000/user/${localStorage.getItem("loginId")}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    data.bookings.reverse();
    data.records.reverse();
    setData(data);
    setLoading(false);
    name.setInputValue(data.name);
    email.setInputValue(data.email);
    contactNo.setInputValue(data.contactNo);
    address.setInputValue(data.address);
    setGender(data.gender);
    NIC.setInputValue(data.NIC);
  };
  const ctx = useContext(AuthContext);
  let router = useRouter();
  useEffect(() => {
    if (ctx.loginId === null) {
      router.push("/auth/login");
    } else if (ctx.isAdmin && ctx.loginId) {
      router.replace("/admin/home");
    }

    fetchData();
  }, []);

  const updateProfileHandler = async (e: any) => {
    setSending(true);
    e.preventDefault();
    const url = "http://localhost:5000/user/update";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("loginId"),
        name: name.inputValue,
        email: email.inputValue,
        address: address.inputValue,
        NIC: NIC.inputValue,
        gender: gender,
        contactNo: contactNo.inputValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMessage(data.message);
    setSending(false);
  };
  return (
    <>
      {selectedReport && (
        <Overlay>
          <div className={classes.OverlayDiv}>
            <h1>Test Id: {selectedReport.testId}</h1>
            <p>Name: {selectedReport.patient.name}</p>
            <p>NIC: {selectedReport.patient.NIC}</p>
            <p>
              Status:{" "}
              {selectedReport.pending ? "Pending" : selectedReport.result}
            </p>
            <div className={classes.ButtonContainer}>
              <button
                className={classes.CancelButton}
                onClick={cancelReportFocus}
              >
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}
      {selectedBooking && (
        <Overlay>
          <div className={classes.OverlayDiv}>
            <h1>Token {selectedBooking.token}</h1>
            <p>Patient Name: {selectedBooking.user.name}</p>
            <p>Patient Address: {selectedBooking.user.address}</p>
            <p>Patient NIC: {selectedBooking.user.NIC}</p>
            <p>Date: {selectedBooking.date}</p>
            <p>Time: {selectedBooking.time}</p>
            <div className={classes.ButtonContainer}>
              <button
                className={classes.CancelButton}
                onClick={cancelBookingFocus}
              >
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}
      <div className={classes.Cont}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <form
              className={classes.ProfileDataContainer}
              onSubmit={updateProfileHandler}
            >
              <h1>Profile</h1>
              <div className={classes.ErrorContainer}>
                <label>Name: </label>
                <Input
                  value={name.inputValue}
                  onChange={name.valueChangeHandler}
                  onBlur={name.inputBlurHandler}
                  placeholder="Name"
                  type="text"
                  styles={undefined}
                />
                <div className="error">
                  {name.hasError && "Enter a valid name"}
                </div>
              </div>
              <div className={classes.ErrorContainer}>
                <label>Email: </label>
                <Input
                  value={email.inputValue}
                  onChange={email.valueChangeHandler}
                  onBlur={email.inputBlurHandler}
                  placeholder="Email"
                  type="text"
                  styles={undefined}
                />
                <div className="error">
                  {name.hasError && "Enter a valid name"}
                </div>
              </div>
              <div className={classes.ErrorContainer}>
                <label>Contact Number: </label>
                <Input
                  value={contactNo.inputValue}
                  onChange={contactNo.valueChangeHandler}
                  onBlur={contactNo.inputBlurHandler}
                  placeholder="Contact Number"
                  type="text"
                  styles={undefined}
                />
                <div className="error">
                  {name.hasError && "Enter a valid name"}
                </div>
              </div>

              <div className={classes.ErrorContainer}>
                <label>Address: </label>
                <Input
                  value={address.inputValue}
                  onChange={address.valueChangeHandler}
                  onBlur={address.inputBlurHandler}
                  placeholder="Address"
                  type="text"
                  styles={undefined}
                />
                <div className="error">
                  {name.hasError && "Enter a valid name"}
                </div>
              </div>

              <div className={classes.ErrorContainer}>
                <label>NIC: </label>
                <Input
                  value={NIC.inputValue}
                  onChange={NIC.valueChangeHandler}
                  onBlur={NIC.inputBlurHandler}
                  placeholder="Address"
                  type="text"
                  styles={undefined}
                />
                <div className="error">
                  {name.hasError && "Enter a valid name"}
                </div>
              </div>
              <div className={classes.ErrorContainer}>
                <label>Gender: </label>
                <div>
                  <input
                    type="radio"
                    value="m"
                    onClick={() => {
                      setGender("m");
                    }}
                    checked={gender === "m"}
                  />{" "}
                  Male
                </div>
                <div>
                  <input
                    type="radio"
                    value="f"
                    onClick={() => {
                      setGender("f");
                    }}
                    checked={gender === "f"}
                  />{" "}
                  Female
                </div>
              </div>
              <div className={classes.ErrorContainer}>
                {message && <p className="success">{message}</p>}
              </div>
              <Button type="submit" onClick={() => {}}>
                Submit
              </Button>
            </form>
            <div className={classes.detailContainer}>
              <h3>Reports</h3>
              <div className={classes.RecordContainer}>
                {data.records.reverse().map((i: any, index: number) => {
                  return (
                    <div
                      className={
                        i.pending
                          ? classes.ResultPending
                          : classes.ResultRecieved
                      }
                    >
                      <div>
                        <h3>{i._id}</h3>
                        <p>
                          Status:{" "}
                          {i.pending ? "Pending" : i.result.toUpperCase()}
                        </p>
                      </div>
                      <div
                        className={
                          i.pending ? classes.RedCircle : classes.Circle
                        }
                        onClick={() => {
                          changeReportFocus(index);
                        }}
                      >
                        ?
                      </div>
                    </div>
                  );
                })}
              </div>
              <h3>Bookings</h3>
              <div className={classes.BookingContainer}>
                {data.bookings.map((i: any, index: number) => {
                  return (
                    <div className={classes.Booking}>
                      <div>
                        <h3>{i._id}</h3>
                        <p>Token: {i.token}</p>
                      </div>
                      <div
                        className={classes.Circle}
                        onClick={() => {
                          changeBookingFocus(index);
                        }}
                      >
                        ?
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Index;
