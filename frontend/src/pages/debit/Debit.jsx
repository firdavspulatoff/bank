import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Debit() {
  const [debits, setDebits] = useState([]);
  const [update, setUpdate] = useState("");

  useEffect(
    function () {
      const getDebits = async () => {
        const payload = await axios.Get("/debit/all");
        if (payload.status === "success") {
          setDebits(payload.data);
        }
      };

      getDebits();
    },
    [update]
  );

  return (
    <>
      <h1>Депозиты</h1>
      <table>
          <thead>
            <tr>
            <th>Номер</th>
        <th>Фамилия</th>
        <th>Дата выдачи</th>
        <th>Город  проживания</th>
        <th>Цена депозита</th>
            </tr>
          </thead>
          <tbody>
          {debits.map((val, key) => {
        return (
          <tr key={key + 853495}>
            <td>
              {key+1}  
            </td>
            <td>{val.User.LastName}</td>
            <td>{val.StartDate}</td>
            <td>{val.User.CityBirth}</td>
            <td>{val.Amount}</td>
            <button
              onClick={async function (e) {
                e.preventDefault();
                await axios.Delete("/debit/" + val.ID);
                setUpdate("delete" + update);
              }}
            >
              DELETE
            </button>
          </tr>
        );
      })}
          </tbody>
      </table>
     <p> <Link className="add" to={"/debit/add"}>Add New Debit</Link></p>
    </>
  );
}
