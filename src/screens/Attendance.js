import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import fire from '../helpers/db';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CachedIcon from '@mui/icons-material/Cached';


const theme = createTheme();

const Attendance = () => {

    const [user, setUser] = useState('');

    const [studentData, setStudent] = useState()
    const [attendanceData, setAttendanceData] = useState()
    const [absentStudents, setAbsentStudents] = useState()
    const [presentStudents, setPresentStudents] = useState()



    const toggleStatus = (key) => {
        fire.database().ref('attendance/' + localStorage.getItem('attendance_id') + '/student').once('value').then((data) => {
            let student = data.val()
            console.log()
            for (let i in student) {
                if (student[i].key === key) {
                    let newStatus = 'new Status';
                    let newTime = 'new Time'
                    fire.database().ref('attendance/' + localStorage.getItem('attendance_id') + '/student/' + i).once('value').then((data) => {
                        if (data.val().status === 'absent') {
                            newStatus = 'present'
                            newTime = new Date().toDateString() + ", " + new Date().toLocaleTimeString()
                        }
                        else {
                            newStatus = 'absent'
                            newTime = 'Not marked'
                        }
                        fire.database().ref('attendance/' + localStorage.getItem('attendance_id') + '/student/' + i).update({
                            status: newStatus,
                            timeStamp: newTime,
                        })
                        window.location.reload()
                    })

                }
            }
        })
        // window.location.reload()
    }

    const closeCode = () => {
        console.log("closing...")
        fire.database().ref('attendance/' + localStorage.getItem('attendance_id')).update({
            active: false,
            timeStampClose: new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
        });
        window.location.reload()

    }

    const Stillopen = () => {
        return (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', border:'2px solid #F00', borderRadius:'10px', background:'#FF000022', padding:'5px 100px'}}>
                <h2 style={{color:'#F00'}}>Attendance is still open!</h2>
                <Button
                    color='error'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => closeCode()}
                >Close Attendance</Button>
            </div>
        )
    }

    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }


    useEffect(() => {
        userState();

        fire.database().ref('attendance/' + localStorage.getItem('attendance_id')).once('value').then((data) => {
            // console.log(studentKey)
            // console.log(data.val().name)
            // let student=data.val().student

            setStudent(data.val().student)
            setAttendanceData(data.val())
            let tempPresnt = 0
            let tempAbsent = 0
            for (let i in data.val().student) {

                data.val().student[i].status === 'present' ?
                    tempPresnt++
                    : tempAbsent++
            }
            setAbsentStudents(tempAbsent)
            setPresentStudents(tempPresnt)


        }).catch((error) => {
            console.error(error);
        })

    }, []);



    return (
        <>
            {user === null ? <Redirect to="/teacher/" /> :

                <>
                    {studentData !== undefined ?
                        <ThemeProvider theme={theme}>
                            <Container component="main">
                                <br />
                                <Link to="/teacher/classwork/"><ArrowBackIcon style={{ color: '#000' }} /></Link>
                                <CssBaseline />
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                    <div>{attendanceData ? attendanceData.active ? <Stillopen /> : null : null}</div>
                                    {/* <div style={attendanceData ? attendanceData.active ? { color: '#427d33', border: '4px solid #427d33', padding: '10px', borderRadius: '10px', fontSize: '1.5rem', fontWeight: 'bold' } : { color: '#d44033', border: '4px solid #d44033', padding: '10px', borderRadius: '10px', fontSize: '1.5rem', fontWeight: 'bold' } : null}>Attendance {attendanceData ? attendanceData.active ? 'open' : 'closed' : null}</div> */}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #000', margin: '20px auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', padding: '10px' }}>
                                        <h3>Total: {studentData.length}</h3>
                                        <h3>Present: {presentStudents}</h3>
                                        <h3>Absent: {absentStudents}</h3>
                                    </div>
                                    <hr />
                                    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #000', width: '100%', padding: '10px', alignItems: 'center' }}>
                                        <h3>Attendance opened on: {attendanceData ? attendanceData.timeStampOpen : null}</h3>
                                        <h3>Attendance closed on: {attendanceData ? attendanceData.timeStampClose ? attendanceData.timeStampClose : 'Not closed' : null}</h3>
                                    </div>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell >ID</TableCell>
                                                <TableCell >Name</TableCell>
                                                <TableCell >Time</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>Toggle Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {studentData.length > 0 ? studentData.map((row) => (

                                                <TableRow
                                                    key={row.serial}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.serial}
                                                    </TableCell>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.timeStamp ? row.timeStamp : "Not marked"}</TableCell>
                                                    <TableCell style={{ textAlign: 'center' }}>{row.status === 'present' ? <span style={{ borderRadius: '100%', background: '#427d33', color: '#FFF', padding: '5px 8px', fontWeight: 'bold' }}>P</span> : <span style={{ borderRadius: '100%', background: '#d44033', color: '#FFF', padding: '5px 8px', fontWeight: 'bold' }}>A</span>}</TableCell>
                                                    <TableCell style={{ textAlign: 'center' }}><div className="toggle" onClick={() => { toggleStatus(row.key) }}><CachedIcon /></div></TableCell>
                                                </TableRow>
                                            )) : "No student"}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </Container>
                        </ThemeProvider>
                        : null
                    }
                </>



            }
        </>

    );
}

export default Attendance