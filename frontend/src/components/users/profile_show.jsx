import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import {fetchWagers} from '../../actions/wager_actions';
import './profile.scss';
import WinLossPieChart from '../sick_graphs/win_loss_pie_chart'

class Profile extends React.Component {

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.userId)
            .then(() => {
                this.props.fetchWagers()
            })
    }

    displayUserBets() {
        const userInfo = this.props.user[this.props.match.params.userId];
        const wagers = this.props.wagers;
        let betTitle = null;
        let amountBet = null;
        let betOption = null;
        if (!userInfo) {
            return null;
        }
        const userBetsLi = userInfo.bets.map((bet, idx) => {
            if (wagers[bet.wager]) {
                betTitle = wagers[bet.wager].title;
                amountBet = bet.amount_bet;
                betOption = bet.option;
            }
            return wagers[bet.wager] ? (
                <div key={idx} className="bets-container">
                    <div className="bets-container-top">
                        <h2>{betTitle}</h2>
                    </div>
                    <div className="bets-container-middle">
                        <p>You wagered {amountBet} karma on</p>
                    </div>
                    <div className="bets-container-bottom">
                        <p>{betOption}</p>
                    </div>
                </div>
            ) : null;
        })
        return userBetsLi;
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
        return (
          <div className="content-container profile-container">
              <div className="header-container">
                {header}
                    <p>Current Karma Balance: {user.wallet.Public.currentBalance}</p>
              </div>
            <div className="profile-basic-info">
              {<div className="win-loss-chart">
                {Object.values(this.props.wagers) && <WinLossPieChart data={data} />}
              </div>}
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
        fetchWagers: () => dispatch(fetchWagers())
    }
}

export default connect(msp, mdp)(Profile);

//note: fetchUser is used instead of currentUser to enable user to check out other user's profile page;