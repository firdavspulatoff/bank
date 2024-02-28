import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//     gorm.Model
// }

function CreditForm() {
  const { register, handleSubmit, control } = useForm();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(function () {
    const getUsers = async () => {
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

    <form className="fof" onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{color:"black"}}>Кредит</h1>
      <label className="suser" style={{color:"black"}}>
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
      <br style={{marginBottom:"15px"}} />
       
      <input  type="date" {...register("startDate")} placeholder="Start Date" />
      <br />
      {/* <input type="text" {...register("type")} placeholder="Type" /> */}
      <label style={{color:"black"}}>
        Cрок кредита:
        <Controller
          name="type"
          control={control}
          defaultValue="male"
          required
          render={({ field }) => (
            <select {...field}>
              <option value="">6 мес</option>
              <option value="male">12 мес</option>
              <option value="female">24 мес</option>
              <option value="female">36 мес </option>
            </select>
          )}
        />
      </label>
      <br />
      <label style={{color:"black"}}>
      currency:
        <Controller
          name="type"
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
      <input type="text" {...register("amount")} placeholder="Цена" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreditForm;
