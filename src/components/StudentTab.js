import React from 'react'
import '../App.css';
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

function handleClick(name){
    // console.log("clicked")
    const links= document.getElementsByClassName("link")
    // console.log(typeof links[i])
    for(let i=0; i<2; i++){
        if(links[i].classList.contains("not-active") && links[i].name===name){
            links[i].classList.replace("not-active","active")
        }
        if(links[i].name!==name && links[i].classList.contains("active")){
            links[i].classList.replace("active","not-active")
        }
    }
}

export default function Tabs(props) {
    // let tabbar_height = document.querySelector('.tabBar').offsetHeight;
    // tabbar_height+=10 //giving margin in bottom of navbar
    // document.getElementById('main').style.paddingBottom = tabbar_height + 'px';
    return (
        <div className="tabBar">
            <ul>
                <li>
                    <Link to="/student/Home" name="stream" className={`link ${props.cat==='tab1'?'active':'not-active'}`} onClick={()=>handleClick('stream')}>
                        <FontAwesome className='fa fa-qrcode' name='stream' />
                        Scan Code
                    </Link>
                </li>
                <li>
                    <Link to="/student/attendance" name="classwork" className={`link ${props.cat==='tab2'?'active':'not-active'}`} onClick={()=>handleClick('classwork')}>
                        <FontAwesome className='fa fa-list-alt' name='classwork' />
                        Attendances
                    </Link>
                </li>
            </ul>
        </div>

    )
}