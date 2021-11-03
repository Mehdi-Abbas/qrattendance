import React, { useState, useEffect } from "react";
import TeacherLogin from './TeacherLogin';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Redirect } from 'react-router-dom'
import {
    HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Stream from './Stream'
import People from './People';
import Classwork from './Classwork';


const Home = () => {


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
    // const classes = useStyles();
    let { path, url } = useRouteMatch();
    console.log(url)
    const userState = () => {
        const userdata = localStorage.getItem('user');
        const userobject = userdata !== null ? userdata : null;
        // console.log(userdata)
        setUser(userobject);
    }
    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    useEffect(() => {
        userState();
    }, []);
    // let em=user.email
    return (
        <>
            {user !== null ? (
                <>
                    {/* <Router> */}
                        <div id="topBar" className="navBar autohide">
                            <AppBar position="static">
                                <Toolbar style={{ display: 'flex', paddingLeft: '10px' }}>
                                    <Typography variant="h7" style={{ flex: 1, overflow: 'hidden' }}>{user}</Typography>
                                    <Button color="inherit" onClick={() => signOut()} style={{ marginRight: '-10px' }}>Logout</Button>
                                </Toolbar>
                            </AppBar>
                        </div>



                        <div id="main" style={{ padding: "8px", width:'100%', marginTop:'60px', paddingBottom:'60px' }}>
                            {/* <Switch>
                                <Route exact path={url}> */}
                                    <Stream />
                                {/* </Route>
                            </Switch> */}

                        </div>


                    {/* </Router> */}
                </>
            ) : (
                <TeacherLogin signin={(user) => setUser(user)} />
            )}
        </>
    )
}

export default Home