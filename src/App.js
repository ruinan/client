import React, {Component} from 'react';
import {  BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import * as API from './api';
// import SocketContext from './SocketContext';

const socket = API.socketListener();
export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route exact component={(props)=> (<Main {...props} socket={socket}/>)} path="/" />
                <Route exact component={(Dashboard)} path='/dashboard'/>
            </div>
        </Router>);
    }
}