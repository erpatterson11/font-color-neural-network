import React, { Component } from 'react'



// CSS
import './sLPickerWidget.css'

class SLPickerWidget extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs

    }

    componentDidMount() {
        const { hue } = this.props
        const width = 400
        const height = 150
        const canv = this.canvas
        canv.width = width
        canv.height = height

        const ctx = canv.getContext('2d')
        ctx.globalCompositeOperation = 'overlay'

        const satGrad = ctx.createLinearGradient(0,0,width,0)
        satGrad.addColorStop(0,`hsl(${hue},0%,50%)`)
        satGrad.addColorStop(1, `hsl(${hue},100%,50%)`)
        ctx.fillStyle = satGrad
        ctx.fillRect(0,0,width,height)

        const lightGrad = ctx.createLinearGradient(0,0,0,height)
        lightGrad.addColorStop(0,"white")
        lightGrad.addColorStop(1,"black")
        ctx.fillStyle = lightGrad
        ctx.fillRect(0,0,width,height)

        console.log(ctx)
    }

    // RENDER
    render() {

        const { hue } = this.props

        const satStyle = {
            background: `linear-gradient(to right, hsl(${hue},0%,50%), hsl(${hue},100%,50%))`
        }
        const lightStyle = {
            background: `linear-gradient(to bottom, hsl(${hue},100%,100%), transparent,hsl(${hue},100%,0%))`
        }

        return (
            // <div className="sat-light-picker-widget" style={satStyle}>
            //     <div className="lightness-picker" style={lightStyle}>
            //     </div>
            // </div>
            <canvas ref={ref => this.canvas = ref}/>
        )
    }
}


// EXPORT
export default SLPickerWidget
