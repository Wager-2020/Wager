import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/user_actions';

class Leaderboard extends React.Component{
    componentDidMount () {
        this.props.fetchUsers();
    }

    render() {
        return(
            <div>
                <p>leaderboard</p>
            </div>
        )
    }
}

const msp = state => {
    return {
        users: state.entities.users,
    }
}

const mdp = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers({ leaderboard: true }))
    }
}

export default connect(msp,mdp)(Leaderboard);