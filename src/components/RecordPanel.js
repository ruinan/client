import React from 'react';
import './RecordPanel.css';

export default function RecordPanel(props) {
    const recordFunction = props.isRecording ? props.stopRecord : props.startRecord;
    const replayFunction = props.isReplaying ? props.stopReplay: props.startReplay;
    return (<div className='container'>
        <button className={`${props.isRecording ? 'stop' : 'start'}`} onClick={recordFunction}>{props.isRecording ? 'Stop Record' : 'Start Record'}</button>
        <button className={`${props.isReplaying ? 'stop' : 'start'}`} onClick={replayFunction}>{props.isReplaying ? 'Stop Replay' : 'Start Replay'}</button>
    </div>);
}