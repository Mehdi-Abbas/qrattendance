import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from 'firebase';
import fire from '../helpers/db';
import { LoadingButton } from '@mui/lab';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const theme = createTheme();

const StudentSignup = () => {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegestered, setRegester] = useState(false)
    const [loading, setLoad] = useState(false)

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setName(data.get('name').toUpperCase())

        setEmail(data.get('email').toUpperCase())
        setId(email.substring(0, 4) + '-' + email.substring(4, 8) + '-' + email.substring(8, 12))
        setPassword(data.get('password'))
        // console.log(email)
        let em = data.get('email').toUpperCase()
        let pass = data.get('password')
        let id__ = em.substring(0, 4) + '-' + em.substring(4, 8) + '-' + em.substring(8, 12)
        let nm = data.get('name').toUpperCase()
        if (em.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (pass.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Create user with email and pass.
        fire.auth().createUserWithEmailAndPassword(em, pass)
            .then(
                () => {
                    fire.database().ref('student').push({
                        email: em,
                        student_id: id__,
                        name: nm
                    });
                    setRegester(true)
                }

            )
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });


        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            {isRegestered ? <Redirect to="/student/signin" /> : <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to="/student/signin"><ArrowBackIcon /></Link>
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
                                Sign up as student
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="id"
                                    label="ID"
                                    name="id"
                                    autoComplete="given-id"
                                />
                            </Grid> */}
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                                </Grid>
                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}
                                    
                                >
                                    Sign Up
                                </LoadingButton>
                                {/* <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        
                                    </Grid>
                                </Grid> */}
                            </Box>
                            <br />
                            <Link to="/student/signin">
                                Already have an account? Sign in
                            </Link>
                        </Box>
                        {/* <Copyright sx={{ mt: 5 }} /> */}
                    </Container>
                </ThemeProvider>

            </>}
        </>

    );
}

export default StudentSignup