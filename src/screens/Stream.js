import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
// import Button from '@mui/material/Button';
import QrReader from 'react-qr-reader';
import Tabs from '../components/Tabs'
import QRCode from "react-qr-code";
import UseWindowDimensions from '../components/Screensize';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Stream = () => {
    const [text, setText] = useState('');
    const [isDisplay, setDisplay]=useState(false)
    const [key, setKey] = useState('mehdi abbas is good boy')
    const [previousKey, setPreviousKey]=useState('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    const classes = useStyles();
    const qrRef = useRef(null);

    const { height, width } = UseWindowDimensions();


    const getqrcodesize = () => {
        let qrocdeWidth = width - 100
        if (width <= 600) {
            return qrocdeWidth
        }
        else {
            return 600
        }
        console.log(qrocdeWidth)
    }

    // const generateQrCode = async () => {
    //     try {
    //         const response = await QRCode.toDataURL(text);
    //         setImageUrl(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const handleErrorFile = (error) => {
    //     console.log(error);
    // }
    // const handleScanFile = (result) => {
    //     if (result) {
    //         setScanResultFile(result);
    //     }
    // }
    // const onScanFile = () => {
    //     qrRef.current.openImageDialog();
    // }
    // const handleErrorWebCam = (error) => {
    //     console.log(error);
    // }
    // const handleScanWebCam = (result) => {
    //     if (result) {
    //         setScanResultWebCam(result);
    //     }
    // }
    return (
        <div>
            <Container>
                
                    <Grid
                        container
                        alignItems="center"
                        direction="column"
                        style={{marginTop:'5px'}}
                    >
                        {!isDisplay?<>
                            <div style={{width:'200px', marginTop:'100px'}}>
                            <Button
                                color='success'
                                variant="contained"
                                fullWidth='true'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>{
                                    setPreviousKey(key)
                                    setDisplay(true)}}
                            >Generate New Code</Button>
                            <Button
                                color='secondary'
                                variant="contained"
                                fullWidth='true'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>{
                                    setKey(previousKey)
                                    setDisplay(true)}}
                            >Show Last Code</Button>
                            </div>
                        </>:<>
                        <QRCode value={key} size={getqrcodesize()} />
                        <Button
                                color='error'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>{setDisplay(false)}}
                            >Close Code</Button>
                        </>}
                        

                    </Grid>
            </Container>
            <Tabs cat='tab1' />
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    conatiner: {
        // marginTop: 10
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
export default Stream