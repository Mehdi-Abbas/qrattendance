import { useState } from 'react'
import { Link, Redirect, useRouteMatch} from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fire from '../helpers/db';
import { useDispatch, useSelector } from 'react-redux';
import {OnSubmit} from '../Redux/Action/Action';
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

const StudentLogin = (props) => {
    const dataValue = useSelector(state => state.functions.data);
    let { path } = useRouteMatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedin, setLoggedin] = useState(false)
    const [loading, setLoad] = useState(false)

    const dispatch = useDispatch();

    const OnSubmit_ = (text) => {
        dispatch(OnSubmit(text))
        // setText('') 
    }

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        setEmail(data.get('email').toUpperCase())
        setPassword(data.get('password'))

        

        let em = data.get('email')
        let pass = data.get('password')

        OnSubmit_(em)
        console.log(dataValue)
        if (em.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (pass.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Create user with email and pass.
        fire.auth().signInWithEmailAndPassword(em, pass)
            .then((result) => {
                console.dir(result)
                // const token = result.credential.accessToken;
                const user = result.user;
                const data = user.email

                localStorage.setItem('user', data);
                props.signin(data);
                console.log("logged in")
                setLoggedin(true)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                //   document.getElementById('quickstart-sign-in').disabled = false;
            });


        console.log({
            email_: em,
            password_: pass,
        });
    };

    return (
        <>
            {isLoggedin ? <Redirect to={`${path}/home`} /> : <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to="/"><ArrowBackIcon /></Link>

                        <CssBaseline />

                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in as student
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}
                                    
                                >
                                    Sign In
                                </LoadingButton>


                                {/* <Grid container>
                                    <Grid item xs>
                                        
                                    </Grid>
                                    <Grid item>
                                        
                                    </Grid>
                                </Grid> */}
                            </Box>
                            <br/>
                            <Link to={`/student/signup`}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            <br />
                            <Link to={`/student/forgetpassword`}>
                                Forgot password?
                            </Link>
                        </Box>
                        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                    </Container>
                </ThemeProvider>
            </>}
        </>
    );
}

export default StudentLogin