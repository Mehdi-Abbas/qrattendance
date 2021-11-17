
import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StudentList = ({ students }) => {
    var studentData = students

    
    console.log(studentData)
    React.useEffect(() => {
        // console.log(classKey)

        // students.map((studentKey, index) => {
        //     fire.database().ref('student/' + studentKey).once('value').then((data) => {
        //         console.log(studentKey)
        //         console.log(data.val().name)
        //         let tempdata = {}
        //         tempdata['serial'] = index
        //         tempdata['name'] = data.val().name
        //         tempdata['id'] = data.val().id
        //         studentData.push(tempdata)

        //         console.log(studentData)

        //     }).catch((error) => {
        //         console.error(error);
        //     })
        // })

    }, []);
    return (
        <>
            {studentData.length > 0 ? <>

                <TableContainer component={Paper} style={{height:'520px',overflow:'scroll'}}>
                    <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell >ID</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentData.length > 0 ? studentData.map((row) => (

                                <TableRow
                                    key={row.serial}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.serial}
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.status==='present'?<span style={{borderRadius:'100%',background:'#427d33',color:'#FFF',padding:'5px 8px',fontWeight:'bold'}}>P</span>:<span style={{borderRadius:'100%',background:'#d44033',color:'#FFF',padding:'5px 8px',fontWeight:'bold'}}>A</span>}</TableCell>

                                </TableRow>
                            )) : "No student"}
                        </TableBody>
                    </Table>
                </TableContainer>


            </> : 'No student'}
        </>


    )
}

export default StudentList