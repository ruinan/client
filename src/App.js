import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';

import SocketContext from './SocketContext';


export default class App extends Component {
    render() {
      
        console.log('original',this.props.socket);
        return (
            <Router>
                <SocketContext.Provider value={this.props.socket}>
                    <Route exact component={(...props) => (<Main {...props} socket={this.props.socket}/>)} path="/" />
                    <Route exact component={(...props) => (<Dashboard {...props} socket={this.props.socket}/>)} path="/dashboard" />
                </SocketContext.Provider>
            </Router>
        );
    }
}
