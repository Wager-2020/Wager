import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserWagerLink from '../../util/link_util';
import { AuthRoute } from "../../util/route_util";
import UserWagersShow from './user_wagers_show';

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        debugger;
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
                {this.displayUserInfo()}
                <UserWagerLink
                    component = {UserWagersShow}
                    to ={ `/users/${this.props.user.id}/wagers`}
                    label = 'Check out all wagers made by this user' 
                />
                <AuthRoute
                    exact path = '/users/:userId/wagers'
                    component = {UserWagersShow}
                />
            </div>
        )
    }
}

const msp = (state,ownProps) => {
    debugger;
    return {
        errors: state.errors,
        user: state.session.user
    }
}

const mdp = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId))
    }
}

export default connect(msp, mdp)(Profile);

//note: fetchUser is used instead of currentUser to enable user to check out other user's profile page;