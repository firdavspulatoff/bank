import { useForm, Controller } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//     gorm.Model
// }

function UserForm() {
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [maxDate, setMaxDate] = useState("");
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today);
  }, []);
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await axios.Add(data, "/user/create");

      if (response.status == "success") {
        navigate("/user");
      } else if (response.status == "error") {
        alert(
          `Error in user form, data ${response?.data}, message ${response.message}`
        );
      }
    } catch (error) {
      alert(
        `Error in user form, data ${error?.response?.data?.data}, message ${error?.response.data.message}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="inpf"
        type="text"
        {...register("firstName")}
        placeholder="First Name"
        required
      />
      <input
        className="inpf"
        type="text"
        {...register("lastName")}
        placeholder="Last Name"
        required
      />
      <input
        className="inpf"
        type="text"
        {...register("middleName")}
        placeholder="Middle Name"
        required
      />
      <input
        className="inpf"
        type="date"
        {...register("dateOfBirth")}
        placeholder="Date Of Birth"
        required
        max={maxDate}
      />
      <label className="inpf">
        Select Gender:
        <Controller
          name="gender"
          control={control}
          defaultValue="male"
          required
          render={({ field }) => (
            <select {...field}>
              <option value="">Select</option>
              <option value="male">Мужской</option>
              <option value="female">Женской</option>
            </select>
          )}
        />
      </label>
      <input
        className="inpf"
        type="text"
        required
        {...register("passportSeria")}
        placeholder="Passport Seria"
      />
      {
        <input
          className="inpf"
          type="text"
          required
          {...register("passportNumber")}
          placeholder="Passport Number"
        />
      }
      <input
        className="inpf"
        type="text"
        {...register("issuedBy")}
        placeholder="issuedBy"
        required
      />
      {/* { <input
      className="inpf"
        type="date"
        required
        {...register("dateIssued")}
        placeholder="Date Issued"
      /> } */}

      {
        <input
          className="inpf"
          type="text"
          {...register("numberId")}
          placeholder="Number Id"
          required
        />
      }

      <input
        className="inpf"
        type="text"
        {...register("cityBirth")}
        placeholder="City Birth"
      />

      {
        <label className="inpf">
          Select City:
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} required>
                <option value="">Select</option>
                <option value="Tashkent">Tashkent</option>
                <option value="Samarqand">Samarqand</option>
              </select>
            )}
          />
        </label>
      }
      <input
        className="inpf"
        type="text"
        {...register("address")}
        placeholder="Address"
        required
      />
      <input
        className="inpf"
        type="text"
        {...register("phoneNumber")}
        placeholder="Phone Number"
      />
      {
        <input
          className="inpf"
          type="text"
          {...register("homePhoneNumber")}
          placeholder="Home Phone Number"
        />
      }

      <input
        className="inpf"
        type="email"
        {...register("email")}
        placeholder="Email"
      />

      <input
        className="inpf"
        type="text"
        {...register("work")}
        placeholder="Work"
      />
      <input
        className="inpf"
        type="text"
        {...register("level")}
        placeholder="Level"
      />

      {
        <label className="inpf">
          Select City Registration:
          <Controller
            name="cityRegistration"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} required>
                <option value="">Select</option>
                <option value="Tashkent">Tashkent</option>
                <option value="Samarqand">Samarqand</option>
              </select>
            )}
          />
        </label>
      }
      <input
        className="inpf"
        type="text"
        {...register("addressRegistration")}
        placeholder="Город проживания"
        required
      />

      {
        <label className="inpf">
          Select Family Status:
          <Controller
            name="familyStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} required>
                <option value="">Select</option>
                <option value="Jenat">Jenat</option>
                <option value="Zamujem">Zamujem</option>
                <option value="Holostyak">Holostyak</option>
              </select>
            )}
          />
        </label>
      }

      {
        <label className="inpf">
          Гражданство:
          <Controller
            name="citizenship"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} required>
                <option value="">Выбрать</option>
                <option value="Uzbekistan">Узбекистан</option>
                <option value="Russia">Россия</option>
                <option value="Kazakhstan">Беларусь</option>
              </select>
            )}
          />
        </label>
      }
      {
        <label className="inpf">
          Select Disability:
          <Controller
            name="disability"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} required>
                <option value="">Select</option>
                <option value="I group">I group</option>
                <option value="II group">II group</option>
                <option value="III group">III group</option>
              </select>
            )}
          />
        </label>
      }

      {
        <label className="inpf">
          <Controller
            name="isPensioner"
            control={control}
            defaultValue={false}
            render={({ field }) => <input type="checkbox" {...field} />}
          />
          Pensioner
        </label>
      }
      {
        <input
          className="inpf"
          type="text"
          {...register("income")}
          placeholder="Income"
        />
      }
      {
        <label className="inpf">
          <Controller
            name="isMillitary"
            control={control}
            defaultValue={false}
            render={({ field }) => <input type="checkbox" {...field} />}
          />
          Военно объязанность
        </label>
      }

      <button
        style={{ backgroundColor: "black", padding: "8px" }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;
