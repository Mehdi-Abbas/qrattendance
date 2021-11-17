import React from 'react'

import Tabs from '../components/Tabs';
import fire from "../helpers/db";
import Attendance from '../components/Attendance';

const Classwork = () => {
    const [attendanceList, setAttendanceList] = React.useState([])

    React.useEffect(() => {


        fire.database().ref('classroom/' + localStorage.getItem('classroom_id')).on('value', (data) => {
            let attendances = data.val().attendance
            console.log(attendances)
            if (attendances !== undefined)
                setAttendanceList(attendances)
        })

    }, []);

    return (
        <div>

            <div className="category">
                <div className="head">Attendances ({attendanceList?attendanceList.length:0})</div>
                <div className="list">
                    {attendanceList ? attendanceList.map((attKey, index) => <Attendance attendanceKey={attKey} index={index} length={attendanceList.length} />) : null}
                    
                </div>
            </div>

            <Tabs cat='tab2' />
        </div>
    );
}

export default Classwork