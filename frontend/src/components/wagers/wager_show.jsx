import React from 'react';
import { connect } from 'react-redux';
import { fetchWager } from '../../actions/wager_actions';
import { placeWager } from '../../actions/user_actions';
import './02-show.scss';

class WagerShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wagerId: this.props.match.params.wagerId,
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
        this.props.placeWager(betData).then(() => {
          this.props.history.push(`/users/${this.props.currentUserId}`)
        })
    }

    handleClickB(e) {
        e.preventDefault();
        let betData = Object.assign({}, this.state, {
            ["option"]: this.props.wager.wager_choices[1].option,
        });
        this.props.placeWager(betData).then(() => {
        this.props.history.push(`/users/${this.props.currentUserId}`)
      })
    }

    toPercent(num) {
       let step1 = (num * 100);
       let step2 = step1.toString().split(".")[0];
       return step2 + "%"
    }

    displayWager() {
       const currentWager = this.props.wager;
        return currentWager ? (
          <div className="wagers-container">
            <div className="wagers-container-top">
              <h1>{currentWager.title}</h1>
              <div className="wager-description">
                {currentWager.description}
              </div>
            </div>
            <div className="wagers-container-bottom">
              <div className="bottom-card-left" onClick={this.handleClickA}>
                <p>
                  {currentWager.wager_choices[0].option}
                  <br />
                  Liklihood to win:{" "}
                  {this.toPercent(currentWager.wager_choices[0].probability)}
                </p>
              </div>
              <div className="bottom-card-right" onClick={this.handleClickB}>
                <p>
                  {currentWager.wager_choices[1].option}
                  <br />
                  Liklihood to win:{" "}
                  {this.toPercent(currentWager.wager_choices[1].probability)}
                </p>
              </div>
            </div>
          </div>
        ) : null;
    }

    render() {

        return (
            <div className="content-container">
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