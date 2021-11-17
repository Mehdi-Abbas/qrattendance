import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fire from '../helpers/db';
import Tabs from '../components/StudentTab'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const theme = createTheme();

const Attendance = () => {

    const [user, setUser] = useState('');

    const [studentData, setStudent] = useState([])
    // const [absentStudents, setAbsentStudents] = useState(0)
    // const [presentStudents, setPresentStudents] = useState(0)

    var absentStudents = 0
    var presentStudents = 0

    const [timeout, setTime] = useState(false)

    let tempData = []

    function runTimeout() {
        setTimeout(() => {
            setTime(true)

            console.log('timeout!')
            console.log(absentStudents)
            console.log(presentStudents)

        },1000)

    }

    const makeData = (att) => {
        console.log("making...")

        let n = 1
        // let tempPresnt = 0
        // let tempAbsent = 0
        for (let i in att) {
            console.log('new attendance')
            fire.database().ref('attendance/' + att[i]).once('value').then((data) => {
                let student = data.val().student
                let attendanceClosingTime = data.val().timeStampClose
                console.log(student)
                // let flag=true
                for (let j in student) {
                    if (student[j].key === localStorage.getItem('student_id')) {
                        console.log('found student')
                        let temp = {}
                        temp['serial'] = n
                        temp['attCloseTime'] = attendanceClosingTime
                        temp['timeStamp'] = student[j].timeStamp
                        temp['status'] = student[j].status
                        console.log(temp)
                        n++


                        if (student[j].status === 'present') {
                            presentStudents++
                            temp['presentStudents'] = presentStudents
                            temp['absentStudents'] = absentStudents
                        } else {
                            absentStudents++
                            temp['presentStudents'] = presentStudents
                            temp['absentStudents'] = absentStudents
                        }
                        tempData.push(temp)

                    }
                }

            }).then(
                setStudent(tempData)
            )


        }

        


    }

    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }


    useEffect(() => {
        setTime(false)
        userState();

        fire.database().ref('classroom/' + localStorage.getItem('classroom_id')).once('value').then((data) => {

            let attendances = data.val().attendance
            // attendanceData = attendances
            console.log(attendances)
            // setAttendanceData(attendances)

            // setTimeout(3000)
            makeData(attendances)
            runTimeout()
        })



    }, []);



    return (
        <>
            {user === null ? <Redirect to="/student/" /> :

                <>
                    <AppBar position="static">
                        <Toolbar style={{ display: 'flex', paddingLeft: '10px' }}>
                            <Link to="/student/"><ArrowBackIcon style={{ color: '#FFF' }} /></Link>
                            <Typography variant="h7" style={{ flex: 1, overflow: 'hidden', textAlign: 'center' }}>{user}</Typography>
                            {/* <Button color="inherit" onClick={() => signOut()} style={{ marginRight: '-10px' }}>Logout</Button> */}
                        </Toolbar>
                    </AppBar>
                    {timeout && studentData !== undefined ?

                        <ThemeProvider theme={theme}>

                            <Container component="main">

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #000', margin: '20px auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', padding: '10px' }}>
                                        <h3>Total: {studentData.length}</h3>
                                        <h3>Present: {studentData[studentData.length-1].presentStudents}</h3>
                                        <h3>Absent: {studentData[studentData.length-1].absentStudents}</h3>
                                    </div>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Closed On</TableCell>
                                                <TableCell >Marked On</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>Status</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {timeout && studentData.length > 0 ? studentData.map((row) => (

                                                <TableRow
                                                    key={row.serial}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.serial}
                                                    </TableCell>
                                                    <TableCell>{row.attCloseTime ? row.attCloseTime : "Not closed"}</TableCell>
                                                    <TableCell>{row.timeStamp ? row.timeStamp : "Not marked"}</TableCell>
                                                    <TableCell style={{ textAlign: 'center' }}>{row.status === 'present' ? <span style={{ borderRadius: '100%', background: '#427d33', color: '#FFF', padding: '5px 8px', fontWeight: 'bold' }}>P</span> : <span style={{ borderRadius: '100%', background: '#d44033', color: '#FFF', padding: '5px 8px', fontWeight: 'bold' }}>A</span>}</TableCell>

                                                </TableRow>
                                            )) : "loading..."}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </Container>

                        </ThemeProvider>
                        : "No attendance found/fetching..."
                    }
                    <Tabs cat='tab2' />
                </>



            }
        </>

    );
}

export default Attendance