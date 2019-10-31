/* eslint-disable no-unreachable */
import React from 'react'
import './weather.styles.scss'
import axios from 'axios'
import Clock from '../clock/clock.component'

// icons
import sun from '../../../src/img/icons/Sun.png'
import snow from '../../../src/img/icons/Snowflake.png'
import moon from '../../../src/img/icons/Moon.png'
import rain from '../../../src/img/icons/Cloud-Rain.png'
import sleet from '../../../src/img/icons/Cloud-Snow.png'
import wind from '../../../src/img/icons/Wind.png'
import fog from '../../../src/img/icons/Cloud-Fog.png'
import cloudy from '../../../src/img/icons/Cloud.png'
import partlyCloudy from '../../../src/img/icons/Cloud-Sun.png'
import partlyCloudyNight from '../../../src/img/icons/Cloud-Moon.png'
import hail from '../../../src/img/icons/Cloud-Hail.png'
import tornado from '../../../src/img/icons/Tornado.png'
import thunderstorm from '../../../src/img/icons/Cloud-Lightning.png'

// Backgrounds
import sunnybg from '../../../src/img/backgrounds/sunny.png'
import nightbg from '../../../src/img/backgrounds/night.jpg'
import cloudybg from '../../../src/img/backgrounds/cloudy.jpg'
import rainbg from '../../../src/img/backgrounds/rain.jpg'
import snowbg from '../../../src/img/backgrounds/snow.jpg'
import windybg from '../../../src/img/backgrounds/windy.png'
import fogbg from '../../../src/img/backgrounds/fog.jpg'
import cloudyNightbg from '../../../src/img/backgrounds/cloudy-night.jpg'
import thunderstormbg from '../../../src/img/backgrounds/thunderstorm.jpg'
import tornadobg from '../../../src/img/backgrounds/tornado.jpg'

class Weather extends React.Component {
    constructor() {
        super()
        this.state = {
            latitude: null,
            longitude: null,
            locationError: null,
            date: new Date(),
            weatherInfo: null
        }
    }

    componentDidMount = () => {
             window.navigator.geolocation.getCurrentPosition(position => {
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
                this.getWeatherData()
                },(error => {
                this.setState({ locationError: error.message })
            })
        );
           
    }
    
    getWeatherData = async () => {
        try{
            const { latitude, longitude } = this.state
            const response = await axios.get('https://weather-now-backend.herokuapp.com/fetch/dark-sky', {headers:{latitude, longitude}})
            const weatherData = response.data
            this.setState({weatherInfo: weatherData})
        } catch (error) {
            console.log(error);
            
        }
    }
    getIcon = () => {
        if (this.state.weatherInfo !== null) {
            switch (this.state.weatherInfo.currently.icon) {
                case 'clear-day':
                     return { icon: sun, bg: sunnybg };
                     break;
                 case 'clear-night':
                    return { icon: moon, bg: nightbg };
                     break;
                 case 'rain':
                    return { icon: rain, bg: rainbg };
                     break;
                 case 'snow':
                    return { icon: snow, bg: snowbg };
                     break;
                 case 'sleet':
                    return { icon: sleet, bg: rainbg };
                     break;
                 case 'wind':
                    return { icon: wind, bg: windybg };
                     break;
                 case 'fog':
                    return { icon: fog, bg: fogbg };
                     break;
                 case 'cloudy':
                    return { icon: cloudy, bg: cloudybg };
                     break;
                 case 'partly-cloudy-day':
                    return { icon: partlyCloudy, bg: cloudybg };
                     break;
                 case 'partly-cloudy-night':
                    return { icon: partlyCloudyNight, bg: cloudyNightbg }
                     break;
                 case 'hail':
                    return { icon: hail, bg: rainbg }
                     break;
                 case 'tornado':
                    return { icon: tornado, bg: tornadobg }
                     break;
                 case 'thunderstorm':
                    return { icon: thunderstorm, bg: thunderstormbg }
                     break;
                default:
                    break;
            }
        }
      
    }

    render() {
        const { latitude, weatherInfo } = this.state
        console.log(weatherInfo)
        
        if (weatherInfo) {
            return (
                <div className='weather-app' >
                    <div className='background-image' style={{backgroundImage: `url(${latitude ? this.getIcon().bg : null})`}}></div>
                    <div className='information-section'>
                        <div className='weather-header'>
                            <h1>Weather for {weatherInfo.timezone}</h1>
                            <Clock />
                        </div>
                        <div className='current-weather'>
                            <div className='temp-icon'>
                                <img src={latitude ? this.getIcon().icon : null} alt="weather icon" className='icon'></img>
                                <h2 className='temp'>{weatherInfo.currently.temperature}&#176;</h2>
                            </div>
                            <h3>{weatherInfo.currently.summary}</h3>
                        </div>
                        <div className='extended-info'>
                            <h3>Wind Speed: {weatherInfo.currently.windSpeed}</h3>
                            <h3>Wind Gust: {weatherInfo.currently.windGust}</h3>
                            <h3>Uv Index: {weatherInfo.currently.uvIndex}</h3>
                            <h3>Humidity: {weatherInfo.currently.humidity}</h3>
                        </div>
                        <p className='credit'><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a></p>
                    </div>
                </div>     
            )
        } else {
            return (
                <h1>Getting Weather Data..</h1>
            )
        }
        
        
    }
}

export default Weather