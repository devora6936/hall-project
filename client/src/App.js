// import logo from './logo.svg';
// import './App.css';
// import "react-jewish-datepicker/dist/index.css";
// import HomePage from './components/pages/HomePage';
// import { Link, Route, Router, Routes } from 'react-router-dom';
// import Login from './components/pages/login';
// import AdminPage from './components/pages/adminPage';
// import Events from './components/pages/events';
// import WeekEvents from './components/pages/weekEvents';
// import Register from './components/pages/register';
// import Customers2 from './components/pages/customers2';
// import NoAppBarLayout from './components/pages/noAppBar';
// import AppLayout from './components/pages/withAppBar';
// import EentsByRange from './components/pages/rangeEvents';

// function App() {

//   return (
//     <div className='App'>
//     <Routes>
//           <Route path="/" element={<NoAppBarLayout><HomePage /></NoAppBarLayout>} />
//           <Route path="/login" element={<NoAppBarLayout><Login /></NoAppBarLayout>} />
//           <Route element={<AppLayout />}>
//             <Route path='/adminPage' element={<AdminPage />} />
//             <Route path='/customers2' element={<Customers2 />} />
//             <Route path='/events' element={<Events />} />
//             <Route path='/weekEvents' element={<WeekEvents />} />
//             <Route path='/register' element={<Register />} />
//             <Route path='/byRange' element={<EentsByRange />} />
//           </Route>
//         </Routes>

//         </div> 
//   );
// }



// export default App;
import logo from './logo.svg';
import './App.css';
import "react-jewish-datepicker/dist/index.css";
import HomePage from './components/pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login';
import AdminPage from './components/pages/adminPage';
import Events from './components/pages/events';
import WeekEvents from './components/pages/weekEvents';
import Register from './components/pages/register';
import Customers2 from './components/pages/customers2';
import NoAppBarLayout from './components/pages/noAppBar';
import AppLayout from './components/pages/withAppBar';
import EentsByRange from './components/pages/rangeEvents';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<NoAppBarLayout><HomePage /></NoAppBarLayout>} />
        <Route path="/login" element={<NoAppBarLayout><Login /></NoAppBarLayout>} />
        <Route element={<AppLayout />}>
          <Route path='/adminPage' element={<AdminPage />} />
          <Route path='/customers2' element={<Customers2 />} />
          <Route path='/events' element={<Events />} />
          <Route path='/weekEvents' element={<WeekEvents />} />
          <Route path='/register' element={<Register />} />
          <Route path='/byRange' element={<EentsByRange />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
