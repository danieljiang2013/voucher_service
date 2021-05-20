import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Grid } from '@material-ui/core'
import Axios from 'axios';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Home/Home';
import CreateAccount from './components/Signup/CreateAccount'
import BillerInfoForm from './components/UpdateInfo/BillerInfoForm';
import PersonalInfoForm from './components/UpdatePersonalInfo/PersonalInfoForm';
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

  useEffect(() => {
    console.log("useffect:");
    //if not logged in
    if (token === '') {
      console.log("not logged in")
      logout();
      setUser({})
    }

    // otherwise retrieve user and set in state
    else {
      Axios.get('api/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const userString = JSON.stringify(res.data);
          console.log("logged in user:", localStorage.getItem('user'))
          if (userString !== JSON.stringify(localStorage.getItem('user'))) {
            localStorage.setItem('user', userString)
            setUser(res.data)
            console.log("set new user:", user);
          }
        })
        .catch(() => {
          logout();
        })
    }

  }, [token]);



  return (

    <Router>

      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LoginForm storeToken={storeToken}></LoginForm>
      </Route>

      <Route path="/signup"><CreateAccount></CreateAccount></Route>

      <Route path="/billerInfo">

        <BillerInfoForm user={user} token={token}></BillerInfoForm>
      </Route>

      <Route path="/personalInfo">

        <PersonalInfoForm user={user} token={token}></PersonalInfoForm>
      </Route>

    </Router>
  )
};

export default App;
