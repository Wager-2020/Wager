import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/user_actions';

class Leaderboard extends React.Component{
    componentDidMount () {
        this.props.fetchUsers();
    }

    displayLeaders(){
        const leaders = this.props.users.map(leader => {
            return (
                <div key = {leader._id}>
                    <div> {leader.handle} </div>
                    <div> {leader.totalEarnings}</div>
                </div>
            )
        })
        return leaders
    }

    render() {
        return(
            <div>
                {this.displayLeaders()}
            </div>
        )
    }
}

const msp = state => {
    return {
        users: Object.values(state.entities.users),
    }
}

const mdp = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers({ leaderboard: true }))
    }
}

export default connect(msp,mdp)(Leaderboard);