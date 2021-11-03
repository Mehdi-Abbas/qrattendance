import { useState } from 'react'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
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
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

const ForgetPassword = (props) => {
    
    let { path } = useRouteMatch();
    const [email, setEmail] = useState("")
    const [isEmailSent, setEmailSent]=useState(false)
    const [loading, setLoad] = useState(false)


    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        setEmail(data.get('email').toUpperCase())
        
        let em = data.get('email')

        if (em.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        // Create user with email and pass.
        fire.auth().sendPasswordResetEmail(em).then(function() {
            // Password Reset Email Sent!
            
            alert('Password Reset Email Sent!');
            setEmailSent(true)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
              alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
              alert(errorMessage);
            }
            console.log(error);
          });


        console.log({
            email_: em
        });
    };

    return (
        <>
            {isEmailSent ? <Redirect to="/" /> : <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to={`signin`}><ArrowBackIcon /></Link>

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
                                Reset Password
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
                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}
                                    
                                >
                                    Get Email
                                </LoadingButton>


                            </Box>
                           
                        </Box>
                    </Container>
                </ThemeProvider>
            </>}
        </>
    );
}

export default ForgetPassword