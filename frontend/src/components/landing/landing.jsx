import React from 'react';
import './landing.scss';
import { connect } from 'react-redux';

class Landing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
      }
      this.handleClick = this.handleClick.bind(this);
      this.nextSlide = this.nextSlide.bind(this);
      this.prevSlide = this.prevSlide.bind(this);
      this.currentSlide = this.currentSlide.bind(this);
    }

    handleClick() {
        this.props.history.push(`/wagers`)
    }

    prevSlide() {
      let n = this.state.slideIndex - 1;
      if (this.state.slideIndex === 0) {n = 4}
      this.setState({ slideIndex: n });
    }

    nextSlide() {
      let n = this.state.slideIndex + 1;
      if (this.state.slideIndex === 4) {n = 0}
      this.setState({ slideIndex: n });
    }

    currentSlide(n) {
      this.setState({ slideIndex: n });
    }

    displayslides(){
      switch (this.state.slideIndex) {
        case 0:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://images.unsplash.com/flagged/photo-1571358607210-1691cb0ea07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'></img>
                <div className='text'>Bet on Sports</div>
              </div>
          );
        case 1:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://media3.s-nbcnews.com/i/newscms/2020_25/3391395/200619-donald-trump-melania-trump-ew-612p_892c163103f786bf6244792c63bdbfb7.jpg'></img>
                <div className='text'>Bet on Politics</div>
              </div>
          );
        case 2:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://i.ytimg.com/vi/6NgYJxUCAlY/maxresdefault.jpg'></img>
                <div className='text'>Bet on TV Shows</div>
              </div>
          );
        case 3:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://images.unsplash.com/flagged/photo-1552483570-019b7f8119b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'></img>
                <div className='text'>Bet on Weather</div>
              </div>
          );
        case 4:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://images.unsplash.com/photo-1585222515068-7201a72c4181?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'></img>
                <div className='text'>Bet on COVID</div>
              </div>
          );
        default:
          return (
              <div className="slides fade" onClick={() => this.handleClick}>
                <img src='https://images.unsplash.com/flagged/photo-1571358607210-1691cb0ea07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'></img>
                <div className='text'>Bet on Sports</div>
              </div>
          );
      }
    }

    render() {
      return(
        <div className="slider-container">
          {this.displayslides()}
          <a className="prev" onClick={() => this.prevSlide()}>&#10094;</a>
          <a className="next" onClick={() => this.nextSlide()}>&#10095;</a>
          <div className = 'menu'>
            <span className="dot" onClick={() => this.currentSlide(0)}></span>
            <span className="dot" onClick={() => this.currentSlide(1)}></span>
            <span className="dot" onClick={() => this.currentSlide(2)}></span>
            <span className="dot" onClick={() => this.currentSlide(3)}></span>
            <span className="dot" onClick={() => this.currentSlide(4)}></span>
          </div>
        </div>
      )
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
