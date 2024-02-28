import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const percent = 23;

function CreditForm() {
  const { register, handleSubmit, control } = useForm();
  const [users, setUsers] = useState([]);
  const [showPercent, setShowPercent] = useState(false);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const [month, setMonth] = useState([]);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState();
  useEffect(function () {
    const getUsers = async () => {
      const today = new Date().toISOString().split("T")[0];
      setMaxDate(today);
      const payload = await axios.Get("/user/all");
      if (payload.status === "success") {
        setUsers(payload.data);
      }
    };

    getUsers();
  }, []);
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      data.userId = +data.userId;
      const response = await axios.Add(data, "/credit/create");

      if (response.status == "success") {
        navigate("/credit");
      }
    } catch (error) {
      alert(
        `Error in debit form, data ${error?.response?.data?.data}, message ${error?.response.data.message}`
      );
    }

    // Send data to backend or perform any other action
  };

  return (
    <>
      <form className="fof" onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: "black" }}>Кредит</h1>
        <label className="suser" style={{ color: "black" }}>
          Select User:
          <Controller
            name="userId"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <select {...field}>
                <option value={null}>Select</option>
                {users.map((val, key) => {
                  return (
                    <option key={key + 123123} value={val.ID}>
                      {val.FirstName} {val.LastName}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </label>
        <br style={{ marginBottom: "15px" }} />

        <input
          type="date"
          {...register("startDate")}
          placeholder="Start Date"
          max={maxDate}
        />
        <br />
        {/* <input type="text" {...register("type")} placeholder="Type" /> */}
        <label style={{ color: "black" }}>
          Cрок кредита:
          <Controller
            name="type"
            control={control}
            defaultValue="male"
            required
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  e.preventDefault();
                  setType(e.target.value);
                  setShowPercent(false);
                }}
              >
                <option value="6 мес">6 мес</option>
                <option value="12 мес">12 мес</option>
                <option value="24 мес">24 мес</option>
                <option value="36 мес">36 мес </option>
              </select>
            )}
          />
        </label>
        <br />
        <label style={{ color: "black" }}>
          currency:
          <Controller
            name="value"
            control={control}
            defaultValue="male"
            required
            render={({ field }) => (
              <select {...field}>
                <option value="">byn</option>
                <option value="male">euro</option>
                <option value="female">sum</option>
              </select>
            )}
          />
        </label>
        <br />
        {/* <input type="text" {...register("value")} placeholder="Value" /> */}
        <input
          type="text"
          {...register("amount")}
          placeholder="Цена"
          onChange={(e) => {
            e.preventDefault();
            setAmount(e.target.value);
            setShowPercent(false);
          }}
        />
        <br />
        <button type="submit">Submit</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (amount == "" && type == "") {
              return;
            } else {
              console.log(type);
              switch (type) {
                case "6 мес":
                  setMonth([1, 2, 3, 4, 5, 6]);
                  break;
                case "12 мес":
                  setMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
                  break;
                case "24 мес":
                  setMonth([
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                    1, 2, 3, 4,
                  ]);
                  break;
                case "36 мес":
                  setMonth([
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                    1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2,
                  ]);
                  break;

                default:
                  setMonth([]);
                  break;
              }
              setTotalAmount(percent * +amount);
              setShowPercent(!showPercent);
            }
          }}
        >
          Calculate percent
        </button>
      </form>
      <div>
        {showPercent ? (
          <>
            <p>Сумма платежов</p>
            {month.map((val, key) => {
              console.log(val, key);
              const summa = (1 / month.length) * +amount * percent;

              return (
                <>
                  {key + 1} месяц: {summa}
                </>
              );
            })}
            <p>Общая сумма: {totalAmount}</p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CreditForm;
