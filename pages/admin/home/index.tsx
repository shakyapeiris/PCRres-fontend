import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Store/AuthContext";
import classes from "../../../styles/admin/Home.module.css";
import Overlay from "../../../Components/Overlay";
function Index() {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBoking] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [sending, setSending] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const url = `http://localhost:5000/admin/records/${localStorage.getItem(
      "loginId"
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  };

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

  useEffect(() => {
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
                  <div className={classes.Box}>
                    <div>
                      <h3>{i._id}</h3>
                      <p>Name: {i.user.name}</p>
                      <p>NIC: {i.user.NIC}</p>
                      <p>Token: {i.token}</p>
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
                );
              })}
            </div>
            <div className={classes.ReportContainer}>
              <h1>Pending reports</h1>
              {data.records.map((i: any, index: number) => {
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
