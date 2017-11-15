import React, { Component } from 'react'

// MODULES

// COMPONENTS
import ColorPickerWidget from './colorPickerWidget/ColorPickerWidget'

// REDUX
// import { connect } from 'react-redux'

// OTHER

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

    // componentWillMount() {} // is run before mounting. setState won't trigger re-render. avoid side-effects or subscriptions
    // componentDidMount() {} // is run after mounting. target DOM nodes here. load async data here. 
    // componentWillReceiveProps(nextProps) {} // is run before props changed or parent triggers rerender. use to setState. may run when new props aren't received.
    // shouldComponentUpdate(nextProps, nextState) {} // is run before props or state change triggers rerender. return false to stop component rerender 
    // componentWillUpdate(nextProps, nextState) {} // is run after new props or state are received and comp will rerender. can't call setState
    // componentDidUpdate() {} // is run after initial rerender. operate on DOM. make network requests if state or props changed
    // componentWillUnmount() {} // is run after component unmounts. cancel timers, event listeners, network requests, destroy manually created DOM elements, etc...

    // CUSTOM FUNCS
    handleHueChange(val) {
        this.setState({hue: val})
    }

    handleColorCodeInput(code) {
        
    }

    // RENDER
    render() {
        return (
            <div className="color-picker-container">
                <div className="color-picker-header-text">
                    <p className="color-picker-header-text">What background color do you want to use?</p>
                </div>
                <input className="text-input" type="text" />
                <ColorPickerWidget handleHueChange={this.handleHueChange} />
            </div>
        )
    }
}

// REDUX
function mapStateToProps(state) {
    return state
}

// EXPORT
export default ColorPicker

// REDUX EXPORT
// export default connect( mapStateToProps, mapActionsToProps )(ColorPicker)