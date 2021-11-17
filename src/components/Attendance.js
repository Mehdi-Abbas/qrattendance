
import React from 'react'
import fire from '../helpers/db'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Attendance = ({ attendanceKey, length, index }) => {
    const [student, setStudent] = React.useState()
    const [date, setDate] = React.useState()
    const [percent, setPercent] = React.useState()
    const [active, setActive] = React.useState()

    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress color="success" variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="#000">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    const Active = () => {
        return (
            <p style={{ color: '#F00', fontWeight: 'bold' }}>Still open</p>
        )
    }

    React.useEffect(() => {
        // console.log(classKey)
        // setUrl(window.location.href)
        fire.database().ref('attendance/' + attendanceKey).once('value').then((data) => {
            console.log(attendanceKey)
            console.log(data.val().student)
            setStudent(data.val().student)
            setDate(data.val().timeStampClose)
            setActive(data.val().active)
            // getPercent();
            let present = 0
            for (let i in data.val().student) {
                if (data.val().student[i].status === 'present') {
                    present++
                }
            }
            let per = ~~(present * 100 / data.val().student.length)
            // console.log(per)
            // console.log("lop")
            setPercent(per)

        }).catch((error) => {
            console.error(error);
        })

    }, []);
    return (
        <>
            {student !== undefined ? <>
                <Link to='/teacher/Attendance/' className="">
                    <div className="item" onClick={() => { localStorage.setItem('attendance_id', attendanceKey) }}>
                        <div style={{ display: 'flex' }}>
                            <div className={active ? 'picred' : 'pic'}>
                                <FontAwesome className='fa fa-book' name='classwork' />
                            </div>
                            <div className="info">
                                <h5>Attendance {length - index}</h5>
                                <p>{active ? <Active /> : date}</p>
                            </div>
                        </div>
                        <div className="percent">
                            <div className="number"><CircularProgressWithLabel value={percent} /></div>
                            <div className="present">Present</div>
                        </div>
                    </div>

                </Link>


            </> : null}
        </>


    )
}

export default Attendance