import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Welcome = () => {
    return (
        <div className="flex-col">
            <Link to="/student" style={{textDecoration:'none'}}><Button variant="contained">I'm Student</Button></Link>
            <br/>
            <Link to="/teacher" style={{textDecoration:'none'}}><Button variant="contained">I'm Teacher</Button></Link>
        </div>
    )
}

export default Welcome