import React, { Component } from 'react';
import './Ripple.css';

export default class Ripple extends Component {
    state = {
        left: '0',
        top: '0',
        transform: 'scale(0)',
        opacity: '0',
    };

    handlePointerDown = e => {
        e.stopPropagation();
        const x = e.clientX;
        const y = e.clientY;
        this.setState({
            left: `${x - 17}px`,
            top: `${y - 17}px`,
            transform: 'scale(1)',
            opacity: '1',
        });
    };

    handlePointerUp = e => {
        e.stopPropagation();
        this.setState({
            transform: 'scale(1.2)',
            opacity: '0',
        });
    };
    render() {
        return (
            <div
                className="container"
                onPointerDown={this.handlePointerDown}
                onPointerUp={this.handlePointerUp}
            >
                <div
                    className="ripple"
                    style={{
                        left: this.state.left,
                        top: this.state.top,
                        transform: this.state.transform,
                        opacity: this.state.opacity,
                    }}
                />
            </div>
        );
    }
}
