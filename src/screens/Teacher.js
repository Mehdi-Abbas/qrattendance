import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import TeacherLogin from './TeacherLogin';
import TeacherSignup from './TeacherSignup';
import TeacherHome from './TeacherHome';
import ForgetPassword from './ForgetPassword';
import ClassworkWrapper from './ClassworkWrapper'
import PeopleWrapper from './PeopleWrapper'
import ClassroomList from "./ClassroomList";
import ClassroomForm from "./ClassroomForm";
import Archive from "./Archived"
import Attendance from "./Attendance";
export default function Teacher() {
  let { path } = useRouteMatch();
  return (
    // <div style={{display:'flex', height:height, flexDirection:"column", justifyContent:'center', alignItems:'center', background:'#c9c6c6'}}>
      <Router>
        <Switch>
          <Route exact path={`${path}`}>
          <ClassroomList/>
          </Route>
          <Route path={`${path}/Archived`}>
            <Archive />
          </Route>
          <Route path={`${path}/Attendance`}>
            <Attendance />
          </Route>
          <Route path={`${path}/Home`}>
            <TeacherHome />
          </Route>
          <Route path={`${path}/ClassroomForm`}>
            <ClassroomForm />
          </Route>
          <Route path={`${path}/signup`}>
            <TeacherSignup />
          </Route>
          <Route path={`${path}/signin`}>
            <TeacherLogin />
          </Route>
          <Route path={`${path}/forgetpassword`}>
            <ForgetPassword />
          </Route>
          <Route path={`${path}/classwork`}>
            <ClassworkWrapper />
          </Route>
          <Route path={`${path}/people`}>
            <PeopleWrapper />
          </Route>
          
        </Switch>
      </Router>
    // </div>
  );
}
