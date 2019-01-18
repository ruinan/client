import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import SocketContext from '../SocketContext';
import * as API from '../api';
export default class Dashboard extends Component {
    state = {
        messages: [],
        clear: false,
    };

    static contextType = SocketContext;

    componentDidMount() {
        console.log('did mount', this.props.socket);
        const socket = API.socketListener();
        socket.on('record', data => {
            console.log(data);
            if (!data.isMatch) {
                this.setState({
                    isMatch: false,
                });
            }
            this.setState(prevState => {
                const messages = prevState.messages.slice(0);
                messages.unshift(data);
                return {
                    messages,
                };
            });
        });
    }

    constructMessage = () => {
        // console.log(this.state.messages.length);
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
        console.log('render', messages);

        return (
            <div className='dashboard'>
                <h1>Dashboard</h1>
                <div className="message_container" >{messages}</div>  
                <Link to="/">Main page</Link>
            </div>
        );
    }
}
