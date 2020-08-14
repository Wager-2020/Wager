import React from 'react';
import { connect } from 'react-redux';
import {createWager} from '../../actions/wager_actions'

class WagerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.currentUser,
            title: '',
            description: '',
            due_date: new Date(),
            wager_choiceA: '',
            wager_choiceB: '',
            wager_choices: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
            wager_choices: [
                { option: this.state.wager_choiceA },
                { option: this.state.wager_choiceB },
            ]
        });
        this.props.createWager(this.state)
            .then(()=> this.props.history.push('/wagers'))
    }

    update(field){
        return e => this.setState ({
            [field]: e.currentTarget.value,
        })
    }


    render(){
        return(
            <div className = 'wagerForm_Container'>
                <form className = 'wagerForm'>
                    <input
                        type='text'
                        value = {this.state.title}
                        placeholder='Please enter a title'
                        className = 'wagerform-title'
                        onChange = {this.update('title')}
                    />
                    <input
                        type='text'
                        value = {this.state.description}
                        placeholder='Please enter a description'
                        className = 'wagerform-description'
                        onChange = {this.update('description')}
                    />
                    <input  
                        type = 'date'
                        value = {this.state.due_date}
                        className = 'wagerform-duedate'
                        onChange = {this.update('due_date')}
                    />
                    <input
                        type='text'
                        value = {this.state.wager_choices[0]}
                        placeholder='Please enter the first choice'
                        className = 'wagerform-choiceA'
                        onChange = {this.update('wager_choiceA')}
                    />
                    <input
                        type='text'
                        value = {this.state.wager_choices[1]}
                        placeholder='Please enter the second choice'
                        className = 'wagerform-choiceB'
                        onChange = {this.update('wager_choiceB')}
                    />
                    <button onClick = {this.handleSubmit}>Create a Wager </button>
                </form> 
            </div>
        )
    }
}

const msp = state => {
    return {
        wager: state.entities.wager,
        currentUser: state.session.user,
    }
}

const mdp = dispatch => {
    return {
        createWager: wager => dispatch(createWager(wager)),
    }
}

export default connect(msp, mdp)(WagerForm);

