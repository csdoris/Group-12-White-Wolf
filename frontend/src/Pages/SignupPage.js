import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

import styles from '../Styles/LoginPage.module.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Weather you are ready
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

export default function SignupPage({ validateEmail }) {
    const history = useHistory();
    const axios = require('axios');

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState({
        username: true,
        password: true,
        email: true
    })
    const [body, setBody] = useState("");
    const [firstMount, setFirstMount] = useState(true); 
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        console.log("handle submit called");

        let newValid = {
            username: true,
            email: true,
            password: true
        };

        let allPass = true;
        if (username === "") {
            allPass = false;
            newValid.username = false;
        }

        if (password === "") {
            allPass = false;
            newValid.password = false;
        }

        const emailValid = validateEmail(email);
        if (!emailValid) {
            allPass = false;
            newValid.email = false;
        }

        if (!allPass) {
            setValid(newValid);
        }
        else {
            setBody({
                username: username,
                email: email,
                password: password
            })
        }
    }

    useEffect(() => {
        const fetchData = async() => {
          // return the whole data to App, app can clean it up and send it to other components 
          try {
            const result = await axios.post("/api/signup", body);
            setError(null);
            console.log(result.data);
            history.push("/");
          } catch (error) {
            setError(error);
          }
        };
    
        if (firstMount) {
          // don't want to fetch when this component is mounted for the first time 
          setFirstMount(false);
        }
        else {
          fetchData();
        }
      }, [body]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            {valid.username ? null : <div className={styles.textDanger}>Please enter your username</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {valid.email ? null : <div className={styles.textDanger}>Please enter valid email address</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {valid.password ? null : <div className={styles.textDanger}>Please enter your password</div>}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}