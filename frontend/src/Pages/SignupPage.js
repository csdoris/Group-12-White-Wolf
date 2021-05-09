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
import Copyright from '../Components/Copyright';
import axios from 'axios';
import validateEmail from '../helpers/validateEmail';

import styles from '../Styles/LoginPage.module.css'

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

export default function SignupPage() {
    const history = useHistory();

    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [valid, setValid] = useState({
        name: true,
        password: true,
        email: true,
        passwordConfirm: true
    })
    const [body, setBody] = useState("");
    const [firstMount, setFirstMount] = useState(true); 
    const [error, setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        let newValid = {
            name: true,
            email: true,
            password: true,
            passwordConfirm: true
        };

        let allPass = true;
        if (name === "") {
            allPass = false;
            newValid.name = false;
        }

        if (password === "") {
            allPass = false;
            newValid.password = false;
        }

        if (password !== passwordConfirm) {
            allPass = false;
            newValid.passwordConfirm = false;
        }

        const emailValid = validateEmail(email);
        if (!emailValid) {
            allPass = false;
            newValid.email = false;
        }

        setValid(newValid);

        if (allPass) {
           setBody({
                name: name,
                email: email,
                password: password
            }) 
        }
    }

    useEffect(() => {
        const fetchData = async() => {
          // return the whole data to App, app can clean it up and send it to other components 
          console.log("try to fetch the data"); 
          try {
            const result = await axios.post("/api/signup", body);
            console.log(result.data);
            setError(false);
            history.push("/");
            history.push("/login");
          } catch (error) {
            setError(true);
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
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                inputProps={{ "data-testid": "name-input" }}  
                            />
                            {valid.name ? null : <div className={styles.textDanger}>Please enter your name</div>}
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
                                inputProps={{ "data-testid": "email-input" }}  
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
                                inputProps={{ "data-testid": "password-input" }}  
                            />
                            {valid.password ? null : <div className={styles.textDanger}>Please enter your password</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                name="password-confirm"
                                label="Confirm Password"
                                type="password"
                                id="password-confirm"
                                autoComplete="password-confirm"
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                                inputProps={{ "data-testid": "confirm-password-input" }}  
                            />
                            {valid.passwordConfirm ? null : <div className={styles.textDanger}>Password doesn't match</div>}
                        </Grid>
                    </Grid>
                    {error ? <div className={styles.textDanger}>Email already exists</div> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        data-testid="submit"
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