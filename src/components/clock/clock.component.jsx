import React from 'react';

// css
import './clock.styles.scss'

class Clock extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            date: new Date(),
        }
    }

    componentDidMount = () => {
        this.intervalID = setInterval(() => {
            this.clockTick()
        }, 1000);
    }

    
    clockTick = () => {
        this.setState({date: new Date()})
    }

  render() { 
    const {date, locationError } = this.state
   
    if (locationError) {
        return locationError
    } else {
        return (
            <div className='clock-section'>
              <div className='clock-text'>
                <h4>Date: {date.toLocaleDateString()}</h4>
                <h4>Time: {date.toLocaleTimeString()}</h4>
              </div>
            </div> 
          )
    }
  }
}

export default Clock;