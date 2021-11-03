import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
// import UseWindowDimensions from '../components/Screensize';
// import Welcome from './screens/Welcome';
// import TeacherLogin from './screens/TeacherLogin';
import TeacherLogin from './TeacherLogin';
import TeacherSignup from './TeacherSignup';
import TeacherHome from './TeacherHome';
import ForgetPassword from './ForgetPassword';
import Classwork from "./Classwork";
import People from "./People";
import ClassworkWrapper from './ClassworkWrapper'
import PeopleWrapper from './PeopleWrapper'

export default function Teacher() {
//   const { height } = UseWindowDimensions();
  let { path } = useRouteMatch();
  return (
    // <div style={{display:'flex', height:height, flexDirection:"column", justifyContent:'center', alignItems:'center', background:'#c9c6c6'}}>
      <Router>
        <Switch>
          <Route exact path={`${path}`}>
          <TeacherHome/>
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
