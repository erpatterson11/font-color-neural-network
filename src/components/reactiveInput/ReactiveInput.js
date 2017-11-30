import React, { Component } from 'react'

import './reactiveInput.css'

export default class ReactiveInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNear: true,
            isHovered: true,
            userInput: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleMouseNear(bool) {
        this.setState({isNear: bool})
    }

    handleMouseHover(bool) {
        this.setState({isHovered: bool})
    }

    handleInputChange(val) {
        this.setState({userInput: val})
    }

    render() {
        const { isNear, isHovered } = this.state
        const nearStyle = isNear ? { transform: "scale(1.1)" } : {}
        // const hoveredStyle = isHovered ? { transform: "scale(1.2)" } : {}
        
        const style = Object.assign({},nearStyle)

        return (
            <div 
                className="reactive-input-container" 
                onMouseEnter={()=>this.handleMouseNear(true)}
                onMouseLeave={()=>this.handleMouseNear(false)}
            >
                <input 
                    className="reactive-input" 
                    style={style} type="text" 
                    required
                    minLength="4"
                    maxLength="19"
                    onMouseEnter={()=>this.handleMouseHover(true)}
                    onMouseLeave={()=>this.handleMouseHover(false)}
                    onChange={e => this.handleInputChange(e.target.value)} />
            </div>
        )
    }
}