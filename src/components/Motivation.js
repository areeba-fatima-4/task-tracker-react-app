import React from 'react'

export default class Motivation extends React.Component {
    constructor(props) {
        console.log('Constructor called')
        super(props)

        this.state = {
            randomIndex: Math.floor(Math.random() * 3),
            quotes : [
                {value : "When there is a will there is a way"} , 
                {value : "Now or never"} ,
                {value  : "Believe in yourself"}
            ]
        }

        this.changeQuote = () =>
        this.setState( {randomIndex: Math.floor(Math.random() * 3)} )
    }

    //first lifecycle method
    render() {
        console.log('Rendered')
        return <div>
            <p> Quote of the day </p>
            <p className='add-quote'> {this.state.quotes[this.state.randomIndex].value} </p>
            <button onClick={this.changeQuote} > Next</button>
        </div>
    }

    //after render
    componentDidMount() {
        console.log('Component mounted')
    }

     //on update
     componentDidUpdate() {
        console.log('Component updated')
    }

    //component being taken out of dom
    componentWillUnmount() {
        console.log('Component will unmount')
    }

  
     shouldComponentUpdate(nextProps, nextState) {
        return true // default
        // lets react know if render should be triggered
        // you can modify it to not render again if any prop changes
    }
}