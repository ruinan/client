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
    };

    // componentDidUpdate(prevProps) {
    //     if (prevProps.record !== this.props.record) {
    //         console.log('mount', this.props.record);
    //     }
    // }
    circle = React.createRef();
    getMousePosition = e => {
        const x = e.pageX || e.changedTouches[0].pageX;
        const y = e.pageY || e.changedTouches[0].pageY;
        return { x, y };
    };

    handlePointerDown = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleDown(e);
    };

    handlePointerUp = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleUp(e);
    };

    handlePointerMove = e => {
        if (e.pointerType === 'touch') {
            return;
        }
        this.handleMove(e);
    };

    handleDown = e => {
        e.stopPropagation();
        const position = this.getMousePosition(e);
        this.setState({
            left: position.x - 17,
            top: position.y - 17,
            transform: 'scale(1)',
            opacity: '1',
            isActive: true,
        });
        if (this.props.isRecording) {
            this.props.updateRecord({
                ...position,
                operation: DOWN,
                target: e.target,
                timestamp: Date.now() - this.props.startTimestamp,
            });
        }
    };

    handleUp = e => {
        e.stopPropagation();
        this.setState({
            opacity: '0',
            transform: 'scale(0)',
            isActive: false,
        });
        if (this.props.isRecording) {
            const position = this.getMousePosition(e);
            this.props.updateRecord({
                ...position,
                operation: UP,
                target: e.target,
                timestamp: Date.now() - this.props.startTimestamp,
            });
        }
    };

    handleMove = e => {
        e.stopPropagation();
 
        if (this.state.isActive) {
            console.log('move');
            const position = this.getMousePosition(e);
            const now = Date.now();
            // setInterval(() => {
            //     this.setState({
            //         left: position.x - 17,
            //         top: position.y - 17,
            //         transform: 'scale(1)',
            //         opacity: '1',
            //         // timestamp: now,
            //     });
            // }, 10);

            // if (now - this.state.timestamp > 10) { // 10ms sampling

                this.setState({
                    left: position.x - 17,
                    top: position.y - 17,
                    transform: 'scale(1)',
                    opacity: '1',
                    timestamp: now,
                });

                if (this.props.isRecording) {
                    this.props.updateRecord({
                        ...position,
                        operation: MOVE,
                        target: e.target,
                        timestamp: Date.now() - this.props.startTimestamp,
                    });
                }
            // }
        }
    };

    render() {
        const left =
            this.props.record && this.props.isReplaying
                ? `${this.props.record.x}px`
                : `${this.state.left}px`;
        const top =
            this.props.record && this.props.isReplaying
                ? `${this.props.record.y}px`
                : `${this.state.top}px`;

        const transform =
            this.props.record && this.props.isReplaying
                ? (this.props.record.operation === DOWN || this.props.record.operation === MOVE ? `scale(1)`: `scale(0)`)
                : this.state.transform;

        const opacity =
            this.props.record && this.props.isReplaying
                ? (this.props.record.operation === DOWN || this.props.record.operation === MOVE ? 1 : 0)
                : this.state.opacity;

        if (this.props.record && this.props.record.operation === DOWN ) {
            // this.props.record.target.onMouseDown();
            console.log(this.props.record.target);
            this.props.record.target.click();
        } else if (this.props.record && this.props.record.operation === UP) {
            // this.props.record.target.onMouseUp();
            console.log(this.props.record.target);
            this.props.record.target.click();
        }

        console.log(
            'ripple',
            this.props.record,
            this.props.isReplaying,
            left,
            top,
            transform,
            opacity,
        );
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
                        left,
                        top,
                        transform,
                        opacity,
                    }}
                    ref={this.circle}
                />
                {this.props.children}
            </div>
        );
    }
}
