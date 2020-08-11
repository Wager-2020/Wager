import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import {Link} from 'react-router-dom';
class Profile extends React.Component {

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.userId);
    }

    displayUserInfo() {
        const userInfo = this.props.user;
        return(
            <div className="user-profile-container">
                {userInfo.handle}
            </div>
        )
    }
    
    render() {
        return (
          <div>
            <h1>Profile Profile Profile!</h1>
            {this.displayUserInfo()}
            {/* <Link to={`bets/${this.props.user._id}`}>View Users Placed Bets</Link> */}
          </div>
        );
    }
}

const msp = (state,ownProps) => {
    return {
        errors: state.errors,
        user: state.entities.users
    }
}

const mdp = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId))
    }
}

export default connect(msp, mdp)(Profile);

//note: fetchUser is used instead of currentUser to enable user to check out other user's profile page;