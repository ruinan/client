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
        record: undefined
    }

    startRecord = (e) => {
        console.log('start record');
        this.setState({
            isRecording: true,
            records: [],
        });
    }

    stopRecord = (e) => {
        console.log('stop record', this.state.records);
        // submit records
        this.setState({
            isRecording: false,
        });
    }

    startReplay = async (e) => {
        // fetch records
        console.log('replay record');
        this.setState({
            isReplaying: true
        });
        let records = this.state.records.slice(0);
        console.log('replay record', records);
        let prev = -1;
        console.log(this.state.isReplaying, this.state.isRecording);
        
       for (let i = 0; i < records.length; i++) {
           if (!this.state.isReplaying) {
               break;
           }
            const record = records[i];
            console.log('for loop', record.timestamp);
            console.log(record);
            if (prev === -1) {
                prev = record.timestamp;
            } 
            console.log(prev);
            setTimeout(() => {
                this.setState({
                    record,
                });
                console.log('set');
            }, record.timestamp - prev);
        }

    }

    sleep = (diff) => {
        const start = Date.now();
        console.log('sleep start', start);
        while(true) {
            if (Date.now() - start > diff) {
                break;
            }
        }
        console.log('sleep stop', Date.now());
    }

    stopReplay = (e) => {
        this.setState({
            isReplaying: false,
        });
    }

    updateRecord = (position) => {
        console.log('updaterecord', position);
        this.setState(prevState => {
            const prev = prevState.records.slice(0);
            prev.push(position);
            return {
                records: prev,
            };
        });
    }

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
                    recordStatus={this.state.isRecording} 
                    replayStatus={this.state.isReplaying}
                    updateRecord={this.updateRecord} 
                    record={this.state.record}
                >
                    <div className="section">
                        <button className='button' >button1</button>
                        <button className='button' >button2</button>
                        <button className='button' >button3</button>
                        <input type='text' placeholder='input'/>

                        <label htmlFor='checkbox1'>Checkbox1</label>
                        <input type='checkbox' id='checkbox1'/>
                        <label htmlFor='checkbox2'>Checkbox2</label>
                        <input type='checkbox' id='checkbox2'/>
                        <label htmlFor='checkbox3'>Checkbox3</label>
                        <input type='checkbox' id='checkbox3'/>
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default App;
