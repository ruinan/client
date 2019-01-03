import React from 'react';
import './Ripple.css';
export class Ripple extends React.Component {
    state = {
        styles: {
            top: 0,
            left: 0,
            width: '0',
            height: '0',
        }
    }
    circle = React.createRef();

    handleMouseDown = (event) => {
        event.preventDefault();
        console.log(event.nativeEvent.offsetY, event.nativeEvent.offsetX);
        this.setState({
            styles: {
                top: event.nativeEvent.offsetY - 12.5,
                left: event.nativeEvent.offsetX - 12.5,
            },
        });
    }
    
    render () {
        return (<div className='area' onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
            <div className='circle' ref={this.circle} style={this.state.styles}/>
        </div>);
    }
}
