import './App.css';
import {  BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Salary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import Summary from './EmployeeDashboard/Summary';
import RequestList from './components/requests/List';
import AddRequest from './components/requests/Add';
import Settings from './EmployeeDashboard/Settings';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          // check if the user is logged in or not
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
            
          }>
            {/* displays admin dashboard */}
            <Route index element={<AdminSummary />}></Route>

            {/* Department */}
            <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
            <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
            <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>
            
            {/* Employee */}
            <Route path='/admin-dashboard/employees' element={<List />}></Route>
            <Route path='/admin-dashboard/add-employee' element={<Add />}></Route>
            <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
            <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>
            <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />}></Route>

            {/* Salary */}
            <Route path='/admin-dashboard/salary/add' element={<Salary />}></Route>

          </Route>
        <Route path='/employee-dashboard' 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<Summary />}></Route>

            {/* Displays employee dashboard */}
            <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>

            {/* Time Off & Requests */}
            <Route path='/employee-dashboard/requests' element={<RequestList />}></Route>
            <Route path='/employee-dashboard/add-request' element={<AddRequest />}></Route>
            <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
            <Route path='/employee-dashboard/settings' element={<Settings />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
