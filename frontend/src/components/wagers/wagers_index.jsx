import React from 'react';
import { connect } from 'react-redux';
import { fetchWagers } from '../../actions/wager_actions';

class WagersIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchWagers();
    }

    displayWagers() {
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
                {this.displayWagers()}
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
        fetchWagers: () => dispatch(fetchWagers()),
    }
}

export default connect(msp, mdp)(WagersIndex);