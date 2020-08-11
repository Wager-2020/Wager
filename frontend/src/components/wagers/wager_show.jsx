import React from 'react';
import { connect } from 'react-redux';
import { fetchWager } from '../../actions/wager_actions';
import { placeWager } from '../../actions/user_actions';

class WagerShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // wagerId: this.props.wager.id,
            wagerId: this.props.match.params.wagerId,
            // bettorId: this.props.currentUser.id,
            userId: this.props.currentUserId
        }
        this.handleClickA = this.handleClickA.bind(this);
        this.handleClickB = this.handleClickB.bind(this);
    }

    componentDidMount() {
        this.props.fetchWager(this.props.match.params.wagerId);
    }

    handleClickA(e) {
        e.preventDefault();
        let betData = Object.assign({}, this.state, {
          ["option"]: this.props.wager.wager_choices[0].option,
        });
        debugger;
        this.props.placeWager(betData);
    }

    handleClickB(e) {
        e.preventDefault();
        this.setState({optionTwo: this.props.wager.wager_choices[1].option})
        this.props.placeWager(this.state);
    }

    displayWager() {
       const currentWager = this.props.wager;
        return currentWager ? (
            <div className="wagers-container">
            <div className="wagers-container-top">
                {currentWager.title}
            </div>
            <div className="wagers-container-bottom">
                <div className="bottom-card-left" onClick = {this.handleClickA}>
                <p>I'm left {currentWager.wager_choices[0].option}</p>
                </div>
                <div className="bottom-card-right" onClick = {this.handleClickB}>
                <p>I'm Right{currentWager.wager_choices[1].option}</p>
                </div>
            </div>
            </div>
        ) : null;
    }

    render() {

        return (
            <div>
                {this.displayWager()}
            </div>
        )
    }
}

const msp = (state, Ownprops) => {
    const wager = state.entities.wagers[Ownprops.match.params.wagerId];
    const wagerId = wager ? wager.id : undefined;
    const currentUser = state.session.user;
    const currentUserId = currentUser ? currentUser.id : undefined;
    return {
        errors: state.errors,
        wager,
        wagerId,
        currentUser,
        currentUserId
    }
}

const mdp = dispatch => {
    return {
        fetchWager: (wagerId) => dispatch(fetchWager(wagerId)),
        placeWager: wager => dispatch(placeWager(wager)),
    }
}

export default connect(msp, mdp)(WagerShow);