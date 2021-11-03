import './App.css';
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UseWindowDimensions from './components/Screensize';
import Welcome from './screens/Welcome';
import Teacher from './screens/Teacher';
import Student from './screens/Student';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store/Store';
// import Todos from './screens/todos';


export default function App() {
  const { height } = UseWindowDimensions();
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', height: height, flexDirection: "column", alignItems: 'center' }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/teacher">
              <Teacher />
            </Route>
            <Route path="/student">
              <Student />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>

  );
}
