import React, { useState, useEffect } from "react";
import StudentLogin from './StudentLogin'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ClassStudent from '../components/ClassStudent'

import fire from "../helpers/db";

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

    // console.log(url)
    const userState = async () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);

        if(userobject!==null){
            fire.database().ref('student/'+localStorage.getItem('student_id')).on('value',(data) => {
                let classes = data.val().classroom
                setClassList(classes)
                console.log("fetching classes...")
                console.log(data.val().classroom)
    
            })
        }
    }


    const signOut = () => {
        setClassList(undefined)
        localStorage.removeItem('user');
        localStorage.removeItem('student_id');
        localStorage.removeItem('classroom_id');
        localStorage.removeItem('role');
        setUser(null);
    }

    useEffect(() => {

        userState();

        


    }, []);
    // let em=user.email
    const noClass=()=>{
        return(
            <div style={{display:'flex', justifyContent:'center', fontSize:'1.2rem',marginTop:'100px',textAlign:'center', color:'rgb(114 114 114)'}}>
                Tap + button to join a classroom or refresh the page
            </div>
        )
    }
    return (
        <>
            {(user === null || localStorage.getItem("role") !== "student") ? <StudentLogin signin={(user) => setUser(user)} /> :
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
                                    <Link to='/student/ClassroomFormStudent'><ControlPointIcon color='primary' style={{ fontSize: 45, marginTop: '2.5px' }} /></Link>
                                </Avatar>
                            </div>

                            {classList === undefined && noClass()}
                            {classList !== undefined && classList.map((classKey, index) => <ClassStudent classKey={classKey} key={index} />)}


                        </div>

                    </div>


                    {/* </Router> */}
                </>
            }
        </>
    )
}

export default Home