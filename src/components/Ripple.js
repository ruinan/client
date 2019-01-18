import React, { Component } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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

    circle = React.createRef();

    componentDidUpdate(prevProps) {
        if (prevProps.record !== this.props.record) {
            const left =
                this.props.record && this.props.isReplaying
                ? this.props.record.x - 17
                : this.state.left;
            const top =
                this.props.record && this.props.isReplaying
                    ? this.props.record.y - 17
                    : this.state.top;

            const transform =
                this.props.record && this.props.isReplaying
                    ? (this.props.record.operation === DOWN || this.props.record.operation === MOVE ? `scale(1)`: `scale(0)`)
                    : this.state.transform;

            const opacity =
                this.props.record && this.props.isReplaying
                    ? (this.props.record.operation === DOWN || this.props.record.operation === MOVE ? 1 : 0)
                    : this.state.opacity;

            if (this.props.record && this.props.record.operation === DOWN ) {
                // ReactTestUtils.Simulate.mouseDown(this.props.record.target);
                // JSON.stringify(this.props.record.target);
                console.log(this.props.record.x, this.props.record.y);
                const element = document.elementFromPoint(this.props.record.x, this.props.record.y); // view port
                ReactTestUtils.Simulate.mouseDown(element);
            } else if (this.props.record && this.props.record.operation === UP) {
                // ReactTestUtils.Simulate.mouseUp(this.props.record.target);
                const element = document.elementFromPoint(this.props.record.x, this.props.record.y);// view port
                ReactTestUtils.Simulate.mouseUp(element);
            }
            console.log('record color and props color', this.props.record.color, this.props.color);
            this.props.compareRecord(this.props.record.color, this.props.color);
            this.setState({
                left,
                top,
                transform,
                opacity,
            });
        }
    }

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
        if (this.props.isReplaying) {
            return;
        }
        // refine
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
            console.log('color', this.props.color);
            this.props.updateRecord({
                ...position,
                operation: DOWN,
                timestamp: Date.now() - this.props.startTimestamp,
                color: this.props.color,
            });
        }

    };

    handleUp = e => {
        if (this.props.isReplaying) {
            return;
        }
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
                timestamp: Date.now() - this.props.startTimestamp,
                color: this.props.color,
            });
        }
    };

    handleMove = e => {
        if (this.props.isReplaying) {
            
            return;
        }
        e.stopPropagation();
        if (this.state.isActive) {
            const position = this.getMousePosition(e);
            const now = Date.now();
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
                    timestamp: Date.now() - this.props.startTimestamp,
                    color: this.props.color,
                });
            }
        }
    };

    render () {
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
                        left: this.state.left,
                        top: this.state.top,
                        transform: this.state.transform,
                        opacity: this.state.opacity
                    }}
                    ref={this.circle}
                />
                {this.props.children}
            </div>
        );
    }
}
