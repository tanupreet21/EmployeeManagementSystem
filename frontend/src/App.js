import './App.css';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from "./components/Login";
import SignUp from './components/SignUp';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeDetails from './components/EmployeeDetails';

function Layout({children}){
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
    {!hideNavbar && <Navbar />}
    {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/employees" element={<EmployeeList/>}/>
          <Route path="/employee/add" element={<AddEmployee/>}/>
          <Route path="/employee/update/:id" element={<UpdateEmployee/>}/>
          <Route path="employees/details/:id" element={<EmployeeDetails/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
