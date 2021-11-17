import React, { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';

import Tabs from '../components/Tabs'
import QRCode from "react-qr-code";
import UseWindowDimensions from '../components/Screensize';
import fire from "../helpers/db";


import StudentList from '../components/StudentList'

const Stream = () => {
    const [isDisplay, setDisplay] = useState(false)
    const [key, setKey] = useState()
    // const classes = useStyles();
    
    const [Data, setData] = useState([])
    // let studentData = []
    const [disable, setDisable] = useState(false)
    // const [reload, setReload] = useState(false)
    // var studentData = []
    const [totalStudents, setTotalStudents] = useState(0)
    const [presentStudents, setPresentStudents] = useState(0)
    const [absentStudents, setAbsentStudents] = useState(0)
    const {  width } = UseWindowDimensions();
    // const[latestKey, setLatestKey]=useState()



    const generateCode = () => {
        console.log("generating code...")
        var newAttendanceKey = fire.database().ref().child('attendance').push().key;
        setKey(newAttendanceKey)
        localStorage.setItem("latest_attendance_id",newAttendanceKey)
        localStorage.setItem("attendance_id",newAttendanceKey)
        setDisplay(true)
        setPresentStudents(0)
        setAbsentStudents(totalStudents)
        let tempData = Data.map((item) => {
            let tempdata = {
                key: item.key,
                serial: item.serial,
                id: item.id,
                name: item.name,
                status: 'absent'
            }

            return tempdata
        })

        fire.database().ref('attendance/' + newAttendanceKey).update({
            classroom: localStorage.getItem("classroom_id"),
            teacher: localStorage.getItem("teacher_id"),
            active: true,
            timeStampOpen: new Date().toDateString() +", "+ new Date().toLocaleTimeString(),
            student: tempData
        });



        fire.database().ref("classroom/" + localStorage.getItem("classroom_id")).once("value").then((data) => {
            let atte = data.val().attendance
            if (atte === undefined) {
                let attlist = [newAttendanceKey]
                fire.database().ref("classroom/" + localStorage.getItem("classroom_id")).update({
                    attendance: attlist,
                })
            }
            else {
                atte.unshift(newAttendanceKey)
                fire.database().ref("classroom/" + localStorage.getItem("classroom_id")).update({
                    attendance: atte,
                })
            }
        })

    }




    const closeCode = () => {
        console.log("closing...")
        setDisplay(false)
        // setPreviousKey(key)
        fire.database().ref('attendance/' + key).update({
            active: false,
            timeStampClose: new Date().toDateString() +", "+ new Date().toLocaleTimeString(),
        });
        // window.location.reload()

    }
    const reOpen = () => {
        console.log("opening...")
        setKey(localStorage.getItem('latest_attendance_id'))
        setDisplay(true)
        

        fire.database().ref('attendance/' + localStorage.getItem('latest_attendance_id')).update({
            active: true,
        });
    }

    const getqrcodesize = () => {
        let qrocdeWidth = width - 100
        if (width <= 600) {
            return qrocdeWidth
        }
        else {
            return 600
        }

    }
    const fetchList = () => {
        fire.database().ref('attendance/' + key).on('value', (data) => {
            console.log(data.val().student)
            let stu = data.val().student
            let studentData = []
            let n = 1
            setTotalStudents(stu.length)
            setAbsentStudents(0)
            setPresentStudents(0)
            let tempPresnt = 0
            let tempAbsent = 0
            for (let i in stu) {
                console.log(i)
                let tempdata = {}
                tempdata['key'] = stu[i].key
                tempdata['serial'] = n
                tempdata['name'] = stu[i].name
                tempdata['id'] = stu[i].id
                tempdata['status'] = stu[i].status

                studentData.push(tempdata)
                n++
                stu[i].status === 'present' ?
                    tempPresnt++
                    : tempAbsent++
            }
            setAbsentStudents(tempAbsent)
            setPresentStudents(tempPresnt)
            console.log(studentData)
            setData(studentData)

        })

    }
    React.useEffect(() => {

        fire.database().ref('classroom/' + localStorage.getItem("classroom_id")).on('value', (data) => {
            let stu = data.val().student
            let studentData = []
            if (stu === null || stu===undefined) {
                setDisable(true)
            }
            else {

                setTotalStudents(stu.length)
                setAbsentStudents(stu.length)
                setPresentStudents(0)
                stu.map((studentKey, index) => {
                    fire.database().ref('student/' + studentKey).on('value', (data) => {
                        console.log(studentKey)
                        console.log(data.val().name)
                        let tempdata = {}
                        tempdata['key'] = studentKey
                        tempdata['serial'] = index + 1
                        tempdata['name'] = data.val().name
                        tempdata['id'] = data.val().student_id
                        tempdata['status'] = 'absent'

                        studentData.push(tempdata)
                        console.log(studentData)






                    })
                    return null
                })
                setData(studentData)

            }
        })
    }, []);

    return (
        <div>
            <Container>

                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    style={{ marginTop: '5px' }}
                >
                    {!isDisplay ? <>
                        <div style={{ width: '200px', marginTop: '100px' }}>
                            <Button
                                color='success'
                                variant="contained"
                                fullWidth='true'
                                disabled={disable}
                                sx={{ mt: 3, mb: 2 }}

                                onClick={() => generateCode()}
                            >Generate New Code</Button>
                            <Button
                                color='secondary'
                                variant="contained"
                                fullWidth='true'
                                disabled={disable || (localStorage.getItem('attendance_id') === null ? true : false)}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => reOpen()}
                            >Show Last Code</Button>
                        </div>
                    </> : <>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <QRCode value={key} size={getqrcodesize()} />
                                <Button
                                    color='error'
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => closeCode()}
                                >Close Attendance</Button>
                            </div>
                            <div className="studentList" >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Button
                                        color='success'
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => fetchList()}
                                    >Refresh List</Button>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', size: '1.2rem', fontWeight: 'bold', margin: '10px auto' }}><div>Total: {totalStudents}</div> <div>Present: {presentStudents}</div> <div>Absent: {absentStudents}</div></div>
                                    {Data ? <StudentList students={Data} /> : null}
                                </div>
                            </div>


                        </div>
                    </>}


                </Grid>
            </Container>
            <Tabs cat='tab1' />
        </div>
    );
}
export default Stream