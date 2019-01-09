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
        index: 0, // color set index
    };

    colorSet = ['blue', 'yellow', 'red'];

    startRecord = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isRecording: true,
            records: [],
            startTimestamp: Date.now(),
        });
    };

    stopRecord = e => {
        e.stopPropagation();
        e.preventDefault();
        // submit records
        this.setState({
            isRecording: false,
            stopTimestamp: Date.now(),
        });
    };

    startReplay = e => {
        // fetch records
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isReplaying: true,
        });
        let records = this.state.records.slice(0);
        if (this.state.records.length > 0 && !this.state.isRecording) {
            for (const r of records) {
                setTimeout(() => {
                    const record = records.shift();
                    this.setState({ record });
                    if (records.length === 0) {
                        setTimeout(() => {
                            this.setState({ isReplaying: false });
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

    handleMouseDown = e => {
        e.stopPropagation();
        console.log('button down');
    };

    handleMouseUp = e => {
        e.stopPropagation();
        console.log('button up');
    };

    handleClick = e => {
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
    };

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
                        <button
                            className="button"
                            onMouseUp={this.handleClick}
                            style={{ backgroundColor: color }}
                        >{`${color} button`}</button>
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default App;
