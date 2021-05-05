import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import styles from '../Styles/GoogleLoginButton.module.css'

export default function GoogleLoginButton({ setGoogleToken }) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [enable, setEnable] = useState(true);

    const responseGoogle = (response) => {
        if (response.error === "idpiframe_initialization_failed") {
            setEnable(false);
            setErrorMsg("Enable cookie to login using Google");
        }
        else {
            setEnable(true);
        }
    }

    const handleSuccess = async googleData => {
        setGoogleToken(googleData.tokenId);
    }

    return (
        <>
            <GoogleLogin
                className={styles.loginButton}
                clientId="641864577175-63nlpegl4tdh39gabri4n3nk0o40sl54.apps.googleusercontent.com"
                onSuccess={handleSuccess}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                buttonText={enable ? "Login using Google" : errorMsg}
                disabled={!enable}
            />
        </>
    );
}