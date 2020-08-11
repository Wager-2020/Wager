import React from 'react';
import { connect } from 'react-redux';
import { getUserWagers } from '../../actions/user_actions';

class UserWagersShow extends React.Component {

    componentDidMount() {
        this.props.getUserWagers(this.props.match.params.userId)
    }

    showWagers() {
        const userWagerLis = this.props.wagers.map(wager => {
            return(
                <div>
                    {wager.title}
                    {wager.description}
                    {/* {wager.option}  */}
                </div>
            )
            //?? add in the option user bet on
        })
        return userWagerLis
    }

    render() {
        debugger;
        return(
            <div>
                <h1>Users Placed Bets</h1>
                {this.showWagers()}
            </div>
        )
    }
}

export const msp = (state) => {
    debugger;
    return {
        errors: state.errors,
        currentUser: state.session.currentUser,
        wagers: Object.values(state.entities.wagers)
    }
}

const mdp = (dispatch) => {
    return {
        getUserWagers: (userId) => dispatch(getUserWagers(userId))
    }
}

export default connect(msp, mdp)(UserWagersShow);