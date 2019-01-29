import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import SocketContext from '../SocketContext';

export default class Dashboard extends Component {
    state = {
        messages: [],
        clear: false,
    };

    static contextType = SocketContext;

    componentDidMount() {
        this.listenRecord();
    }

    listenRecord = () => {
        this.context.on('record', data => {
            let state= {};
            if (!data.isMatch) {
                state = {
                    ...state,
                    isMatch: false
                };
            }
            this.setState(prevState => {
                const messages = prevState.messages.slice(0); // clone
                messages.unshift(data);
                return {
                    ...state,
                    messages,
                };
            });
        });
    }

    constructMessage = () => {
        const result = this.state.messages.map((m, i) => {
            return <div key={i}>
                <span>{m.message.status}</span>
                <span>name: {m.message.name}</span>
                <span>id: {m.message.id}</span>
                {m.message.record ? <span>It should be: {m.message.record}</span> : null}
                {m.message.current ? <span>Current Color: {m.message.current}</span> : null}
            </div>
        });
        return result;
    };

    render() {
        const messages = this.constructMessage();
        return (
            <div className='dashboard'>
                <h1>Dashboard</h1>
                <div className="message_container" >{messages}</div>  
                <Link to="/">Main page</Link>
            </div>
        );
    }
}
