import React from 'react';
import Weather from './components/weather/weather.component'
import './App.scss';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      
    }
  }

  componentDidMount = () => {
    
  }  

  render() {
    
    return (
        <>
        <Weather />
        </>
    );
  }
  
}

export default App;
