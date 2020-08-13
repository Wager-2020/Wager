import React from 'react';
import { connect } from 'react-redux';
import { fetchWagers } from '../../actions/wager_actions';
import { Link } from 'react-router-dom';
import './01-index.scss';

class WagersIndex extends React.Component {

    componentDidMount() {
        this.props.fetchWagers();
    }

    displayWagers() {
      const wagersLis = this.props.wagers.map((wager, idx) => {
            return wager.wager_choices ? (
              <div key={idx} className="wagers-container">
                <div
                  className="image-wrap"
                  style={{
                    backgroundImage: `url(https://avatars1.githubusercontent.com/u/69367821?s=400&u=8941ec12fc16cdf3dbc3505336c11a64c19bd2cd&v=4)`,
                  }}
                ></div>
                <div className="wagers-container-bottom">
                  <p>
                    <Link to={`/wagers/${wager._id}`}>{wager.title}</Link>
                  </p>
                </div>
              </div>
            ) : null;
        })
        return wagersLis;
    }

    render() {
        return this.props.wagers ? (
          <div className="content-container">
            <div className = 'grid'>
                {this.displayWagers()}
            </div>
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