import React, { Component } from 'react'

// MODULES

// COMPONENTS
import Splash from './splash/Splash'
import ColorPicker from './colorPicker/ColorPicker'

// REDUX
// import { connect } from 'react-redux'

// OTHER

// CSS
import './Landing.css'

class Landing extends Component {

    // LIFECYCLE FUNCS
    constructor(props) { // define state and biind methods
        super(props) // defines props in constructor, reduces bugs
        this.state = {
            selectedColor: ""
        }
        this.setColor = this.setColor.bind(this)
    }

    // componentWillMount() {} // is run before mounting. setState won't trigger re-render. avoid side-effects or subscriptions
    // componentDidMount() {} // is run after mounting. target DOM nodes here. load async data here. 
    // componentWillReceiveProps(nextProps) {} // is run before props changed or parent triggers rerender. use to setState. may run when new props aren't received.
    // shouldComponentUpdate(nextProps, nextState) {} // is run before props or state change triggers rerender. return false to stop component rerender 
    // componentWillUpdate(nextProps, nextState) {} // is run after new props or state are received and comp will rerender. can't call setState
    // componentDidUpdate() {} // is run after initial rerender. operate on DOM. make network requests if state or props changed
    // componentWillUnmount() {} // is run after component unmounts. cancel timers, event listeners, network requests, destroy manually created DOM elements, etc...

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

// REDUX

function mapStateToProps(state) {
    return state
}

// EXPORT

export default Landing

// REDUX EXPORT

// export default connect( mapStateToProps, mapActionsToProps )(Landing)