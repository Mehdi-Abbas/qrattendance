import React from 'react'
import fire from '../helpers/db'
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
const Class = ({ classKey }) => {
    const [classs, setClass] = React.useState()
    const [url, setUrl]=React.useState()

    const redirect = () => {
        localStorage.setItem("classroom_id", classKey)

    }

    const deleteClass = () => {
        // fire.database().ref('classroom').child(classKey).remove()
        fire.database().ref('teacher/' + localStorage.getItem('teacher_id')).once('value').then((data) => {
            let classes = data.val().classroom
            let archivedClass = data.val().archive

            if (archivedClass !== undefined) {

                archivedClass = archivedClass.filter(item => item !== classKey)
                if (archivedClass === [''])
                archivedClass = ''
                fire.database().ref('teacher/' + localStorage.getItem('teacher_id')).update({
                    archive: archivedClass,
                });
                if (classes === undefined) {
                    classes = [classKey]
                }
                else {
                    classes.push(classKey)
                }
                fire.database().ref('teacher/' + localStorage.getItem('teacher_id')).update({
                    classroom: classes,
                });
                window.location.assign(url)
            }

        })

    }




    React.useEffect(() => {
        // console.log(classKey)
        setUrl(window.location.href)
        fire.database().ref('classroom').child(classKey).get().then((data) => {

            setClass(data.val())
            console.log(data.val())

        }).catch((error) => {
            console.error(error);
        })
    }, []);
    return (
        <>
            {classs !== undefined ? <>
                {/* {getClass()} */}
                <Link to='/teacher/Home/'>
                    <div className="hero" onClick={redirect}>
                        <div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2 style={{ width: '90%', overflow: 'hidden', whiteSpace: "nowrap" }}>{classs !== null && classs.name}</h2>
                                <IconButton onClick={() => {
                                    if (window.confirm("Are you sure you want to unarchive this classroom?")) {
                                        deleteClass()
                                        // alert("Refresh the page to see the affecr")
                                    }
                                }}>
                                    <UnarchiveIcon style={{ color: '#FFF', zIndex: '1' }} />
                                </IconButton>
                            </div>
                            <h4 style={{ width: '50%', overflow: 'hidden', whiteSpace: "nowrap", marginTop: "-10px" }}>{classs !== null && classs.section}</h4>
                        </div>
                        <p>{classs !== null && (classs.student === undefined ? 'No student' : classs.student.length + (classs.student.length === 1 ? " student" : " students"))}</p>
                    </div>
                </Link>

            </> : null}
        </>


    )
}

export default Class