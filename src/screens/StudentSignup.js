import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fire from '../helpers/db';
import { LoadingButton } from '@mui/lab';


const theme = createTheme();

const StudentSignup = () => {
  
   
    
    const [isRegestered, setRegester] = useState(false)
    const [loading, setLoad] = useState(false)
    

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
       
       
        
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
       
        fire.auth().createUserWithEmailAndPassword(em, pass)
            .then(
                (res) => {
                    // console.log(res)
                    fire.database().ref('student').push({
                        email: em,
                        student_id: id__,
                        name: nm,
                        auth_id:res.user.uid
                    })
                    .then((docRef) => {
                        localStorage.setItem('student_id',docRef.path.pieces_[1])
                    })
                    setRegester(true)
                }

            )
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
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
            {isRegestered ? <Redirect to="/student/" /> : <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to="/student/"><ArrowBackIcon /></Link>
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
                                {/* <LockOutlinedIcon /> */}
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