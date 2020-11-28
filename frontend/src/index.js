import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserProvider } from './UserContext';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { es } from 'date-fns/locale';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LocalizationProvider dateAdapter={DateFnsAdapter} locale={es}>
        <App />
      </LocalizationProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
