import React from 'react';
import { connect } from 'react-redux';
import { fetchWager } from '../../actions/wager_actions';
import { placeWager, fetchUser } from '../../actions/user_actions';
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
      this.props.fetchUser(this.props.currentUserId).then(() => {
        this.props.fetchWager(this.props.match.params.wagerId);
      });
    }

    handleClickA(e) {
        e.preventDefault();
        let betData = Object.assign({}, this.state, {
          "option": this.props.wager.wager_choices[0].option,
        });
        this.props.placeWager(betData).then(() => {
          this.props.history.push(`/users/${this.props.currentUserId}`)
        }).catch(() => {
          this.props.history.push("/wagers");
          alert("Could not place bet!")
        })
    }

    handleClickB(e) {
        e.preventDefault();
        let betData = Object.assign({}, this.state, {
            "option": this.props.wager.wager_choices[1].option,
        });
        this.props.placeWager(betData).then(() => {
          this.props.history.push(`/users/${this.props.currentUserId}`)
        }).catch(() => {
          this.props.history.push("/wagers");
          alert("Could not place bet!")
        });
    }

    toPercent(num) {
       let step1 = (num * 100);
       let step2 = step1.toString().split(".")[0];
       return step2 + "%"
    }

    displayWager() {
       const currentWager = this.props.wager;
       let fatWallet = false;
        if (
          (this.props.user &&
          this.props.user.wallet.Public.currentBalance <= 0) ||
          (currentWager && currentWager.expired)
        ) { fatWallet = true }
          return currentWager ? (
            <>
              <div className="wagershow-container">
                <div className="wagershow-container-top">
                  <h1>{currentWager.title}</h1>
                </div>
                <div className="wagershow-description">
                  {currentWager.description}
                </div>
                {/* {this.props.user.wallet.Public.currentBalance <= 0 &&
                <div className="no-money">
                  Ya busted ya lil' peanut! (Ya don't got no karma in the bank) ¯\_(ツ)_/¯
                </div>
              } */}
                <div className="wagershow-container-bottom">
                  <button
                    className="bottom-card-left"
                    onClick={this.handleClickA}
                    disabled={fatWallet}
                  >
                    <p>
                      {currentWager.wager_choices[0].option}
                      <br />
                      Liklihood to win:{" "}
                      {this.toPercent(
                        currentWager.wager_choices[0].probability
                      )}
                    </p>
                  </button>

                  <button
                    className="bottom-card-right"
                    onClick={this.handleClickB}
                    disabled={fatWallet}
                  >
                    <p>
                      {currentWager.wager_choices[1].option}
                      <br />
                      Liklihood to win:{" "}
                      {this.toPercent(
                        currentWager.wager_choices[1].probability
                      )}
                    </p>
                  </button>

                </div>
              </div>
            </>
          ) : null;
    }

    render() {
        return (
            <div className="show-content-container">
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
        user: state.entities.users[currentUserId],
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
        fetchUser: userId => dispatch(fetchUser(userId))
    }
}

export default connect(msp, mdp)(WagerShow);