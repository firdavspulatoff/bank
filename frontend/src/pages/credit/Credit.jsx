import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Credit() {
  const [credits, setCredits] = useState([]);
  const [update, setUpdate] = useState("");

  useEffect(
    function () {
      const getCredits = async () => {
        const payload = await axios.Get("/credit/all");
        if (payload.status === "success") {
          setCredits(payload.data);
        }
      };

      getCredits();
    },
    [update]
  );

  return (
    <>
      <h1>Кредиты</h1>
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Фамилия</th>
            <th>Дата выдачи</th>
            <th>Город проживания</th>
            <th>Цена кредита</th>
          </tr>
        </thead>
        <tbody>
          {credits.map((val, key) => {
            console.log(val);
            return (
              <tr key={key + 123398534589357}>
                <td>{key + 1}</td>
                <td>{val.User.LastName}</td>
                <td>{val.StartDate}</td>
                <td>{val.User.CityBirth}</td>
                <td>{val.Amount}</td>
                <button
                  onClick={async function (e) {
                    e.preventDefault();
                    await axios.Delete("/credit/" + val.ID);
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
      <p>
        <Link className="add" to={"/credit/add"}>
          Add New Credit
        </Link>
      </p>
    </>
  );
}
