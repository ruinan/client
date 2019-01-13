import React, { Component } from 'react';
import Select from 'react-select';
import './RecordPanel.css';

export default class RecordPanel extends Component {

    state = {
        selectOption: null,
        // options: [],
    };

    // componentDidUpdate (prevProps) {
    //     if (prevProps.recordsList !== this.props.recordsList) {
    //         if 
    //     }
    // }

    handleSelectorChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    handleInputChange = (e) => {
        this.props.changeName(e.target.value);
    }
    render() {
        const recordFunction = this.props.isRecording
            ? this.props.stopRecord
            : this.props.startRecord;
        const replayFunction = this.props.isReplaying
            ? this.props.stopReplay
            : this.props.startReplay;

            // const options = [
            //     { value: 'chocolate', label: 'Chocolate' },
            //     { value: 'strawberry', label: 'Strawberry' },
            //     { value: 'vanilla', label: 'Vanilla' }
            //   ];

            console.log(this.props.recordsList);
            const options = this.props.recordsList.map(r => ({
                value: r.id,
                label: r.id,
            }));

              const styles = {
                container: styles => ({
                  ...styles,
                  height: "3rem",
                  margin: "0",
                  padding: "0",
                    width: '70%',
                    marginRight: '1rem',
                    flex: '2 2 100%',
                    outline: 'none',
                }),
                control: styles => ({
                  ...styles,
                  backgroundColor: "white",
                  height: "100%",
                  minHeight: "1rem",
                  borderRadius: '0px',
                  width: '100%',
                  borderColor: 'gray',
                }),
                input: styles => ({ ...styles,  fontSize: '11px', outline: 'none',}),
                dropdownIndicator: styles => ({
                    fontSize: '11px'
                }),
                valueContainer: styles => ({
                    ...styles,
                    height: '100%',
                    width: '80%',
                }),
                outline: 'none'
              };
        return (
            <div className="container">
                <div className='area'>
                    <input type='text' onChange={this.handleInputChange} placeholder='Give record a name' value={this.props.name} className={this.props.name.length > 0 ? '' : 'error'}/>
                    <button
                        className={`${this.props.isRecording ? 'stop' : 'start'}`}
                        disabled={this.props.isReplaying}
                        onClick={recordFunction}
                    >
                        {this.props.isRecording ? 'Stop' : 'Record'}
                    </button>
                    
                </div>
                <div className='area'>
                    <Select
                        styles={styles}
                        value={this.state.selectOption}
                        onChange={this.handleChange}
                        options={options}
                        placeholder='Select a record'
                    />
                    <button
                        className={`${this.props.isReplaying ? 'stop' : 'replay'}`}
                        disabled={this.props.isRecording}
                        onClick={replayFunction}
                    >
                        {this.props.isReplaying ? 'Stop' : 'Replay'}
                    </button>
                </div>
            </div>
        );
    }
}
