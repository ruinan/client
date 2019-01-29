import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import * as API from './api';
import SocketContext from './SocketContext';

const socket = API.socketListener();
export default function App() {
    return (
        <Router>
            <SocketContext.Provider value={socket}>
                <Route exact component={Main} path="/" />
                <Route exact component={Dashboard} path="/dashboard" />
            </SocketContext.Provider>
        </Router>
    );
}
