
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import fire from '../helpers/db'
import IconButton from "@mui/material/IconButton";

const Person = ({ studentKey }) => {
    const [student, setStudent] = React.useState()
    const [url, setUrl] = React.useState()
    


    const deleteStudent = () => {
        // fire.database().ref('classroom').child(classKey).remove()
        fire.database().ref('student/' + studentKey).once('value').then((data) => {
            let classrooms = data.val().classroom
            if (classrooms !== undefined) {

                classrooms = classrooms.filter(item => item !== localStorage.getItem('classroom_id'))
                if (classrooms === [''])
                    classrooms = ''
                fire.database().ref('student/' + studentKey).update({
                    classroom: classrooms,
                });
            }

        })
        fire.database().ref('classroom/' + localStorage.getItem('classroom_id')).once('value').then((data) => {
            let students = data.val().student
            if (students !== undefined) {

                students = students.filter(item => item !== studentKey)
                if (students === [''])
                    students = ''
                fire.database().ref('classroom/' + localStorage.getItem('classroom_id')).update({
                    student: students,
                });
                window.location.assign(url)
            }


        })
    }

    React.useEffect(() => {
        // console.log(classKey)
        setUrl(window.location.href)
        fire.database().ref('student/' + studentKey).once('value').then((data) => {
            console.log(studentKey)
            console.log(data.val().name)
            setStudent(data.val().name)


        }).catch((error) => {
            console.error(error);
        })
    }, []);
    return (
        <>
            {student !== undefined ? <>

                <div className="item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex' }}>
                            <div className="pic">
                                <img alt="" src="profile.png" />
                            </div>
                            <div className="info">
                                <h3>{student}</h3>
                            </div>
                        </div>
                        <IconButton onClick={() => {
                            if (window.confirm("Are you sure you want to unenroll this student?")) {
                                deleteStudent()
                                // alert("Refresh the page to see the affecr")
                            }
                        }}>
                            <DeleteIcon style={{ color: '#00000066', zIndex: '1' }} />
                        </IconButton>
                    </div>

                </div>


            </> : null}
        </>


    )
}

export default Person