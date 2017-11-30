import React, { Component } from 'react'

// COMPONENTS
import ColorCard from './ColorCard/ColorCard'

// OTHER
import axios from 'axios'
import { generateRandomColor, formatHSL } from './../../services/colorService'

// CSS
import './trainer.css'


class Trainer extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { 
        super(props)
        this.state = {
            bgColor: generateRandomColor(),
            black: "#000000",
            white: "#FFFFFF"          
        }

        this.handleClick = this.handleClick.bind(this)
    }

    // CUSTOM FUNCS
    handleClick(fontColor) {
        const trainingData = Object.assign({}, this.state.bgColor, {black: fontColor === this.state.black})
        axios.post('http://localhost:3005/api/color', trainingData)
        this.setState({
            bgColor: generateRandomColor()
        })
    }

    // RENDER
    render() {

        const { bgColor, white, black } = this.state

        const formatedColor = formatHSL(bgColor)

        return (
            <div className="network-trainer-container">
                <ColorCard bgColor={formatedColor} text={white} option="1" handleClick={() => this.handleClick(white)} />
                <ColorCard bgColor={formatedColor} text={black} option="2" handleClick={() => this.handleClick(black)} />
            </div>
        )
    }
}


// EXPORT

export default Trainer
