import React, { useState, useEffect, useRef } from "react";
import StudentLogin from './StudentLogin';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { OnDelete } from '../Redux/Action/Action';
import { Container, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import { makeStyles } from '@mui/styles'
import UseWindowDimensions from '../components/Screensize';
import { height } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Home = () => {
    const dataValue = useSelector(state => state.functions.data);
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const [isScanning, setScanning] = useState(false)
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const [isMarked, setMarked] = useState(false)
    const classes = useStyles();
    const qrRef = useRef(null);
    const dispatch = useDispatch();
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
            setScanResultWebCam(result);
            setMarked(true)
            setScanning(false)
        }
    }
    const OnDelete_ = () => {
        dispatch(OnDelete())
    }
    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    useEffect(() => {
        userState();
    }, []);
    return (
        <>
            {user !== null ? (
                <>
                    <AppBar position="static">
                        <Toolbar style={{ display: 'flex', paddingLeft: '10px' }}>
                            <Typography variant="h7" style={{ flex: 1, overflow: 'hidden' }}>{user}</Typography>
                            <Button color="inherit" onClick={() => signOut()} style={{ marginRight: '-10px' }}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: height }}>
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
                                    facingMode='user'
                                    delay={300}
                                    style={{ width: camSize }}
                                    onError={handleErrorWebCam}
                                    onScan={handleScanWebCam}

                                />
                            </>}
                        </> : <>
                            <Avatar sx={{ m: 1, bgcolor: 'success.main', height:'200px', width:'200px' }}>
                                <CheckCircleOutlineIcon  
                                    style={{ fontSize: 200 }}
                                />
                            </Avatar>
                            <br/>
                            <Typography component="h1" variant="h5" style={{color:'#427d33'}}>
                                Attendance marked
                            </Typography>
                            <Button
                                color='primary'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    setMarked(false)
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
                </>
            ) : (
                <StudentLogin signin={(user) => setUser(user)} />
            )}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: height
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3f51b5',
        color: '#fff',
        padding: 20
    },
    btn: {
        marginTop: 10,
        marginBottom: 20
    }
}));
export default Home