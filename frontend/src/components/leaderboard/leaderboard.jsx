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
                hey this renders!
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
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(msp,mdp)(Leaderboard);