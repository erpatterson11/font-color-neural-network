import React, { Component } from 'react'

// MODULES

// COMPONENTS
import Splash from './splash/Splash'
import ColorPicker from './colorPicker/ColorPicker'

// CSS
import './Landing.css'

class Landing extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { 
        super(props) 
        this.state = {
            selectedColor: ""
        }
        this.setColor = this.setColor.bind(this)
    }

    // CUSTOM FUNCS
    setColor(val) {
        this.setState({selectedColor: val})
    }


    // RENDER
    render() {
        return (
            <div>
                <Splash />
                <ColorPicker />           
            </div>
        )
    }
}


// EXPORT

export default Landing