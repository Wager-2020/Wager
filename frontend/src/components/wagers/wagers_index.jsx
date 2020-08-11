import React from 'react';
import { connect } from 'react-redux';
import { fetchWagers } from '../../actions/wager_actions';
import { Link } from 'react-router-dom';

class WagersIndex extends React.Component {

    componentDidMount() {
        this.props.fetchWagers();
    }

    displayWagers() {
      const wagersLis = this.props.wagers.map((wager, idx) => {
            return (
              <div key={idx} className="wagers-container">
                <div className="wagers-container-top">
                  <Link to={`/wagers/${wager._id}`}>{wager.title}</Link>
                </div>
                <div className="wagers-container-bottom">
                  <div className="bottom-card-left">
                    <p>I'm left {wager.wager_choices[0].option}</p>
                  </div>
                  <div className="bottom-card-right">
                    <p>I'm Right{wager.wager_choices[1].option}</p>
                  </div>
                </div>
              </div>
            );
        })
        return wagersLis;
    }

    render() {

        return this.props.wagers ? (
            <div>
                <h1>Wagers Index Here</h1>
                {this.displayWagers()}
            </div>
        ) : null
    }
}

const msp = state => {
    return {
        errors: state.errors,
        wagers: Object.values(state.entities.wagers)
    }
}

const mdp = dispatch => {
    return {
        fetchWagers: () => dispatch(fetchWagers()),
    }
}

export default connect(msp, mdp)(WagersIndex);