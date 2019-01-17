import React, { Component } from 'react';
import Ripple from './Ripple';
import RecordPanel from './RecordPanel';
import './Main.css';
import './RecordPanel.css';
import * as API from '../api';
import { Link } from 'react-router-dom';
import * as SocketConnection from '../api/socket';
import SocketContext from '../SocketContext';

class Main extends Component {
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
        ids: [],
    };

    static contextType = SocketContext;
    colorSet = ['blue', 'yellow', 'red'];

    handleNameChange = name => {
        this.setState({ name });
    };

    componentDidMount() {
        this.fetchRecords();
        console.log(this.props.socket);
    }

    componentWillUnmount() {
        for (const id of this.state.ids) {
            clearTimeout(id);
        }
    }

    fetchRecords = async () => {
        const result = await API.getAllRecords();
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

    replay = records => {
        if (records.length > 0 && !this.state.isRecording) {
            const ids = [];
            for (const r of records) {
                const id = setTimeout(() => {
                    // use setTimeout to replay the path based on the sequence and timestamp
                    const record = records.shift();
                    this.setState({ record });

                    if (records.length === 0) {
                        setTimeout(() => {
                            SocketConnection.emit(this.props.socket, {
                                status: 'stop replay',
                                id: this.state.records['_id'],
                                name: this.state.records.name,
                            });
                            this.setState({ isReplaying: false });
                        }, 10);
                    }
                }, r.timestamp);
                ids.push(id);
            }
            this.setState({ ids }); // if the replaying be interrupted by switching webpage. 
        }
    };

    startReplay = e => {
        // fetch records
        e.stopPropagation();
        e.preventDefault();
        if (!this.state.records || this.state.records.length === 0) {
            // no records
            return;
        }
        this.setState({
            // update flag
            isReplaying: true,
        });
        let records = this.state.records.path.slice(0);
        SocketConnection.emit(this.props.socket, {
            status: 'start replay',
            id: this.state.records['_id'],
            name: this.state.records.name,
        }); // call socket
        this.replay(records); // replay records
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

    loadSelectRecord = id => {
        const records = this.state.recordsList.find(e => e['_id'] === id);
        if (records) {
            this.setState({
                records,
            });
        }
    };

    compareRecord = (current, record) => {
        if (current !== record) {
            console.log('not match');
            SocketConnection.emit(this.context, {
                status: 'running',
                id: this.state.records['_id'],
                name: this.state.records.name,
                current,
                record,
            });
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
                        <h1 className="background_indicator">Origin</h1>
                        <button
                            className="button"
                            onMouseUp={this.handleClick}
                            style={{ backgroundColor: color }}
                            onMouseDown={this.buttonMouseDown}
                        >{`${color} button`}</button>
                        {/* <div style={{ height: '1rem', width: '1rem' }} />
                        <button
                            className="button"
                            onMouseUp={this.handleClick2}
                            style={{ backgroundColor: testColor }}
                            onMouseDown={this.buttonMouseDown}
                        >{`Unexpected`}</button> */}
                    </div>
                </Ripple>

                <div className="control_panel">
                    <Link to="/dashboard" className="link" target="_blank">
                        Dashboard
                    </Link>
                </div>
                {this.state.isMatch ? null : (
                    <div className="error">Not Match</div>
                )}
            </div>
        );
    }
}

export default Main;
