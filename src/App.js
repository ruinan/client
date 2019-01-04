import React, { Component } from 'react';
import Ripple from './Ripple';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Ripple>
                    <div className="section">
                        <button>This is a button</button>
                        <input type="text" />
                    </div>
                </Ripple>
                <div className="section">
                    <h1>Ripple does not work on this side </h1>
                </div>
            </div>
        );
    }
}

export default App;
