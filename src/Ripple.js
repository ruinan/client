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

    getMousePosition = e => {
        const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        const x = e.pageX || e.clientX + scrollX || e.touches[0].clientX + scrollX;
        const y = e.pageY || e.clientY + scrollY || e.touches[0].clientY + scrollY;
        return {x, y};
    }

    handlePointerDown = e => {
        e.stopPropagation();
        const position = this.getMousePosition(e);
        this.setState({
            left: `${position.x - 17}px`,
            top: `${position.y - 17}px`,
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
           const position = this.getMousePosition(e);
            this.setState({
                left: `${position.x - 17}px`,
                top: `${position.y - 17}px`,
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
                onTouchStart={this.handlePointerDown}
                onTouchEnd={this.handlePointerUp}
                onTouchMove={this.handlePointerMove}
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
