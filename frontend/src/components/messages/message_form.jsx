import React from 'react';
// import {connect} from 'react-redux';
// import { createMessage } from '../../actions/messages_actions'


export default class MessageForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            body: '',
            user: this.props.currentUser
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({body: nextProps.body})
    // }

    handleSubmit(e){
        debugger;
        e.preventDefault();
        let message = {
            user: this.state.user.id,
            body: this.state.body
        };
        this.props.createMessage(message);
        this.setState({body: ''});
    }

    update(){
        return e=> this.setState({
            body: e.currentTarget.value
        })
    }

    render(){
        return (
          <div className="messageform-container">
            <form>
              <input
                type="textarea"
                value={this.state.body}
                onChange={this.update()}
                placeholder="How do you feel about your bet..."
              />
              <button onClick={this.handleSubmit}>Post Message</button>
            </form>
          </div>
        );
    }




}

// const msp = state => {
//     return {
//         currentUser: state.session.user
//     }
// }

// const mdp = dispatch => {
//     return {
//         createMessage: message => dispatch(createMessage(message))
//     }
// }

// export default connect(msp, mdp)(MessageForm)

