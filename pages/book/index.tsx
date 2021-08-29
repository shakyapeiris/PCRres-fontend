import React, {
  ChangeEventHandler,
  useState,
  FormEventHandler,
  useContext,
  useEffect,
} from "react";
import classes from "../../styles/Book.module.css";
import Input from "../../Components/UI/Input";
import useInput from "../../Hooks/useInput";
import Button from "../../Components/UI/Button";
import { AuthContext } from "../../Store/AuthContext";
import { useRouter } from "next/router";

interface Props {
  mydata: {
    id: string;
    name: string;
    address: string;
    price: number;
    date: string[];
    time: string[];
  }[];
}

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function Index(props: Props) {
  const ctx = useContext(AuthContext)
  let router = useRouter();
  useEffect(() => {
    if(ctx.loginId === null){
      router.push('/auth/login')
    }
    else if (ctx.isAdmin && ctx.loginId){
      router.replace('/admin/home')
    }
  }, [])
  const [hospitals, setHospitals] = useState(props.mydata);
  const [index, setIndex] = useState(0);
  const timeSlots = hospitals[index].time;
  const [timeSlot, setTimeSlot] = useState<string | null>(null);

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  const changeHospitalHandler: ChangeEventHandler<HTMLSelectElement> = (
    e: any
  ) => {
    setIndex(e.target.value);
    setTimeSlot(null);
  };
  const date = useInput(
    (inputVal) =>
      hospitals[index].date.includes(daysOfWeek[new Date(inputVal).getDay()]) &&
      new Date(inputVal).getTime() - new Date().getTime() > 0
  );

  const changeTimeSlotHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setTimeSlot(e.target.value);
    }
  };

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setSending(true);
    const url = "http://localhost:5000/user/bookings/add";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        hospital: hospitals[index].id,
        user: localStorage.getItem("loginId"),
        date: date.inputValue,
        time: timeSlot,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSending(false);
    setMessage(data.message);
    setSuccess(data.successful);
    date.reset();
    setTimeSlot(null)
  };

  return (
    <form className={classes.Container} onSubmit={submitFormHandler}>
      <h1>Book a spot</h1>
      <div className={classes.FormGroup}>
        <label>Select a Hospital: </label>
        <select
          onChange={changeHospitalHandler}
          defaultValue={hospitals[0].name}
        >
          {hospitals.map((item, index) => {
            return <option value={index}>{item.name}</option>;
          })}
        </select>
      </div>
      <div className={classes.FormGroup}>
        <label>Select the date: </label>
        <Input
          placeholder="Select the date"
          styles={undefined}
          type="date"
          value={date.inputValue}
          onBlur={date.inputBlurHandler}
          onChange={date.valueChangeHandler}
        />
        <div className="error">
          {date.hasError &&
            "Dear user, seems like the organization is not working onn that day or you might have entered a date in past"}
        </div>
      </div>
      <div className={classes.FormGroup}>
        <label>
          Select the time slot(Note that time slots are different from hospital
          to hospital)
        </label>
        {timeSlots.map((slot) => {
          return (
            <div className={classes.RadioContainer}>
              <input
                value={slot}
                type="radio"
                name="time"
                onChange={changeTimeSlotHandler}
                checked={slot === timeSlot}
              />
              <label>{slot}</label>
            </div>
          );
        })}
      </div>
      {message && <p className={success ? "success" : "error"}>{message}</p>}
      <Button type="submit" onClick={() => {}}>
        {sending ? "Sending" : "Book Now!"}
      </Button>
    </form>
  );
}

export async function getStaticProps() {
  const url = "http://localhost:5000/user/hospitals";
  const response = await fetch(url);
  const data = await response.json();
  return {
    props: {
      mydata: data,
    },
    revalidate: 10, //interval of 10 seconds
  };
}

export default Index;
