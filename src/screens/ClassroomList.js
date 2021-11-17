import React, { useState, useEffect } from "react";
import TeacherLogin from './TeacherLogin';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Class from '../components/Class'

import fire from "../helpers/db";
import ArchiveIcon from '@mui/icons-material/Archive';

const Home = () => {
    const [classList, setClassList] = useState()

    document.addEventListener("DOMContentLoaded", function () {
        // document.getElementById('main').style.marginTop = document.getElementById('topBar').getBoundingClientRect().height + 'px'
        let el_autohide = document.querySelector('.autohide');
        if (el_autohide) {
            var last_scroll_top = 0;
            window.addEventListener('scroll', function () {
                let scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('scrolled-up');
                    // console.log("scroll")
                }
                else {
                    el_autohide.classList.remove('scrolled-up');
                    el_autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            });
            // window.addEventListener
        }
        // if

    });

    const [user, setUser] = useState('');
    const [archivedClass, setArchivedClass] = useState()

    // console.log(url)
    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);

        if (userobject !== null) {
            fire.database().ref('teacher/' + localStorage.getItem('teacher_id')).on('value',(data) => {
                let classes = data.val().classroom
                setArchivedClass(data.val().archive)

                setClassList(classes)
                console.log("fetching classes...")



            })
        }

    }


    const signOut = () => {
        setClassList(undefined)
        localStorage.removeItem('user');
        localStorage.removeItem('teacher_id');
        localStorage.removeItem('classroom_id');
        localStorage.removeItem('role');
        localStorage.removeItem('attendance_id');
        localStorage.removeItem('student_id');
        localStorage.removeItem('latest_attendace_id')
        setUser(null);
    }

    const noClass = () => {
        
        return (
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1.2rem',marginTop:'100px',textAlign:'center', color: 'rgb(114 114 114)' }}>
                Tap + button to create a new classroom or refresh the page
            </div>
        )
    }
    useEffect(() => {
        
        userState();




    }, []);
    // let em=user.email
    return (
        <>
            {(user === null || localStorage.getItem("role") !== "teacher") ? <TeacherLogin signin={(user) => setUser(user)} /> :
                <>
                    {/* <Router> */}
                    {console.log('mehdi')}
                    <div id="topBar" className="navBar autohide">
                        <AppBar position="static">
                            <Toolbar style={{ display: 'flex', paddingLeft: '10px' }}>
                                <Typography variant="h7" style={{ flex: 1, overflow: 'hidden' }}>{user}</Typography>
                                <Button color="inherit" onClick={() => signOut()} style={{ marginRight: '-10px' }}>Logout</Button>
                            </Toolbar>
                        </AppBar>

                    </div>



                    <div id="main" style={{ padding: "8px", width: '100%', marginTop: '60px', paddingBottom: '60px' }}>
                        <div>
                            <div style={{ position: 'fixed', bottom: '0px', right: '7px', zIndex: '10' }}>
                                <Avatar sx={{ m: 1, bgcolor: '#fff', height: '50px', width: '50px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} >
                                    <Link to='/teacher/ClassroomForm'><ControlPointIcon color='primary' style={{ fontSize: 45, marginTop: '2.5px' }} /></Link>
                                </Avatar>
                            </div>
                            <Link to="/teacher/Archived">
                                <div className='archived'>
                                    <div style={{display:'flex'}}>
                                        <ArchiveIcon />
                                        <div className='archivedtxt'>
                                            Archived
                                        </div>
                                    </div>
                                    <p>{ (archivedClass === undefined ? 'No classroom' : archivedClass.length + (archivedClass.length === 1 ? " classroom" : " classrooms"))}</p>
                                </div>
                            </Link>
                            {/* {classList === undefined && noClass()} */}
                            {classList ? classList.map((classKey, index) => <Class classKey={classKey} key={index} />):noClass()}
                            


                        </div>

                    </div>


                    {/* </Router> */}
                </>
            }
        </>
    )
}

export default Home