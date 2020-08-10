import React from 'react';
import { connect } from 'react-redux';
import { fetchWager } from '../../actions/wager_actions';

class WagerShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchWagers();
    }

    displayWager() {
        const wagersLis = this.props.wagers.map((wager, idx) => {
            return (
              <div key={idx} className="wagers-container">
                <div className="wagers-container-top">
                    {wager.title}
                </div>
                <div className="wagers-container-bottom">
                  <div className="bottom-card-left">
                    <p>I'm left {wagers.choices[0]}</p>
                  </div>
                  <div className="bottom-card-right">
                    <p>I'm Right{wagers.choices[1]}</p>
                  </div>
                </div>
              </div>
            );
        })
        return wagersLis;
    }

    render() {

        return (
            <div>
                {this.displayWager()}
            </div>
        )
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
        fetchWager: (wagerId) => dispatch(fetchWager(wagerId))
    }
}

export default connect(msp, mdp)(WagerShow);