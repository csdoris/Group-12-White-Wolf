import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import styles from '../Styles/LoginPage.module.css'
import { useHistory } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Weather you are ready
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${"/signupImage.png"})`,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function LoginPage({ setData }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState({});
  const [isError, setIsError] = useState(false);  // error from login after querying the backend 
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordEntered, setIsPasswordEntered] = useState(true);
  const [firstMount, setFirstMount] = useState(true); 
  const axios = require('axios');

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async() => {
      // return the whole data to App, app can clean it up and send it to other components 
      try {
        const result = await axios.post("/api/login", body);
        setIsError(false);
        setData(result.data);
        history.push("/");
      } catch (error) {
        setIsError(true);
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

  function validateEmail() {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
      return false;
    }
    
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    let passChecking = true;
    const valid = validateEmail();
    if (!valid) {
      passChecking = false;
      setIsEmailValid(false);
    }
    else {
      setIsEmailValid(true);
    }

    if (password === "") {
      passChecking = false;
      setIsPasswordEntered(false);
    }
    else {
      setIsPasswordEntered(true);
    }
    
    if (passChecking) {
      let body = {
        email: email,
        password: password
      }
      setBody(body);
      setIsEmailValid(true);
    }
  }

  return (
    <Grid container component="main" className={classes.root} onSubmit={handleSubmit}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {isEmailValid ? null : <div className={styles.textDanger}>Please enter valid email address</div>}
            <TextField
              variant="outlined"
              margin="normal"
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
            {isPasswordEntered ? null : <div className={styles.textDanger}>Please enter your password</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid item className={styles.grid}>
              <Link href="#" variant="body2" className={styles.signup}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

LoginPage.propTypes = {
  setData: PropTypes.func.isRequired
}