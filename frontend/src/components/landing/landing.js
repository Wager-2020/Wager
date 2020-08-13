import React from 'react';
import './landing.scss';

class Landing extends React.Component {

    handleClick(){
        this.props.history.push(`/wagers`)
    }

    render(){
        return (
          <div className="slider-container">
            <div className="menu">
              <label for="slide-dot-1"></label>
              <label for="slide-dot-2"></label>
              <label for="slide-dot-3"></label>
              <label for="slide-dot-4"></label>
              <label for="slide-dot-5"></label>
            </div>

            <input id="slide-dot-1" type="radio" name="slides"></input>
            <div className="slide slide-1"></div>
            <input id="slide-dot-2" type="radio" name="slides"></input>
            <div className="slide slide-2"></div>
            <input id="slide-dot-3" type="radio" name="slides"></input>
            <div className="slide slide-3"></div>
            <input id="slide-dot-4" type="radio" name="slides"></input>
            <div className="slide slide-4"></div>
            <input id="slide-dot-5" type="radio" name="slides"></input>
            <div className="slide slide-5"></div>
          </div>
        );
    }
}


export default Landing;
