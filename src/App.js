//wrapper component that will contain all other components
//first thing you must import react object that lives in package.json

import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "4eeccc65b4fd1d5f010ac7d9854dc5ab";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if(city && country){


    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
     });
    } else{

    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter the city and country"
     });
    }

  }
  render(){
    return(
      //JSX, Babble converts to normal code, can only return one parent element
      //Can have multiple things inside the parent element
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row" >
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

//Tells the file to make the App component available for other files to import
export default App;
