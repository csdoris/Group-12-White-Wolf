import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

import styles from '../Styles/GoogleLoginButton.module.css'

export default function GoogleLoginButton({ handleFailure }) {
    const responseGoogle = (response) => {
        console.log(response);
    }

    const handleLogin = async googleData => {
        console.log("handleLogin called: " + googleData);
        const body = JSON.stringify({ token: googleData.tokenId });
        console.log(body);

        const res = await axios.post("/api/login/google", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()
        // store returned user somehow
        console.log(data);
    }

    return (
         <GoogleLogin
            className={styles.loginButton}
            clientId="641864577175-63nlpegl4tdh39gabri4n3nk0o40sl54.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            buttonText={"Login using Google"}
        />
    );
}