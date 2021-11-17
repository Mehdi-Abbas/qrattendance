import React, { useState, useEffect } from "react";
import StudentLogin from './StudentLogin';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import QrReader from 'react-qr-reader';
import UseWindowDimensions from '../components/Screensize';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import fire from '../helpers/db';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tabs from '../components/StudentTab'

const Home = () => {
    const [user, setUser] = useState('');
    const [isScanning, setScanning] = useState(false)
    const [isMarked, setMarked] = useState(false)
    const [isPresent, setPresent] = useState(false)

  
    const { height, width } = UseWindowDimensions();
    const userState = () => {
        const userdata = localStorage.getItem('user');
        //  const userdata=dataValue
        //  console.log(userdata)
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }
    const getcamsize = () => {
        let camWidth = width - 100
        if (width <= 300) {
            // console.log(camWidth +' px')
            return camWidth + 'px'
        }
        else {
            // console.log(camWidth +' px')
            return 300 + 'px'
        }


    }
    let camSize = getcamsize()
    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if (result) {
            fire.database().ref('attendance/' + result).once('value').then((data) => {
                let students = data.val().student
                let active = data.val().active
                console.log(active)
                if (active) {

                    for(let index in students){
                        if(students[index].key===localStorage.getItem("student_id")){
                            fire.database().ref('attendance/' + result+'/student/'+index).update({
                                status:'present',
                                timeStamp: new Date().toDateString() +", "+ new Date().toLocaleTimeString(),
                            })
                        }
                    }
                    // students.push(localStorage.getItem("student_id"))
                    // fire.database().ref('attendance/' + result).update({
                    //     student: students,

                    // });
                    setPresent(true)
                    fire.database().ref('student/' + localStorage.getItem('student_id')).once('value').then(() => {
                        let attendance = data.val().attendance
                        if (attendance === undefined) {
                            let attendancelist = [result]
                            fire.database().ref('student/' + localStorage.getItem('student_id')).update({
                                attendance: attendancelist,

                            });

                        } else {
                            attendance.push(result)
                            fire.database().ref('student/' + localStorage.getItem('student_id')).update({
                                attendance: attendance,

                            })

                        }
                    })

                }

            })
            // fire.database().ref('student/' + localStorage.getItem("student_id")).once('value').then((data) => {
            //     let attend = data.val().attendance
            //     if (attend === null) {
            //         let attlist = [result]
            //         fire.database().ref('student/' + localStorage.getItem("student_id")).update({
            //             attendance: attlist,
            //         })
            //     } else {
            //         attend.push(result)
            //         fire.database().ref('student/' + localStorage.getItem("student_id")).update({
            //             attendance: attend,
            //         })
            //     }
            // })

            // setScanResultWebCam(result);
            setMarked(true)
            setScanning(false)
        }
    }
   
    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {user !== null && localStorage.getItem("role") === "student" ? (
                <>
                    <AppBar position="static">
                        <Toolbar style={{ display: 'flex', paddingLeft: '10px' }}>
                            <Link to="/student/"><ArrowBackIcon style={{ color: '#FFF' }} /></Link>
                            <Typography variant="h7" style={{ flex: 1, overflow: 'hidden', textAlign: 'center' }}>{user}</Typography>
                            {/* <Button color="inherit" onClick={() => signOut()} style={{ marginRight: '-10px' }}>Logout</Button> */}
                        </Toolbar>
                    </AppBar>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: height }}>
                        {!isMarked ? <>
                            {!isScanning ? <>
                                <Button
                                    color='success'
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => {
                                        setScanning(true)
                                    }}
                                >Scan Code</Button>
                            </> : <>
                                <QrReader
                                    facingMode='environment'
                                    delay={300}
                                    style={{ width: camSize }}
                                    onError={handleErrorWebCam}
                                    onScan={handleScanWebCam}

                                />
                            </>}
                        </> : <>
                            <Avatar sx={isPresent ? { m: 1, bgcolor: 'success.main', height: '200px', width: '200px' } : { m: 1, bgcolor: 'error.main', height: '200px', width: '200px' }}>
                                {isPresent ? <CheckCircleOutlineIcon
                                    style={{ fontSize: 200 }}
                                /> :
                                    <ErrorOutlineIcon
                                        style={{ fontSize: 200 }}
                                    />
                                }

                            </Avatar>
                            <br />
                            <Typography component="h1" variant="h5" style={isPresent ? { color: '#427d33' } : { color: '#d44033' }}>
                                {isPresent ? 'Attendance marked' : 'Attendance not marked'}
                            </Typography>
                            <Button
                                color='primary'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    setMarked(false)
                                    setPresent(false)
                                }}
                            >OK</Button>
                        </>}
                        {/* {!isScanning ? <>
                            <Button
                                color='success'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    setScanning(true)
                                }}
                            >Scan Code</Button>
                        </> : <>
                            <QrReader
                                facingMode='user'
                                delay={300}
                                style={{ width: camSize }}
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}

                            />
                        </>} */}


                    </div>
                    <Tabs cat='tab1' />
                </>
            ) : (
                <StudentLogin signin={(user) => setUser(user)} />
            )}
        </>
    )
}


export default Home