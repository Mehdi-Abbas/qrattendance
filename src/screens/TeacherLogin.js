import { useState } from 'react'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

const TeacherLogin = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedin, setLoggedin] = useState(false)
    const [loading, setLoad] = useState(false)
    // const [finished, setFinish] = useState(false)
    // const setLoading = !finished && loading;
    let { path } = useRouteMatch();

    const handleSubmit = (event) => {
        // setLoading(true)
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        setEmail(data.get('email').toUpperCase())
        setPassword(data.get('password'))

        let em = data.get('email')
        let pass = data.get('password')

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
            email: data.get('email'),
            password: data.get('password'),
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
                                Sign in as teacher
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
                                {/* <Button
                                    type="submit"
                                    disabled={loading}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    // onClick={()=>{setLoad(true)}}
                                >
                                    {loading?'Please wait...':'SIGN IN'}
                                </Button> */}
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
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="teacher/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                            </Box>
                            <br />
                            <Link to={`/teacher/signup`}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            <br />
                            <Link to={`/teacher/forgetpassword`}>
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

export default TeacherLogin