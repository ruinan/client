import React, { Component } from 'react';
import './Ripple.css';

export default class Ripple extends Component {
    state = {
        left: '0',
        top: '0',
        transform: 'scale(0)',
        opacity: '0',
        isActive: false,
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
            isActive: true,
        });
    };

    handlePointerUp = e => {
        e.stopPropagation();
        this.setState({
            transform: 'scale(1.2)',
            opacity: '0',
            isActive: false,
        });
        setTimeout(() => {
            this.setState({
                transform: 'scale(0)',
            });
        }, 300);
    };

    handlePointerMove = e => {
        e.stopPropagation();
        if (this.state.isActive) {
            console.log('move');
            const x = e.clientX;
            const y = e.clientY;
            this.setState({
                left: `${x - 17}px`,
                top: `${y - 17}px`,
                transform: 'scale(1)',
                opacity: '1',
            });
        }
    };
    render() {
        return (
            <div
                className="container"
                onPointerDown={this.handlePointerDown}
                onPointerUp={this.handlePointerUp}
                onPointerMove={this.handlePointerMove}
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
                {this.props.children}
            </div>
        );
    }
}
