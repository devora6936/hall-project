import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './flags.css';
import store from './store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


 //import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
//import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
// import 'primereact/resources/themes/md-light-indigo/theme.css'
// import 'primereact/resources/themes/md-dark-indigo/theme.css'
// import 'primereact/resources/themes/mdc-light-indigo/theme.css'
// import 'primereact/resources/themes/mdc-dark-indigo/theme.css'
// import 'primereact/resources/themes/mdc-dark-deeppurple/theme.css'
// import 'primereact/resources/themes/tailwind-light/theme.css'
// import 'primereact/resources/themes/fluent-light/theme.css'
//  import 'primereact/resources/themes/lara-light-blue/theme.css'
//* import 'primereact/resources/themes/lara-light-indigo/theme.css'
// import 'primereact/resources/themes/lara-light-purple/theme.css'
// import 'primereact/resources/themes/lara-light-teal/theme.css'
// import 'primereact/resources/themes/lara-dark-blue/theme.css'
// import 'primereact/resources/themes/lara-dark-indigo/theme.css'
// import 'primereact/resources/themes/lara-dark-purple/theme.css'
// import 'primereact/resources/themes/lara-dark-teal/theme.css'
// import 'primereact/resources/themes/soho-light/theme.css'
// import 'primereact/resources/themes/soho-dark/theme.css'
// import 'primereact/resources/themes/viva-light/theme.css'
// import 'primereact/resources/themes/viva-dark/theme.css'
// import 'primereact/resources/themes/mira/theme.css'
// import 'primereact/resources/themes/nano/theme.css'
// import 'primereact/resources/themes/saga-blue/theme.css'
// import 'primereact/resources/themes/saga-green/theme.css'
// import 'primereact/resources/themes/saga-orange/theme.css'
// import 'primereact/resources/themes/saga-purple/theme.css'
// import 'primereact/resources/themes/vela-blue/theme.css'
// import 'primereact/resources/themes/vela-green/theme.css'
// import 'primereact/resources/themes/vela-orange/theme.css'
// import 'primereact/resources/themes/vela-purple/theme.css'
// import 'primereact/resources/themes/arya-blue/theme.css'
// import 'primereact/resources/themes/arya-green/theme.css'
// import 'primereact/resources/themes/arya-orange/theme.css'
// import 'primereact/resources/themes/arya-purple/theme.css'
        

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
