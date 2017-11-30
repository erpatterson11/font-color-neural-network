import React, { Component } from 'react'

// MODULES

// COMPONENTS
import ColorPickerWidget from './colorPickerWidget/ColorPickerWidget'
import SaturationLighnessPickerWidget from './sLPickerWidget/SLPickerWidget'
import ReactiveInput from './../../reactiveInput/ReactiveInput'


// CSS
import './ColorPicker.css'

class ColorPicker extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs
        this.state = {
            hue: 0,
            saturation: 0,
            lightness: 0
        }
        this.handleHueChange = this.handleHueChange.bind(this)

    }

    // CUSTOM FUNCS
    handleHueChange(val) {
        this.setState({hue: val})
    }

    handleColorCodeInput(code) {
        
    }

    // RENDER
    render() {

        const { hue } = this.state

        const style = {background: `hsl(${hue}, 100%, 50%)`}

        return (
            <div className="color-picker-container" style={style}>
                <div className="color-picker-header-text">
                    <p className="color-picker-header-text">What background color do you want to use?</p>
                </div>
                <ReactiveInput />
                <ColorPickerWidget hue={hue} handleHueChange={this.handleHueChange} />
                <SaturationLighnessPickerWidget hue={hue} />
            </div>
        )
    }
}

// EXPORT
export default ColorPicker
