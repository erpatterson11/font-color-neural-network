import React, { Component } from 'react'



// CSS
import './Splash.css'

class Splash extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs
        this.state = {}

    }


    // CUSTOM FUNCS

    // RENDER
    render() {
        return (
            <div className="splash-container">
                <p className="splash-header-text">Text Color Neural Network</p> 
            </div>
        )
    }
}

export default Splash
