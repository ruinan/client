import React, { Component } from 'react';
import Ripple from './components/Ripple';
import RecordPanel from './components/RecordPanel';
import './App.css';
import './components/RecordPanel.css';

class App extends Component {
    state = {
        isRecording: false,
        isReplaying: false,
        records: [],
        record: undefined,
        startTimestamp: -1,
        stopTimestamp: -1,
    };

    startRecord = e => {
        this.setState({
            isRecording: true,
            records: [],
            startTimestamp: Date.now(),
        });
    };

    stopRecord = e => {
        // submit records
        this.setState({
            isRecording: false,
            stopTimestamp: Date.now(),
        });
    };

    startReplay = e => {
        // fetch records
        console.log('start replay');
        this.setState({
            isReplaying: true,
        });
        let records = this.state.records.slice(0);
        if (this.state.records.length > 0 && !this.state.isRecording) {
            for (const r of records) {
                setTimeout(() => {
                    const record = records.shift();
                    console.log('shift', record);
                    this.setState({ record });
                    if (records.length === 0) {
                        setTimeout(() => {
                            this.setState({isReplaying: false});
                        }, 10);
                        
                    }
                }, r.timestamp);
            } 
            
        }
    };
    
    stopReplay = e => {
        this.setState({
            isReplaying: false,
        });
    };

    updateRecord = position => {
        this.setState(prevState => {
            const prev = prevState.records.slice(0);
            prev.push(position);
            return {
                records: prev,
            };
        });
    };

    render() {
        return (
            <div className="App">
                <div className="control_panel">
                    <RecordPanel
                        startRecord={this.startRecord}
                        stopRecord={this.stopRecord}
                        startReplay={this.startReplay}
                        stopReplay={this.stopReplay}
                        isRecording={this.state.isRecording}
                        isReplaying={this.state.isReplaying}
                    />
                </div>
                <Ripple
                    isRecording={this.state.isRecording}
                    isReplaying={this.state.isReplaying}
                    updateRecord={this.updateRecord}
                    record={this.state.record}
                    startTimestamp={this.state.startTimestamp}
                >
                    <div className="section">
                        <button className="button">button1</button>
                        <button className="button">button2</button>
                        <button className="button">button3</button>
                        <input type="text" placeholder="input" />

                        <label htmlFor="checkbox1">Checkbox1</label>
                        <input type="checkbox" id="checkbox1" />
                        <label htmlFor="checkbox2">Checkbox2</label>
                        <input type="checkbox" id="checkbox2" />
                        <label htmlFor="checkbox3">Checkbox3</label>
                        <input type="checkbox" id="checkbox3" />
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default App;
