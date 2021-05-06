import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Grid } from '@material-ui/core'
import Axios from 'axios';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Home/Home'

function App() {

  const [token, setToken] = useState(() => {

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      return storedToken;
    }
    return '';

  })

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {};

  })

  //stores jwt token in localStorage and sets it in the state
  const storeToken = (newtoken) => {
    localStorage.setItem('token', newtoken);
    setToken(newtoken);
  }


  const logout = (() => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    if (token != '') {
      setToken('');
    }
    if (JSON.stringify(user) != JSON.stringify({})) {
      setUser({});
    }

  });


  //called after rendering
  useEffect(() => {

    //if not logged in
    if (token === '') {
      logout();
    }

    //retrieve user and set in state
    else {
      console.log("user is logged in");
      Axios.get('api/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data);

          //store user in state
        })


    }

  });


  return (

    <Router>

      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LoginForm storeToken={storeToken}></LoginForm>
      </Route>

      <Route path="/signup"></Route>

    </Router>


  );

}

export default App;
