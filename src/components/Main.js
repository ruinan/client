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
        isRecording: false, // flags
        isReplaying: false,
        isMatch: true,
        isTestCase: false,
        records: [], // one single path
        loadedRecords: [], // path from records
        recordsList: [], // all records from database
        record: undefined, // one record
        startTimestamp: -1,
        index: 0, // store the current color change order
        testIndex: 0, // to generate the 'wrong' color order for testing
        name: '',
        ids: [], // to clear all setTimeout()
    };

    static contextType = SocketContext;
    colorSet = ['blue', 'yellow', 'red']; // button color set

    handleNameChange = name => {
        this.setState({ name });
    };

    componentDidMount() {
        this.fetchRecords();
    }

    componentWillUnmount() {
        for (const id of this.state.ids) {
            // I apply the setTimeout to do the tracking replaying.
            // During the process, the component will unmount, then the state does not exist.
            // So, the pending setTimeouts should be cleared.
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
        e.stopPropagation();
        e.preventDefault();
        if (!this.state.name || this.state.name.length === 0) {
            return;
        }
        this.setState({
            isRecording: true,
            records: [],
            startTimestamp: Date.now(),
        });
    };

    stopRecord = async e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isRecording: false,
            index: 0, // reset the button color to blue for the replay
        });
        await API.saveRecord(this.state.records, this.state.name); // save records into the database
        await this.fetchRecords(); // fetch the records from database again.
    };

    replay = records => {
        if (records.length > 0 && !this.state.isRecording) {
            const ids = [];
            for (const record of records) {
                const id = setTimeout(() => {
                    // use setTimeout to replay the path based on the sequence and timestamp
                    this.setState({ record });
                }, record.timestamp);
                ids.push(id);
            }
            this.setState({ ids }); // if the replaying be interrupted by switching webpage.
            this.replayCompleted(records);
        }
    };

    replayCompleted = records => {
        // should wait for all records finish replaying
        setTimeout(() => {
            // send a message
            SocketConnection.emit(this.context, {
                status: 'Stop Replay',
                id: this.state.loadedRecords['_id'],
                name: this.state.loadedRecords.name,
            });
            // is match?
            const status = this.state.isMatch ? 'Success' : 'Failed';
            SocketConnection.emit(this.context, {
                status: status,
                id: this.state.loadedRecords['_id'],
                name: this.state.loadedRecords.name,
                success: this.state.isMatch,
            });
            this.setState({ isReplaying: false});
        }, records[records.length - 1].timestamp + 10);
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
            isMatch: true,
        });
        let records = this.state.loadedRecords.path.slice(0);
        SocketConnection.emit(this.context, {
            status: 'Start Replay',
            id: this.state.loadedRecords['_id'],
            name: this.state.loadedRecords.name,
            isMatch: this.state.isMatch,
        }); // call socket
        this.replay(records); // replay records
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

    handleTestClick = e => {
        e.stopPropagation();
        e.preventDefault();
        let index = this.state.testIndex;
        index--;
        if (index < 0) {
            index = this.colorSet.length - 1;
        }
        this.setState({
            testIndex: index,
        });
    };

    loadSelectRecord = id => {
        const loadedRecords = this.state.recordsList.find(e => e['_id'] === id);
        if (loadedRecords) {
            this.setState({
                loadedRecords,
            });
        }
    };

    compareRecord = (current, record) => {
        if (current !== record) {
            SocketConnection.emit(this.context, {
                status: 'Error: ',
                id: this.state.records['_id'],
                name: this.state.records.name,
                current,
                record,
                isMatch: this.state.isMatch,
            });
            this.setState({ isMatch: false });
        }
    };

    useTestcase = status => {
        this.setState({
            isTestCase: status,
        });
    };

    render() {
        const color = this.state.isTestCase
            ? this.colorSet[this.state.testIndex]
            : this.colorSet[this.state.index];
        const handler = this.state.isTestCase
            ? this.handleTestClick
            : this.handleClick;

        return (
            <div className="App">
                <div className="control_panel">
                    <RecordPanel
                        startRecord={this.startRecord}
                        stopRecord={this.stopRecord}
                        startReplay={this.startReplay}
                        isRecording={this.state.isRecording}
                        isReplaying={this.state.isReplaying}
                        changeName={this.handleNameChange}
                        name={this.state.name}
                        recordsList={this.state.recordsList.map(r => ({
                            name: r.name,
                            id: r['_id'],
                        }))}
                        loadSelectRecord={this.loadSelectRecord}
                        useTestcase={this.useTestcase}
                    />
                </div>
                <Ripple
                    compareRecord={this.compareRecord}
                    isRecording={this.state.isRecording}
                    isReplaying={this.state.isReplaying}
                    updateRecord={this.updateRecord}
                    record={this.state.record}
                    startTimestamp={this.state.startTimestamp}
                    color={color}
                >
                    <div
                        className={`section ${
                            this.state.isTestCase ? 'test_mode' : ''
                        }`}
                    >
                        <h1 className="background_indicator">
                            {this.state.isTestCase ? 'Test' : 'Origin'}
                        </h1>
                        <button
                            className="button"
                            onMouseUp={handler}
                            style={{ backgroundColor: color }}
                            onMouseDown={this.buttonMouseDown}
                        >{`${color} button`}</button>
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
