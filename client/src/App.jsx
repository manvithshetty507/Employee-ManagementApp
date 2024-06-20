import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/DashBoard';
import EmployeePage from './pages/EmployeePage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import Header from './components/header';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState({"username":'',"password":''});

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<LoginPage user={user} setUser={setUser} />} />
        <Route path='/dashboard' element={<DashBoard user={user}/>} />
        <Route path='/employees' element={<EmployeePage />} />
        <Route path='/employees/create' element={<CreateEmployeePage />} />
        <Route path='/employees/edit/:id' element={<EditEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

