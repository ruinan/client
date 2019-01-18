import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import SocketContext from '../SocketContext';
import * as API from '../api';
export default class Dashboard extends Component {
    state = {
        messages: [],
        clear: false,
        isMatch: true,
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
        console.log(this.state.messages.length);
        const result = this.state.messages.map((m, i) => {
            return <div key={i} className="message">{`Status: ${m.message.status}   id: ${m.message.id}    name: ${m.message.name}`}</div>;
        });
        return result;
    };

    render() {
        const messages = this.constructMessage();
        console.log('render', messages);

        return (
            <div>
                <h3>Dashboard</h3>
                <div>
                    <div className="message_container">{messages}</div>
                    <Link to="/">Main page</Link>
                </div>
            </div>
        );
    }
}
