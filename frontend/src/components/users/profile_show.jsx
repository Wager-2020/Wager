import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import {fetchWagers} from '../../actions/wager_actions';
// import {Link} from 'react-router-dom';

class Profile extends React.Component {

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.userId);
        this.props.fetchWagers();
    }

    displayUserInfo() {
        const userInfo = this.props.user[this.props.match.params.userId];
        const wagers = this.props.wagers;
        return userInfo ? (
            <div className="user-profile-container">
                {userInfo.handle}
                {userInfo.bets.map(bet => {
                    return wagers[bet.wager] ? (
                        <div className = 'user-bets-container' key = {bet._id}>
                            <div> {wagers[bet.wager].title} </div>
                            <div> {wagers[bet.wager].description} </div>
                            <div> {bet.amount_bet}</div>
                            <div> {bet.option}</div>
                        </div>
                        ) : null;
                })}
            </div>
        ) : null;
    }
    
    render() {
        return (
          <div>
            <h1>Profile Profile Profile!</h1>
            {this.displayUserInfo()}
            {/* <Link to={`bets/${this.props.user._id}`}>View Users Placed Bets</Link> */}
          </div>
        ) 
    }
}

const msp = (state,ownProps) => {
    return {
        errors: state.errors,
        user: state.entities.users,
        wagers: state.entities.wagers
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