import React from 'react';
import { connect } from 'react-redux';
import { fetchWager } from '../../actions/wager_actions';
import { placeWager } from '../../actions/user_actions';

class WagerShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wagerId: this.props.wager.id,
            bettorId: this.props.currentUser.id,
            optionOne: null,
            optionTwo: null
        }
    }

    componentDidMount() {
        this.props.fetchWager(this.props.match.params.wagerId);
    }

    handleClickA(e) {
        e.preventDefault();
        this.setState({optionOne: this.props.wager.wager_choices[0]})
        this.props.placeWager(this.state);
    }

    handleClickB(e) {
        e.preventDefault();
        this.setState({optionTwo: this.props.wager.wager_choices[1]})
        this.props.placeWager(this.state);
    }

    displayWager() {
        const currentWager = this.props.wagers.map((wager, idx) => {
            return (
              <div key={idx} className="wagers-container">
                <div className="wagers-container-top">
                    {wager.title}
                </div>
                <div className="wagers-container-bottom">
                  <div className="bottom-card-left" onClick = {this.handleClickA}>
                    <p>I'm left {wagers.choices[0]}</p>
                  </div>
                  <div className="bottom-card-right" onClick = {this.handleClickB}>
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

const msp = (state, OwnProps) => {
    return {
        errors: state.errors,
        wager: state.entities.wagers[Ownprops.match.params.wager]
    }
}

const mdp = dispatch => {
    return {
        fetchWager: (wagerId) => dispatch(fetchWager(wagerId)),
        placeWager: wager => dispatch(placeWager(wager)),
    }
}

export default connect(msp, mdp)(WagerShow);