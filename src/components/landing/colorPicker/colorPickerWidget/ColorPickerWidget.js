import React, { Component } from 'react'



// CSS
import './ColorPickerWidget.css'

class ColorPickerWidget extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs

    }

    // RENDER
    render() {
        return (
            <div className="color-picker-widget">
                <div className="color-box">
                </div>
                <input type="range" min="0" max="360" step="1" value={this.props.hue} onChange={(e)=>this.props.handleHueChange(e.target.value)} />
            </div>
        )
    }
}


// EXPORT
export default ColorPickerWidget
