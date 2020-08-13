import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/user_actions';
import './leaderboard.scss'
import { sortUsers, SORT_BY_NUM_BETS_PLACED, SORT_BY_EARNINGS, SORT_BY_NUM_WINS, SORT_BY_NUM_LOSSES } from '../../util/sorting_util';

class Leaderboard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentSort: SORT_BY_EARNINGS,
            hasMounted: false
        }
        
    }

    componentDidMount () {
        let that = this;
        this.props.fetchUsers(this.state.currentSort).then(() => {
            that.setState({ hasMounted: true });
        });
    }

    displayLeaders(){
        const sorted = this.props.users ? sortUsers(this.props.users, this.state.currentSort) : [];
        const leaders = sorted.map(leader => {
            return (
                <div key = {leader._id} className = 'leader-item' onClick={() =>
                this.props.history.push(`/users/${leader._id}`)}>
                    <div className = 'leader-handle'> {leader.handle} </div>
                    <div className="leader-stats">
                        {this.currentSortValue(leader)}
                    </div>
                </div>
            )
        })
        return leaders;
    }

    currentSortValue(user) {
        switch(this.state.currentSort) {
            case SORT_BY_EARNINGS:
                return user.totalEarnings.toFixed(0);
            case SORT_BY_NUM_BETS_PLACED:
                return (user.numWins + user.numLosses + user.numPending);
            case SORT_BY_NUM_WINS:
                return user.numWins;
            case SORT_BY_NUM_LOSSES:
                return user.numLosses;
            default:
                return "BLAAAAAHHH";
        }
    }

    changeSort(sortingMethod) {
        return e => {
            this.props.fetchUsers(sortingMethod).then(() => {
                this.setState({ currentSort: sortingMethod });
            })
        };
    }

    render() {
        return this.state.hasMounted ? (
            <div className = 'leader-board-container'>
                <span> KARMA <br/> KINGS AND QUEENS </span>
                <div className='leader-sort'>
                    <button onClick={this.changeSort(SORT_BY_EARNINGS)}>
                        KARMA
                    </button>

                    <button onClick={this.changeSort(SORT_BY_NUM_BETS_PLACED)}>
                        BETS COUNT
                    </button>

                    <button onClick={this.changeSort(SORT_BY_NUM_WINS)}>
                        BETS WON
                    </button>

                    <button onClick={this.changeSort(SORT_BY_NUM_LOSSES)}>
                        BETS LOST
                    </button>
                </div>
                {this.displayLeaders()}
            </div>
        ) : null;
    }
}

const msp = state => {
    return {
        users: Object.values(state.entities.users),
    }
}

const mdp = dispatch => {
    return {
        fetchUsers: (sortingMethod) => dispatch(fetchUsers({ 
            leaderboard: true, sortingMethod 
        }))
    }
}

export default connect(msp,mdp)(Leaderboard);