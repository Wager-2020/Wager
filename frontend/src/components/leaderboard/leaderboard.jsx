import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/user_actions';
import './leaderboard.scss'

class Leaderboard extends React.Component{
    componentDidMount () {
        this.props.fetchUsers();
    }

    displayLeaders(){
        const sorted = this.props.users.sort((a,b)=> b.totalEarnings - a.totalEarnings)
        const leaders = sorted.map(leader => {
            return (
                <div key = {leader._id} className = 'leader-item'>
                    <div> {leader.handle} </div>
                    <div> {leader.totalEarnings.toFixed(0)}</div>
                </div>
            )
        })
        return leaders
    }



    render() {
        return(
            <div className = 'leader-board-container'>
                <span> Karma Kings and Queens </span>
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
        fetchUsers: () => dispatch(fetchUsers({leaderboard: true, }))
    }
}

export default connect(msp,mdp)(Leaderboard);