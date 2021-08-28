import React, { useEffect, useState } from "react";
import classes from "../../styles/Profile.module.css";
import Input from "../../Components/UI/Input";
import useInput from "../../Hooks/useInput";
import Button from "../../Components/UI/Button";

function Index() {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

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
    setData(data);
    setLoading(false);
    name.setInputValue(data.name);
    email.setInputValue(data.email);
    contactNo.setInputValue(data.contactNo);
    address.setInputValue(data.address);
    setGender(data.gender);
    NIC.setInputValue(data.NIC);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.Cont}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form className={classes.ProfileDataContainer}>
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
            <Button type="submit" onClick={() => {}}>
              Submit
            </Button>
          </form>
          <div className={classes.detailContainer}>
            <h3>Reports</h3>
            <div className={classes.RecordContainer}>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium officia sint molestiae doloremque, ratione tempora
                vero voluptatum saepe provident magni aliquam reprehenderit
                consectetur temporibus quas deserunt velit? Dolor aspernatur
                cupiditate tempore impedit assumenda similique amet tenetur iure
                labore vero officiis, animi laudantium corporis, facilis totam
                quibusdam quidem hic ullam repellendus aut dicta ipsa expedita
                unde? Voluptate in optio necessitatibus ratione rem similique
                fugit doloribus voluptatibus provident repudiandae, beatae ipsum
                quis sint modi est, iure minus. Ipsa, autem voluptatibus,
                aliquam reiciendis aliquid inventore deleniti quod consectetur
                iure veniam distinctio tenetur ipsum repellendus dolores enim
                quo ratione! Nisi tempora doloribus fugiat minus.
              </p>
            </div>
            <h3>Bookings</h3>
            <div className={classes.BookingContainer}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti est excepturi, consequuntur corporis at suscipit
                quaerat odio dolore, rem cum dolorem blanditiis ex earum fuga
                modi a porro, quisquam voluptates officia facilis. Praesentium
                cupiditate aperiam molestiae, commodi iure corporis ut non
                libero iusto tempore! Magni, voluptas expedita accusantium
                praesentium ad doloribus eligendi perspiciatis sunt dolores
                nulla fuga maxime deleniti eaque delectus alias sit ratione! At
                totam blanditiis, quasi eveniet nostrum perferendis voluptatibus
                cum, molestiae nesciunt libero corporis labore perspiciatis
                rerum assumenda eum delectus asperiores incidunt nihil et modi
                repellat velit? Quae nisi veniam eius itaque sint accusantium
                quos dolorem numquam nesciunt expedita, ipsum nam laudantium qui
                voluptates dignissimos maxime placeat, ab nihil totam deleniti
                quisquam. Quas veritatis a odit dolorum laboriosam, itaque quasi
                dignissimos est quis ex possimus expedita excepturi beatae
                delectus repellendus voluptas soluta numquam nemo tempora enim.
                Officiis, amet. Minima voluptatem odio accusamus in sit ea
                deserunt dolor quod nemo eligendi, illo accusantium modi enim
                quam delectus quis animi ad at corporis. Labore ullam neque
                corporis reiciendis consectetur doloremque! Ab, necessitatibus
                voluptatum itaque magni beatae asperiores id fugiat minima!
                Atque enim iste praesentium ipsa. Veritatis nisi quod adipisci
                quia repudiandae cum perspiciatis recusandae fuga aliquid
                quisquam cupiditate ea ullam distinctio nesciunt, itaque magni,
                aspernatur omnis culpa dignissimos? Autem quis nisi porro nihil
                non tempore aspernatur laboriosam, eligendi rerum optio enim
                accusamus labore? Ipsam perspiciatis id aliquam deserunt
                sapiente fugiat quos quasi enim, est, assumenda sint, tempore
                alias nulla quia neque nihil architecto dolore modi voluptatibus
                distinctio libero illum velit? Ipsam iste in perferendis
                consequuntur eos, tenetur numquam expedita amet maiores
                reiciendis enim, non assumenda architecto minima qui? Omnis
                nesciunt consequatur asperiores ex, vel illo labore minima ullam
                fugit assumenda recusandae id sunt culpa exercitationem,
                doloremque repellat voluptates aspernatur consequuntur maiores?
                Fugit porro sed unde illum quas quidem delectus. Et voluptatibus
                laborum quidem sed in deserunt quia dolor? Unde reiciendis
                aspernatur voluptate eligendi nemo assumenda neque distinctio,
                maxime officia reprehenderit, sed, vel rem blanditiis non libero
                eaque dolores inventore. Et inventore cum recusandae dolor omnis
                quo quis eaque laudantium, tempora dolores eum obcaecati
                voluptatum harum minus architecto reprehenderit quos voluptatem
                quod porro ea. Aut soluta omnis vitae illo architecto,
                laudantium harum amet animi aliquid inventore sit perspiciatis,
                natus minus quidem odio magni voluptatibus aliquam voluptates
                velit. Quisquam quam explicabo doloribus dignissimos mollitia in
                ab facilis libero! Sint veritatis in dignissimos maiores
                deserunt laboriosam cum, odio, placeat vitae quas consequatur
                non illo ratione modi beatae? Laboriosam officiis pariatur quia
                illo sed sunt, doloribus nulla. Incidunt quibusdam ducimus
                laudantium velit dolor eveniet pariatur beatae ipsa illum,
                suscipit aspernatur amet illo culpa harum voluptate quis ipsum
                modi? Alias ab aperiam dicta quisquam adipisci numquam magni
                neque ipsa perspiciatis rerum recusandae, doloremque, nulla
                eligendi at fuga harum autem possimus laudantium error ea
                officiis nostrum. Necessitatibus tempore voluptatem blanditiis
                ipsam! Expedita harum eos quaerat, quod nihil nostrum eaque ab
                atque ea mollitia doloribus iusto error vel provident non.
                Tempore voluptates, nesciunt veniam asperiores mollitia,
                provident ab, illum voluptatem iure quis corrupti quos quia
                aperiam.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
