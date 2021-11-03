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
import StudentLogin from './StudentLogin';
import StudentSignup from './StudentSignup';
import StudentHome from './StudentHome'
import ForgetPassword from './ForgetPassword'
export default function Student() {
//   const { height } = UseWindowDimensions();
  let { path } = useRouteMatch();
  return (
    // <div style={{display:'flex', height:height, flexDirection:"column", justifyContent:'center', alignItems:'center', background:'#c9c6c6'}}>
      <Router>
        <Switch>
          <Route exact path={path}>
          <StudentHome/>
          </Route>
          <Route path={`${path}/signup`}>
            <StudentSignup />
          </Route>
          <Route path={`${path}/signin`}>
            <StudentLogin />
          </Route>
          <Route path={`${path}/forgetpassword`}>
            <ForgetPassword />
          </Route>
        </Switch>
      </Router>
    // </div>
  );
}
