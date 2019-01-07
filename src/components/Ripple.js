import React, { Component } from 'react';
import './Ripple.css';

const MOVE = 'move';
const DOWN = 'down';
const UP = 'up';

export default class Ripple extends Component {
    state = {
        left: 0,
        top: 0,
        transform: 'scale(0)',
        opacity: '0',
        isActive: false,
        timestamp: 0,
    };

    getMousePosition = e => {
        const x = e.pageX || e.changedTouches[0].pageX;
        const y = e.pageY || e.changedTouches[0].pageY;
        console.log(x, y);
        return {x, y};
    }

    handlePointerDown = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleDown(e);
    }

    handlePointerUp = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleUp(e);
    }

    handlePointerMove = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleMove(e);
    }

    handleDown = e => {
        e.stopPropagation();
        const position = this.getMousePosition(e);
        console.log('down', position);
            this.setState({
                left: position.x - 17,
                top: position.y - 17,
                transform: 'scale(1)',
                opacity: '1',
                isActive: true,
                timestamp: Date.now(),
            });
            if (this.props.recordStatus) {
                this.props.updateRecord({...position, operation: DOWN, target: e.target, timestamp: Date.now()});
            }
        
    };

    handleUp = e => {
        e.stopPropagation();
        console.log('up');
        this.setState({
            opacity: '0',
            transform: 'scale(0)',
            isActive: false,
        });
        if (this.props.recordStatus) {
            const position = this.getMousePosition(e);
            this.props.updateRecord({...position, operation: UP, target: e.target, timestamp: Date.now()});
        }
    };


    handleMove = e => {
        e.stopPropagation();
        if (this.state.isActive) {
            const position = this.getMousePosition(e);
            console.log(position, this.state.left, this.state.top);
            const now = Date.now();
            if (now - this.state.timestamp > 10) {
                this.setState({
                    left: position.x - 17,
                    top: position.y - 17,
                    transform: 'scale(1)',
                    opacity: '1',
                    timestamp: now,
                });

                if (this.props.recordStatus) {
                    this.props.updateRecord({...position, operation: MOVE, target: e.target, timestamp: Date.now()});
                }
            }
        
        }
    };

    render() {
        const left = this.props.record && this.props.isReplaying ? `${this.props.record.left}px` : `${this.state.left}px`;
        const top = this.props.record && this.props.isReplaying ? `${this.props.record.top}px` : `${this.state.top}px`;
        console.log('record',this.props.record);
        return (
            <div
                className="container"
                onPointerDown={this.handlePointerDown}
                onPointerUp={this.handlePointerUp}
                onPointerMove={this.handlePointerMove}
                onTouchStart={this.handleDown}
                onTouchEnd={this.handleUp}
                onTouchMove={this.handleMove}

            >
                <div
                    className="ripple"
                    style={{
                        left: left,
                        top: top,
                        transform: this.state.transform,
                        opacity: this.state.opacity,
                    }}
                />
                {this.props.children}
            </div>
        );
    }
}



