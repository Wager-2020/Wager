import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';
import {fetchWagers, fetchWagersUserBetOn} from '../../actions/wager_actions';
import './profile.scss';
import WinLossPieChart from '../sick_graphs/win_loss_pie_chart'

class Profile extends React.Component {

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.userId)
            .then(() => {
                this.props.fetchWagersUserBetOn(this.props.match.params.userId)
            })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.match.params.userId !== this.props.match.params.userId) {
            newProps.fetchUser(newProps.match.params.userId).then(() => {
                newProps.fetchWagersUserBetOn(newProps.match.params.userId)
            });
        }
    }

    displayUserBets() {
        const userInfo = this.props.user[this.props.match.params.userId];
        const wagers = this.props.wagers;
        
        let betTitle = null;
        let amountBet = null;
        let amountWon = null;
        let betOption = null;
        let wagerId = null;
        if (!userInfo) {
            return null;
        }
        const userBetsLi = userInfo.bets.map((bet, idx) => {
            if (wagers[bet.wager]) {
                betTitle = wagers[bet.wager].title;
                amountBet = bet.amount_bet;
                amountWon = bet.amount_won;
                betOption = bet.option;
                wagerId = wagers[bet.wager]._id;
            }
            // console.log(wagerId)
            return wagers[bet.wager] ? (
              <div
                key={idx}
                className="bets-container"
                onClick={()=>this.props.history.push(`/wagers/${wagerId}`)}
                id={this.identifyBetStatus(bet, wagers[bet.wager])}
              >
                <div className="bets-container-top">
                  <h2>{betTitle}</h2>
                </div>
                <div className="bets-container-middle">
                  <p>
                    You wagered {amountBet.toFixed(0)} and won{" "}
                    {amountWon.toFixed(0)} karma on
                  </p>
                </div>
                <div className="bets-container-bottom">
                  <p>{betOption}</p>
                </div>
              </div>
            ) : null;
        })
        return userBetsLi;
    }

    identifyBetStatus(bet, wager) {
        const winId = "bet-status-win"
        const loseId = "bet-status-loss"
        const pendingId = "bet-status-pending"

        let betIsAWinner = false;

        wager.wager_choices.forEach((choice) => {
            if (choice.option === bet.option && choice.winner) {
                betIsAWinner = true;
            }
        });

        if (!wager.expired) {
            return pendingId;
        } else if (betIsAWinner) {
            return winId;
        } else {
            return loseId;
        }
    }
    
    render() {
        const user = this.props.user[this.props.match.params.userId]
        if (!user) return null;
        let data = false;
        if (user) {
            data = [
                { name: 'Wins', value: user.numWins },
                { name: 'Pending Bets', value: user.numPending },
                { name: 'Losses', value: user.numLosses },
            ];
        }
        let header = null;
        
        if (user && this.props.currentUserId === user._id) {
            header = <h1>YOUR BETTING HISTORY</h1>
        } else if (user) {
            header = <h1> {`${user.handle.toUpperCase()}'S BETTING HISTORY`} </h1>
        }

        let noChartData = false
        if (user.numWins === 0 && user.numLosses === 0 && user.numPending === 0) {
            noChartData = true;
        }

        return (
          <div className="content-container profile-container">
              <div className="header-container">
                {header}
                    <p>Current Karma Balance: {user.wallet.Public.currentBalance.toFixed(0)}</p>
              </div>
            <div className="profile-basic-info">
              <div className="win-loss-chart">
                {!noChartData && <WinLossPieChart data={data} />}
              </div>
              {noChartData && 
                <div className="no-bets">
                    <div className="message">Oh no! You don't have any active bets!</div>
                    <Link to="/wagers"><span>IT'S BETTIN' TIME!!!</span></Link>
                    <div className="shrug">¯\_(ツ)_/¯</div>
                </div>
              }
            </div>

            <div className="grid">{this.displayUserBets()}</div>
          </div>
        ); 
    }
}

const msp = (state,ownProps) => {
    return {
        errors: state.errors,
        user: state.entities.users,
        wagers: state.entities.wagers,
        currentUserId: state.session.user.id
    }
}

const mdp = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchWagers: () => dispatch(fetchWagers()),
        fetchWagersUserBetOn: userId => dispatch(fetchWagersUserBetOn(userId))
    }
}

export default connect(msp, mdp)(Profile);

//note: fetchUser is used instead of currentUser to enable user to check out other user's profile page;