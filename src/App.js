import React, { Component } from 'react';
import Ripple from './Ripple';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Ripple>
                    <div className="content" />
                </Ripple>
                <div className="no-content" />
            </div>
        );
    }
}

export default App;
