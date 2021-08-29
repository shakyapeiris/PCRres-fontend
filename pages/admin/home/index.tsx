import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Store/AuthContext";
import classes from "../../../styles/admin/Home.module.css";
import Overlay from "../../../Components/Overlay";
import Input from "../../../Components/UI/Input";
import useInput from "../../../Hooks/useInput";
import { useRouter } from "next/router";

let date = "";
let timeStamp = "";
const timeArray: any = {
  "08:00 - 10:00": 1,
  "10:00 - 12:00": 2,
  "12:00 - 14:00": 3,
  "14:00 - 16:00": 4,
  "16:00 - 18:00": 5
}

function Index() {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBoking] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [sending, setSending] = useState(false);
  
  const search = useInput((inputVal) => inputVal.toString().trim() != "");
  const [filteredRecords, setFilteredRecords] = useState<any>(null) 

  const fetchData = async () => {
    setLoading(true);
    const url = `http://localhost:5000/admin/records/${localStorage.getItem(
      "loginId"
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    data.bookings.sort((a: any, b: any) => {
      if (a.date === b.date){
        return timeArray[a.time] - timeArray[b.time]
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    console.log(data);
    setData(data);
    setFilteredRecords(data.records)
    setLoading(false);
  };

  useEffect(() => {
    if (search.inputValue.trim().length > 1){
      setFilteredRecords(data && data.records.filter((i:any) => i.testId.includes(search.inputValue)))
    }
  }, [search.inputValue])

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

  const [status, setStatus] = useState("");

  const authContext = useContext(AuthContext)

  const router = useRouter()

  const postNewRecord = async () => {
    setSending(true);
    const url = "http://localhost:5000/admin/add-record";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Id: selectedBooking._id,
        hospitalId: selectedBooking.hospital,
        userId: selectedBooking.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);
    setSending(false);
    setSelectedBoking(null);
    fetchData();
  };

  const updateReport = async () => {
    setSending(true);

    const url = "http://localhost:5000/admin/update-record";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        recordId: selectedReport._id,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);
    setSending(false);
    setSelectedReport(null);
    fetchData();
  };

  function changeDate(iDate: string){ 
    timeStamp = "";
    date = iDate; 
    return (<p style={{paddingBottom: "3px", borderBottom: "2px solid black"}}>{iDate}</p>);
  }

  function changeTime(iTime: string){
    timeStamp = iTime;
    return (<h3 style={{textAlign: "center"}}>{iTime}</h3>)
  }

  useEffect(() => {
    if (authContext.loginId && !authContext.isAdmin){
      router.replace('/profile')
    }
    else if(authContext.loginId === null){
      router.replace('/admin/auth/login')
    }
    fetchData();
  }, []);
  return (
    <>
      {selectedReport && (
        <Overlay>
          <div className={classes.OverlayDiv}>
            <h1>Test Id: {selectedReport.testId}</h1>
            <p>Name: {selectedReport.patient.name}</p>
            <p>NIC: {selectedReport.patient.NIC}</p>

            <div>
              <input
                type="radio"
                value="positive"
                name="result"
                onClick={() => {
                  setStatus("positive");
                }}
              />{" "}
              Positive
            </div>
            <div>
              <input
                type="radio"
                value="negative"
                name="result"
                onClick={() => {
                  setStatus("negative");
                }}
              />{" "}
              Negative
            </div>

            <div className={classes.ButtonContainer}>
              <button className={classes.ContinueButton} onClick={updateReport}>
                {sending ? "Sending..." : "Submit"}
              </button>
              <button
                className={classes.CancelButton}
                onClick={cancelReportFocus}
              >
                Cancel
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

            <div className={classes.ButtonContainer}>
              <button
                className={classes.ContinueButton}
                onClick={postNewRecord}
              >
                {sending ? "Sending..." : "Submit"}
              </button>
              <button
                className={classes.CancelButton}
                onClick={cancelBookingFocus}
              >
                Cancel
              </button>
            </div>
          </div>
        </Overlay>
      )}
      <div className={classes.Container}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={classes.BookingContainer}>
              <h1>Bookings</h1>
              {data.bookings.map((i: any, index: number) => {
                return (
                  <>
                  {i.date != date && changeDate(i.date)}
                  {i.time != timeStamp && changeTime(i.time)}
                  <div className={classes.Box}>
                    <div>
                      <h3>{i._id}</h3>
                      <p>NIC: {i.user.NIC}</p>
                      <p>Token: {i.token}</p>
                      <p>
                        Date: {i.date}, Time: {i.time}
                      </p>
                    </div>
                    <div
                      className={classes.Circle}
                      onClick={() => {
                        changeBookingFocus(index);
                      }}
                    >
                      +
                    </div>
                  </div>
                  </>
                );
              })}
            </div>
            <div className={classes.ReportContainer}>
              <h1>Pending reports</h1>
              <Input
                type="text"
                styles={undefined}
                onChange={search.valueChangeHandler}
                onBlur={search.inputBlurHandler}
                value={search.inputValue}
                placeholder="Search"
              />
              {filteredRecords && filteredRecords.map((i: any, index: number) => {
                return (
                  <div className={classes.Box}>
                    <div>
                      <h3>{i.testId}</h3>
                      <p>Patient Name: {i.patient.name}</p>
                      <p>NIC: {i.patient.NIC}</p>
                    </div>
                    <div
                      className={classes.Circle}
                      onClick={() => {
                        changeReportFocus(index);
                      }}
                    >
                      !
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Index;
