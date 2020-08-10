import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserWagerLink from '../../util/link_util';
import { AuthRoute } from "../../util/route_util";

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.userId)
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
        return(
            <div>
                <p>User Profile</p>
                <UserWagerLink
                    component = {UserWagersShow}
                    to ={ `/users/${user.id}/wagers`}
                    label = 'Check out all wagers made by this user' 
                />
                <AuthRoute
                    exact path = '/users/:userId/wagers'
                    component = {UsersWagerShow}
                />
            </div>
        )
    }
}

const msp = (state,ownProps) => {
    return {
        errors: state.errors,
        user: state.entities.users[ownProps.match.params.userId]
    }
}

const mdp = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId))
    }
}

export default connect(msp, mdp)(Profile);

//note: fetchUser is used instead of currentUser to enable user to check out other user's profile page;