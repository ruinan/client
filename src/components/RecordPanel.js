import React, { Component } from 'react';
import './RecordPanel.css';

export default class RecordPanel extends Component {

    handleInputChange = (e) => {
        this.props.changeName(e.target.value);
    }
    render() {
        const recordFunction = this.props.isRecording
            ? this.props.stopRecord
            : this.props.startRecord;
        const replayFunction = this.props.isReplaying
            ? this.props.stopReplay
            : this.props.startReplay;
        return (
            <div className="container">
                <div className='container'>
                    <input type='text' onChange={this.handleInputChange} placeholder='record name'/>
                    <button
                        className={`${this.props.isRecording ? 'stop' : 'start'}`}
                        disabled={this.props.isReplaying}
                        onClick={recordFunction}
                    >
                        {this.props.isRecording ? 'Stop Record' : 'Start Record'}
                    </button>
                    
                </div>
                <button
                    className={`${this.props.isReplaying ? 'stop' : 'start'}`}
                    disabled={this.props.isRecording}
                    onClick={replayFunction}
                >
                    {this.props.isReplaying ? 'Stop Replay' : 'Start Replay'}
                </button>
            </div>
        );
    }
}
