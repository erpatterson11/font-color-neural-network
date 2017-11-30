import React, { Component } from 'react'

import './colorCard.css'

export default class  extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {

        const { option, bgColor, text, handleClick } = this.props

        const style = {backgroundColor: bgColor, color: text}

        return (
            <div className="color-card" style={style} onClick={handleClick} >
                <p>Option {option}</p>
            </div>
        )
    }
}