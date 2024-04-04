import logo from './logo.svg';
import './App.css';
import "react-jewish-datepicker/dist/index.css";
import HomePage from './components/pages/HomePage';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/pages/login';
import AdminPage from './components/pages/adminPage';
import Events from './components/pages/events';
import WeekEvents from './components/pages/weekEvents';
import Register from './components/pages/register';
import Customers2 from './components/pages/customers2';

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/adminPage' element={<AdminPage/>}/>
      <Route path='/customers2' element={<Customers2/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/weekEvents' element={<WeekEvents/>}/>
      <Route path='/register' element={<Register/>}/>

   </Routes>
    

   
     
    </>
  );
}



export default App;
