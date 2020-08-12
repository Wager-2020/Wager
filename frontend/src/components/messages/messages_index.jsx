import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../../actions/messages_actions';
import MessageForm from './message_form';

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
                <MessageForm 
                    currentUser = {this.props.currentUser}
                    createMessage = {this.props.createMessage}
                />
                <h1>Messages Index</h1>
                {this.displayMessages()}
            </div>
        )
    }
}

const msp = state => {
    return {
        errors: state.errors,
        messages: Object.values(state.entities.messages),
        currentUser: state.session.user
    }
}

const mdp = dispatch => {
    return {
      fetchMessages: () => dispatch(fetchMessages()),
      createMessage: (message) => dispatch(createMessage(message)),
    };
}

export default connect(msp, mdp)(MessagesIndex);