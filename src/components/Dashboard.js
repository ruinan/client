import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component {
    render () {
        return (<div>
            <h3>Dashboard</h3>
            <div>
                <Link to='/'>Main page</Link>

            </div>

        </div>);
    }
}