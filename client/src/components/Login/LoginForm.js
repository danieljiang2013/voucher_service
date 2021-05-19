import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Axios from 'axios';
import PropTypes from 'prop-types'

import {
    Card,
    CardContent,
    Button,
    Typography,
    Divider,
    TextField,
} from '@material-ui/core'


function LoginForm({ storeToken }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = () => {
        const payload = { email, password };

        Axios.post('api/user/login', payload)
            .then((res) => {
                storeToken.call(this, res.data.token);

            })
            .catch((err) => {
                console.error(err);
            })

    }


    return (

        <Card>
            <CardContent>
                <Typography variant="h6">
                    Login
                </Typography>
                <form>

                    <TextField
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={onEmailChange}
                    >
                    </TextField>

                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={onPasswordChange}
                    >

                    </TextField>

                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onLogin}>
                    Login
                </Button>

            </CardContent>

        </Card>





    )
}

LoginForm.propTypes = {
    storeToken: PropTypes.func.isRequired,
}



export default withRouter(LoginForm);