import React, {Component} from 'react';
import {  BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/Main';
import Dashboard from './components/Dashboard';

export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route exact component={Main} path="/"/>
                <Route component={Dashboard} path='/dashboard'/>
            </div>
        </Router>);
    }
}