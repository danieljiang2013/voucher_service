import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../Home/Navbar'
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





export default function PersonalInfoForm({ token, user, storeToken}) {
    
    const [oldpassword, setoldPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [phone, setphone] = useState('');


    const onoldPasswordChange = (e) => {
        setoldPassword(e.target.value);
    }

    const onnewPasswordChange = (e) => {
        setnewPassword(e.target.value);
    }


    const onfnameChange = (e) => {
        setfname(e.target.value);
    }

    const onlnameChange = (e) => {
        setlname(e.target.value);
    }

    const onphoneChange = (e) => {
        setphone(e.target.value);
    }

  const handleClick= () => {
    axios.post('http://localhost:8000/api/user/edituser',{email:user.email, oldpassword:oldpassword,newpassword:newpassword,firstName:fname,lastName:lname,phoneNumber:phone})
       .then((res) => {
        storeToken.call(this, res.data.token);}
        )
       .catch(function(error){
        console.log(error);
       })
  }

  const classes = useStyles();
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <NavBar />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Personal Information
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                First Name
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={user.firstName}
                autoFocus
                onChange={onfnameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            Last Name
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={user.lastName}
                name="lastName"
                autoComplete="lname"
                onChange={onlnameChange}
              />
            </Grid>
            <Grid item xs={12}>
                Old Password
              <TextField
                variant="outlined"
                required
                fullWidth
                name="oldpassword"
                label=""
                type="password"
                id="oldpassword"
                autoComplete="old-password"
                onChange={onoldPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
                New Password
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label=""
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onnewPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
                Phone Number
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label={user.phoneNumber}
                type="phone"
                id="phone"
                onChange={onphoneChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Change
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}