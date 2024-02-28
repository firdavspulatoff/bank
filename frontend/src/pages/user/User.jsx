import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState("");
  useEffect(
    function () {
      const getUsers = async () => {
        const payload = await axios.Get("/user/all");
        if (payload.status === "success") {
          setUsers(payload.data);
        }
      };

      getUsers();
    },
    [update]
  );

  return (
    < div className="user" >
      <h1 style={{color:'black'}}>Клиенты</h1>
        <table>
          {/* <thead>
            <tr>
            <th>Номер</th>
        <th>Клиент</th>
        <th>Паспорт серия</th>
        <th>Место рождения</th>
        <th>Город  проживания</th>
        <th>Пол</th>
            </tr>
          </thead> */}
          <tbody>
          {users.map((val, key) => {
        console.log(val);
       
        return (
          <tr key={key} style={{ display: "flex" }}>
            <td>{key+1}</td>
            <td>{val.LastName +" " + val.FirstName}</td>
            <td>{val.PassportSeria}</td>
            <td>{val.CityBirth}</td>
            <td> {val.AddressRegistration}</td>
            <td>{val.Gender}</td>
            <button
            className="del"
              onClick={async function (e) {
                e.preventDefault();
                await axios.Delete("/user/" + val.ID);
                setUpdate("delete" + update);
              }}
            >
              Удалить
            </button>
          </tr>
        );
      })}
          </tbody>
        </table>
       

      
     <p className="add"> <Link to={"/user/add"}>Add New User +</Link></p>
    </div>
  );
}
