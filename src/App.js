import React, { Component } from 'react';
import Ripple from './components/Ripple';
import RecordPanel from './components/RecordPanel';
import './App.css';
import './components/RecordPanel.css';
import API from './api';

class App extends Component {
    state = {
        isRecording: false,
        isReplaying: false,
        records: [],
        recordsList: [],
        record: undefined,
        startTimestamp: -1,
        stopTimestamp: -1,
        index: 0,
        name: '',
    };
    colorSet = ['blue', 'yellow', 'red'];

    handleNameChange = (name) => {
        this.setState({name});
    }

    async componentDidMount() {
        const result = await API.getAllRecords();
        console.log(result);
        this.setState({
            recordsList: result,
        });
    }

    startRecord = e => {
        console.log('start record');
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isRecording: true,
            records: [],
            startTimestamp: Date.now(),
        });
    };

    stopRecord = e => {
        console.log('stop record');
        e.stopPropagation();
        e.preventDefault();
        // submit records
        this.setState({
            isRecording: false,
            stopTimestamp: Date.now(),
        });
        API.saveRecord(this.state.records);
    };

    startReplay = e => {
        // fetch records
        e.stopPropagation();
        e.preventDefault();
        console.log('start replay');
        this.setState({
            isReplaying: true,
        });
        let records = this.state.records.slice(0);
        console.log(records);
        if (this.state.records.length > 0 && !this.state.isRecording) {
            for (const r of records) {
                console.log(r);
                setTimeout(() => {
                    const record = records.shift();
                    console.log('call', record);
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
        e.stopPropagation();
        e.preventDefault();
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

    handleMouseDown = (e) => {
        e.stopPropagation();
        console.log('button down');
    }

    handleMouseUp = (e) => {
        e.stopPropagation();
        console.log('button up');
    }

    handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let index = this.state.index;
        index++;
        if (index > this.colorSet.length - 1) {
            index = 0;
        }
        this.setState({
            index,
        });

    }

    buttonMouseDown = (e) => {
        console.log('button down');
    }

    render() {
        const color = this.colorSet[this.state.index];
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
                        changeName={this.handleNameChange}
                    />
                </div>
                <Ripple
                    isRecording={this.state.isRecording}
                    isReplaying={this.state.isReplaying}
                    updateRecord={this.updateRecord}
                    record={this.state.record}
                    startTimestamp={this.state.startTimestamp}
                    color={color}
                >
                    <div className="section">
                        <button className="button" onMouseUp={this.handleClick} style={{backgroundColor: color}} onMouseDown={this.buttonMouseDown}>{`${color} button`}</button>
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default App;
