import React from 'react';
import './landing.scss';
import { connect } from 'react-redux';

class Landing extends React.Component {
    handleClick(){
        this.props.history.push(`/wagers`)
    }

    render(){
        return (
          <div className="slider-container">
            <div className="menu">
              <label htmlFor="slide-dot-1"></label>
              <label htmlFor="slide-dot-2"></label>
              <label htmlFor="slide-dot-3"></label>
              <label htmlFor="slide-dot-4"></label>
              <label htmlFor="slide-dot-5"></label>
            </div>

            <input id="slide-dot-1" type="radio" defaultChecked />
            <div className="slide slide-1" onClick = {this.handleClick.bind(this)}></div>
            <input id="slide-dot-2" type="radio" />
            <div className="slide slide-2"></div>
            <input id="slide-dot-3" type="radio" />
            <div className="slide slide-3"></div>
            <input id="slide-dot-4" type="radio" />
            <div className="slide slide-4"></div>
            <input id="slide-dot-5" type="radio" />
            <div className="slide slide-5"></div>
          </div>
        );
    }
}

const msp = state => {
    return {
    }
}

const mdp = dispatch => {
    return {
    }
}

export default connect(msp, mdp)(Landing);
