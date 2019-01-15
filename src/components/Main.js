import React, { Component } from 'react';
import Ripple from './Ripple';
import RecordPanel from './RecordPanel';
import './Main.css';
import './RecordPanel.css';
import * as API from '../api';
import { Link } from 'react-router-dom';

class App extends Component {
    state = {
        isRecording: false,
        isReplaying: false,
        isMatch: true,
        records: [],
        recordsList: [],
        record: undefined,
        startTimestamp: -1,
        stopTimestamp: -1,
        index: 0,
        index2: 0,
        name: '',
        socket: undefined,
    };

    colorSet = ['blue', 'yellow', 'red'];

    handleNameChange = name => {
        this.setState({ name });
    };

    async componentDidMount() {
        try {
            this.fetchRecords();
            API.socketListener();
            const socket = await API.socketListener();
            this.setState({
                socket,
            });
        } catch (e) {
            console.error(e);

        }
    }

    componentWillUnmount() {
        console.log(this.state.socket.disconnected);
    }

    fetchRecords = async () => {
        const result = await API.getAllRecords();
        console.log(result);
        this.setState({
            recordsList: result,
        });
    };

    startRecord = e => {
        console.log('start record');
        if (!this.state.name || this.state.name.length === 0) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isRecording: true,
            records: [],
            startTimestamp: Date.now(),
        });
    };

    stopRecord = async e => {
        console.log('stop record');
        e.stopPropagation();
        e.preventDefault();
        // submit records
        this.setState({
            isRecording: false,
            stopTimestamp: Date.now(),
        });
        await API.saveRecord(this.state.records, this.state.name);
        await this.fetchRecords();
    };

    startReplay = e => {
        // fetch records
        e.stopPropagation();
        e.preventDefault();
        console.log('start replay');
        if (!this.state.records || this.state.records.length === 0) {
            return;
        }
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
                    if (this.state.isReplaying) {
                        this.setState({ record });
                    }
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
        if (!this.state.isReplaying) {
            e.stopPropagation();
            e.preventDefault();
            this.setState({
                isReplaying: false,
                records: [],
                isMatch: true,
            });
        }
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
    handleClick2 = e => {
        e.stopPropagation();
        e.preventDefault();
        let index = this.state.index2;
        index--;
        if (index < 0) {
            index = this.colorSet.length - 1;
        }
        this.setState({
            index2: index,
        });
    };

    buttonMouseDown = e => {
        console.log('button down');
    };

    loadSelectRecord = id => {
        console.log(id);
        const record = this.state.recordsList.find(e => e['_id'] === id);
        console.log('all', this.state.recordsList);
        if (record) {
            this.setState({
                records: record.path,
            });
        }
    };

    compareRecord = (current, record) => {
        if (current !== record) {
            console.log('not match');
            this.setState({ isMatch: false });
        }
    };

    render() {
        const color = this.colorSet[this.state.index];
        const testColor = this.colorSet[this.state.index2];
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
                        name={this.state.name}
                        recordsList={this.state.recordsList.map(r => ({
                            name: r.name,
                            id: r['_id'],
                        }))}
                        loadSelectRecord={this.loadSelectRecord}
                    />
                </div>
                <Ripple
                    compareRecord={this.compareRecord}
                    isRecording={this.state.isRecording}
                    isReplaying={this.state.isReplaying}
                    updateRecord={this.updateRecord}
                    record={this.state.record}
                    startTimestamp={this.state.startTimestamp}
                    color={testColor}
                >
                    <div className="section">
                        <h1 className='background_indicator'>Origin</h1>
                        <button
                            className="button"
                            onMouseUp={this.handleClick}
                            style={{ backgroundColor: color }}
                            onMouseDown={this.buttonMouseDown}
                        >{`${color} button`}</button>
                        <div style={{ height: '1rem', width: '1rem' }} />
                        <button
                            className="button"
                            onMouseUp={this.handleClick2}
                            style={{ backgroundColor: testColor }}
                            onMouseDown={this.buttonMouseDown}
                        >{`Unexpected`}</button>
                    </div>
                </Ripple>

                <div className="control_panel">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                {this.state.isMatch ? null : (
                    <div className="error">Not Match</div>
                )}
            </div>
        );
    }
}

export default App;
