import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Axios from 'axios';
import PropTypes from 'prop-types'
import NavBar from '../Home/Navbar'


import {
    Card,
    CardContent,
    Button,
    Typography,
    Divider,
    TextField,
} from '@material-ui/core'

function BillerInfoForm({ token, user }) {

    const [billerFirstName, setBillerFirstName] = useState('');
    const [billerLastName, setBillerLastName] = useState('');
    const [billerEmail, setBillerEmail] = useState('');

    const onfirstNameChange = (e) => {
        setBillerFirstName(e.target.value);
    }
    const onLastNameChange = (e) => {
        setBillerLastName(e.target.value);
    }

    const onEmailChange = (e) => {
        setBillerEmail(e.target.value);
    }

    const onSubmit = () => {
        const id = user._id;
        const payload = { id, billerFirstName, billerLastName, billerEmail };
        console.log("payload:", payload);
        Axios.post('api/user/updateBillerInfo', payload)
            .catch((err) => {
                console.error(err);
            })

    }

    return (
        <div>
            <NavBar />
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Update Biller Information
                    </Typography>

                    <form>
                        <TextField
                            id="firstName"
                            type="firstName"
                            label="FirstName"
                            value={billerFirstName}
                            onChange={onfirstNameChange}
                        >
                        </TextField>
                        <TextField
                            id="lastName"
                            type="lastName"
                            label="LasttName"
                            value={billerLastName}
                            onChange={onLastNameChange}
                        >
                        </TextField>
                        <TextField
                            id="email"
                            type="email"
                            label="Email"
                            value={billerEmail}
                            onChange={onEmailChange}

                        >
                        </TextField>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSubmit}>
                        Update
                        </Button>




                </CardContent>

            </Card>
        </div>
    )





}

export default withRouter(BillerInfoForm);
