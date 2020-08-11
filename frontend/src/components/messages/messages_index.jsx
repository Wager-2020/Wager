import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/messages_actions';

class MessagesIndex extends React.Component {

    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        return(
            <div>
                <h1>Messages Index</h1>
            </div>
        )
    }
}

const msp = state => {
    debugger;
    return {
        errors: state.errors,
        messages: Object.values(state.entities.messages)
    }
}

const mdp = dispatch => {
    return {
        fetchMessages: () => dispatch(fetchMessages())
    }
}

export default connect(msp, mdp)(MessagesIndex);