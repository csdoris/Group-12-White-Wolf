import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import styles from '../Styles/GoogleLoginButton.module.css'

export default function GoogleLoginButton({ setGoogleToken }) {
    const responseGoogle = (response) => {
        console.log(response);
    }

    const handleSuccess = async googleData => {
        setGoogleToken(googleData.tokenId);
    }

    return (
         <GoogleLogin
            className={styles.loginButton}
            clientId="641864577175-63nlpegl4tdh39gabri4n3nk0o40sl54.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleSuccess}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            buttonText={"Login using Google"}
        />
    );
}