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
    // const [name, setName] = useState("")
    // const [id, setId] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [isRegestered, setRegester] = useState(false)
    const [loading, setLoad] = useState(false)
    const [user, setUser] = useState('');
    const [IsCreated, setCreated] = useState(false)

    var classKey = ""

    const redirect = () => {

        if (IsCreated) {
            return (<Redirect to="/student/" />)


        }

    }

    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }


    useEffect(() => {
        userState();
    }, []);

    const handleSubmit = (event) => {
        setLoad(true)
        setTimeout(() => { setLoad(false) }, 10000);
        event.preventDefault();
        const data = new FormData(event.currentTarget);





        let code_ = data.get('code')
        console.log("code is " + code_)


        fire.database().ref('classroom').once('value').then((snapshot) => {
            console.log('starting to find...')
            const allclass = snapshot.val();
            for (let id in allclass) {
                console.log("finding code...")
                if (allclass[id].code === code_) {
                    classKey = id
                }
            }
        })
            .then(
                () => {
                    if (classKey !== "") {
                        fire.database().ref('student/' + localStorage.getItem('student_id')).once('value').then((data) => {
                            let classes = data.val().classroom

                            if (classes === undefined) {

                                let list = [classKey]
                                console.log("Adding first class ( " + list + " )")
                                fire.database().ref('student/' + localStorage.getItem('student_id')).update({ classroom: list })

                                fire.database().ref('classroom/' + classKey + '/student').once('value').then((data) => {
                                    let students = data.val()
                                    console.log(students)
                                    if (students === null) {
                                        let studentlist = [localStorage.getItem('student_id')]
                                        fire.database().ref('classroom/' + classKey).update({
                                            student: studentlist,

                                        });
                                        setCreated(true)

                                    } else {
                                        
                                        students.push(localStorage.getItem('student_id'))
                                        fire.database().ref('classroom/' + classKey).update({
                                            student: students,

                                        });
                                        setCreated(true)
                                    }

                                })



                            } else {
                                classes.push(classKey)
                                console.log("Adding to classes ( " + classes + " )")
                                fire.database().ref('student/' + localStorage.getItem('student_id')).update({
                                    classroom: classes,

                                })
                                fire.database().ref('classroom/' + classKey + '/student').once('value').then((data) => {
                                    let students = data.val()
                                    if (students === null) {
                                        let list = [localStorage.getItem('student_id')]
                                        fire.database().ref('classroom/' + classKey).update({
                                            student: list,

                                        });
                                        setCreated(true)

                                    } else {
                                        students.push(localStorage.getItem('student_id'))
                                        fire.database().ref('classroom/' + classKey).update({
                                            student: students,

                                        });
                                        setCreated(true)
                                    }

                                })


                            }

                        }
                        )
                    }
                }


            )






    };

    return (
        <>
            {user === null ? <Redirect to="/student/" /> : <>

                {redirect()}
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
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Join classroom
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="code"
                                            required
                                            fullWidth
                                            id="code"
                                            label="Classroom Code"
                                            autoFocus
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
                                    Join
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