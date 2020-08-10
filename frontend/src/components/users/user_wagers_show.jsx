import React from 'react';
import { connect } from 'react-redux';
import { getUserWagers } from '../../actions/user_actions';

class UserWagersShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUserWagers(this.props.match.params.userId)
    }

    showWagers() {
        return(
            <div>

            </div>
        )
    }

    render() {
        return(
            <div>
                <p>User Wagers Show</p>
            </div>
        )
    }
}

export const msp = (state) => {
    return {
        errors: state.errors,
        currentUser: state.session.currentUser,
        wagers: state.entities.wagers
    }
}

const mdp = (dispatch) => {
    return {
        getUserWagers: (userId) => dispatch(getUserWagers(userId))
    }
}

export default connect(msp, mdp)(UserWagersShow);