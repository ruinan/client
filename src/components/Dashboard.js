import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
// import * as API from '../api';
// import * as SocketConnection from '../api/socket';
export default class Dashboard extends Component {

    // messages = [];
    // componentDidMount() {
        
    //         // const r = await SocketConnection.receive(this.props.socket);
    //         // console.log(r);
        
    //     // try {
    //     //     const socket = API.socketListener();
    //     //     const data = await SocketConnection.receive(socket);
    //     //     console.log(data);
    //     // } catch (e) {
    //     //     throw e;
    //     // }
    //     // this.setState((prevState) => {
    //     //     const messages = prevState.messages.slice(0);
    //     //     messages.unshift(message);
    //     //     return {
    //     //         messages,
    //     //     };
    //     // });

    //     // this.props.socket.on('message', data => {
    //     //     console.log('this is data from Dashboard', data);
    //     //     // this.messages.push(data);
    //     //     // console.log('messages', this.messages);
    //     //     // this.setState((prevState) => {
    //     //     //         const messages = prevState.messages.slice(0);
    //     //     //         messages.unshift(data);
    //     //     //         return {
    //     //     //             messages,
    //     //     //         };
    //     //     //     });
    //     // });

    //     // this.
    // }

    // constructMessage = () => {
    //     console.log(this.messages.length);
    //     const result = this.messages.map(m => {
    //         return <div className="message">{`Status: ${m.status}   id: ${m.id}    name: ${m.name}`}</div>;
    //     });
    //     return result;
    // };

    render() {
        // const messages = this.constructMessage();
        // console.log('render', messages);
        // console.log('call mounted', this.props.socket);
        
        return (
            <div>
                <h3>Dashboard</h3>
                <div>
                    <div className="message_container">messages</div>
                    <Link to="/">Main page</Link>
                </div>
            </div>
        );
    }
}
