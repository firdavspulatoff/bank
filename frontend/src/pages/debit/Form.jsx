import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//     gorm.Model
// }

function DebitForm() {
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
      const response = await axios.Add(data, "/debit/create");

      if (response.status === "success") {
        navigate("/debit");
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
      <h1 style={{color:"black"}}>Депозит</h1>
      <label>
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
      <input type="date" {...register("startDate")} placeholder="Start Date" />
      <input type="text" {...register("type")} placeholder="Type" />
      <input type="text" {...register("value")} placeholder="Value" />
      <input type="text" {...register("amount")} placeholder="Amount" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default DebitForm;
