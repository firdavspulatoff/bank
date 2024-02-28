import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import User from "./pages/user/User";
import UserForm from "./pages/user/Form";
import Credit from "./pages/credit/Credit";
import Debit from "./pages/debit/Debit";
import CreditForm from "./pages/credit/Form";
import DebitForm from "./pages/debit/Form";

function App() {
  return (
    <div className="app">
      <Router>
        <header>
          <h1>ОХО банк💵</h1>
          <nav className="navbar">
           <p> <Link to={"/user"}>Клиенты</Link></p>
           <p> <Link to={"/credit"}>Кредит</Link></p>
           <p><Link to={"/debit"}>Депозит</Link></p>
          </nav>
        </header>

        <Routes>
          {/* USER ROUTES */}
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<UserForm />} />

          {/* CREDIT ROUTES */}
          <Route path="/credit" element={<Credit />} />
          <Route path="/credit/add" element={<CreditForm />} />

          {/* DEBIT ROUTES */}
          <Route path="/debit" element={<Debit />} />
          <Route path="/debit/add" element={<DebitForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
