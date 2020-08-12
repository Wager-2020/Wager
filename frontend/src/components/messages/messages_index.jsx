import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../../actions/messages_actions';
import MessageForm from './message_form';
import './message.scss';

class MessagesIndex extends React.Component {

    componentDidMount() {
        this.props.fetchMessages();
    }

    displayMessages() {
        const messagesLis = this.props.messages.map((message) => {  
            return(
                <div key ={message._id}>
                    <div className = 'message-author'> {message.user}</div>
                    <div className="message-item">{message.body}</div>
                </div>
            )
        })
        return messagesLis
    }

    render() {
        return(
            <div className="content-container">
                <MessageForm 
                    currentUser = {this.props.currentUser}
                    createMessage = {this.props.createMessage}
                />
                <div className = 'message-index-container'>
                    {this.displayMessages()}
                </div>
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