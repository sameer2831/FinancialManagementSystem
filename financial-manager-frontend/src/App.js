import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserDashboard from './pages/UserDashboard';
import Transactions from './pages/Transactions';
import UserIncome from './pages/UserIncome';
import UserExpense from './pages/UserExpense';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-income" element={<UserIncome/>}/>
        <Route path="/user-expense" element={<UserExpense/>}/>
        <Route path="/user-transactions" element={<Transactions />}/>
      </Routes>
    </Router>
  );
}

export default App;
