import React from 'react';
import {connect} from 'react-redux';


class MessageForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            body: '',
            user: this.props.currentUser
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({body: nextProps.body})
    }

    handleSubmit(e){
        e.preventDefault();
        let post = {
            body: this.state.body
        };
        this.props.createPost(post);
        this.setState({body: ''})
    }

    update(){
        return e=> this.setState({
            body: e.currentTarget.value
        })
    }

    render(){
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <input
                        type = 'textarea'
                        value = {this.state.body}
                        onChange = {this.update()}
                        placeholder ='How do you feel about your bet...'
                    />
                </form>
            </div>
        )
    }




}

const msp = state => {
    return {
        currentUser: state.session.user,
        newPost: state.posts.new
    }
}

const mdp = dispatch => {
    return {
        createPost: post => dispatch(createPost(post))
    }
}

export default connect(msp, mdp)(MessageForm)

