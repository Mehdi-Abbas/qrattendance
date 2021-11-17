import React from 'react'
// import FontAwesome from 'react-fontawesome'
import Tabs from '../components/Tabs';
import fire from "../helpers/db";
import Person from '../components/Person';

const People = () => {
    const [studentList, setStudentList] = React.useState([])
    const [teacherName, setTeacherName] = React.useState()
    const [classCode, setClassCode] = React.useState()

    React.useEffect(() => {

        fire.database().ref('classroom/'+localStorage.getItem('classroom_id')).once('value').then((data) => {
            setClassCode(data.val().code)
        }).catch((error) => {
            console.error(error);
        })
        fire.database().ref('classroom/'+localStorage.getItem('classroom_id')+'/student').on('value',(data) => {
            let students = data.val()
            console.log(students)
            if(students!==undefined)
                setStudentList(students)
        })
        fire.database().ref('teacher/'+localStorage.getItem('teacher_id')).once('value').then((data) => {

            setTeacherName(data.val().name)


        }).catch((error) => {
            console.error(error);
        })
    }, []);
    return (
        <div>

            <div className="category">
                <div className="head">Classroom Code</div>
                <div className="list">
                    <div className="item">
                        <div className="info">
                            <h1>{classCode}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Teacher</div>
                <div className="list">
                    <div className="item">
                        <div style={{ display: 'flex' }}>
                            <div className="pic">
                                <img alt="" src="profile.png" />
                            </div>
                            <div className="info">
                                <h3>{teacherName}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Classmates ({studentList? studentList.length:'No student'})</div>
                <div className="list">

                    {studentList ? studentList.map((studentKey, index) => <Person studentKey={studentKey} key={index} />):null}



                </div>
            </div>
            <Tabs cat='tab3' />
        </div>
    );
}

export default People