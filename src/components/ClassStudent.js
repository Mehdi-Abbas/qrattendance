import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import fire from '../helpers/db'
import IconButton from "@mui/material/IconButton";
import { getFabUtilityClass } from '@mui/material';
import { Link } from 'react-router-dom'

const Class = ({ classKey }) => {
    const [classs, setClass] = React.useState()
    const [teacher, setTeacher] = React.useState()
    const [url, setUrl]=React.useState()

    const redirect = () => {
        localStorage.setItem("classroom_id", classKey)

    }

    const deleteClass = () => {
        fire.database().ref('classroom/' + classKey).once('value').then((data) => {
            let students = data.val().student
            if (students !== undefined) {

                students = students.filter(item => item !== localStorage.getItem('student_id'))
                if (students === [''])
                    students = ''
                fire.database().ref('classroom/' + classKey).update({
                    student: students,
                });
            }

        })
        fire.database().ref('student/' + localStorage.getItem('student_id')).once('value').then((data) => {
            let classes = data.val().classroom
            if (classes !== undefined) {

                classes = classes.filter(item => item !== classKey)
                if (classes === [''])
                    classes = ''
                fire.database().ref('student/' + localStorage.getItem('student_id')).update({
                    classroom: classes,
                });
                window.location.assign(url)
            }
            

        })

    }

    const userState = () => {
        setUrl(window.location.href)
        fire.database().ref('classroom/' + classKey).once('value').then((data) => {
            console.log(data.val())
            setClass(data.val())
            fire.database().ref('teacher/' + data.val().teacher).on('value', (teacherdata) => {
                console.log(teacherdata.val())
                setTeacher(teacherdata.val().name)
            })

        })
        
    }

    React.useEffect(() => {
        // console.log(classKey)
        userState()

    }, []);
    return (
        <>
            {classs !== undefined ? <>
                {/* {getClass()} */}
                <Link to='/student/Home/'>
                    <div className="hero" onClick={redirect}>
                        <div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2 style={{ width: '90%', overflow: 'hidden', whiteSpace: "nowrap" }}>{classs.name}</h2>
                                <IconButton onClick={() => {
                                    if (window.confirm("Are you sure you want to unenroll from this classroom?")) {
                                        deleteClass()
                                        // alert("Refresh the page to see the affecr")
                                    }
                                }}>
                                    <DeleteIcon style={{ color: '#FFF', zIndex: '1' }} />
                                </IconButton>
                            </div>
                            <h4 style={{ width: '50%', overflow: 'hidden', whiteSpace: "nowrap", marginTop: "-10px" }}>{classs.section}</h4>
                        </div>
                        <p>{teacher}</p>
                    </div>
                </Link>

            </> : null}
        </>


    )
}

export default Class