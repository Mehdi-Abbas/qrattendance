import { useState, useEffect } from 'react'
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
import EditIcon from '@mui/icons-material/Edit';


const theme = createTheme();

const ClassroomForm = () => {
   
    const [loading, setLoad] = useState(false)
    const [user, setUser] = useState('');
    const [IsCreated, setCreated] = useState(false)

    const redirect = () => {

        if (IsCreated) {
            return (<Redirect to="/teacher/" /> )
            
            
        }

    }

    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }

    function makeid(length) {
        var result = '';
        var characters = 'a0b1c2d3erstuv4f5g6h7pqwxi8j9k0lmnoyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    useEffect(() => {
        userState();
    }, []);

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);




        let sec = data.get('section')
        let nm = data.get('name')

        fire.database().ref('classroom').push({
            name: nm,
            section: sec,
            student: [],
            code: makeid(7),
            teacher: localStorage.getItem('teacher_id')

        })
            .then((docRef) => {
                // fire.database().ref('teacher').get().then((res)=>{
                //     console.log(res.data())
                // })  //doc(localStorage.getItem('teacher_id')).get()
                
                console.log(docRef.path.pieces_[1])
                fire.database().ref('teacher').child(localStorage.getItem('teacher_id')).get().then((data) => {
                    let classes = data.val().classroom
                    if (classes === undefined) {
                        let list = [docRef.path.pieces_[1]]
                        fire.database().ref('teacher').child(localStorage.getItem('teacher_id')).update({
                            classroom: list,
                            
                        });
                        setCreated(true)
                    } else {
                        classes.push(docRef.path.pieces_[1])
                        fire.database().ref('teacher').child(localStorage.getItem('teacher_id')).update({
                            classroom: classes,
                            
                        });
                        setCreated(true)
                    }

                })
                // localStorage.setItem('student_id',docRef.path.pieces_[1])
            })



    };

    return (
        <>
            {user === null ? <Redirect to="/teacher/" /> : <>

                {redirect()}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <br />
                        <Link to="/teacher/"><ArrowBackIcon /></Link>
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
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create new classroom
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Classroom Name"
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="section"
                                            label="Section"
                                            name="section"
                                        />
                                    </Grid>


                                </Grid>
                                <LoadingButton
                                    disable={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={loading}

                                >
                                    Create
                                </LoadingButton>

                            </Box>

                        </Box>
                    </Container>
                </ThemeProvider>

            </>}
        </>

    );
}

export default ClassroomForm