import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/messages_actions';

class MessagesIndex extends React.Component {

    componentDidMount() {
        this.props.fetchMessages();
    }

    displayMessages() {
        const messagesLis = this.props.messages.map((message) => {  
            return(
                <div className="message-item" key ={message._id}>
                    <p>{message.body}</p>
                </div>
            )
        })
        return messagesLis
    }

    render() {
        return(
            <div className="messages-container">
                <h1>Messages Index</h1>
                {this.displayMessages()}
            </div>
        )
    }
}

const msp = state => {
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