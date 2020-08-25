import React from 'react';
import { connect } from 'react-redux';
import {createWager} from '../../actions/wager_actions';
import "./create-wager.scss";

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
          }, () => {
            this.props.createWager(this.state).then(()=> this.props.history.push('/wagers'));
          });
    }

    update(field){
        return e => this.setState ({
            [field]: e.currentTarget.value,
        })
    }


    render(){
        return (
          <div className="wager-form-container">
            <form className="wagerForm">
              <h1 className="form-label">Wager Title:</h1>
              <input
                type="text"
                value={this.state.title}
                placeholder="Please enter a title"
                className="create-wager-input"
                onChange={this.update("title")}
              />
              <br />
              <br />
              <h1 className="form-label">Wager Description:</h1>
              <input
                type="text"
                value={this.state.description}
                placeholder="Please enter a description"
                className="create-wager-input"
                onChange={this.update("description")}
              />
              <br />
              <br />
              <h1 className="form-label">Due Date:</h1>
              <input
                type="date"
                value={this.state.due_date}
                className="create-wager-input"
                onChange={this.update("due_date")}
              />
              <br />
              <br />
              <h1 className="form-label">Enter Option One:</h1>
              <input
                type="text"
                value={this.state.wager_choiceA}
                placeholder="Please enter the first choice"
                className="create-wager-input"
                onChange={this.update("wager_choiceA")}
              />
              <br />
              <br />
              <h1 className="form-label">Enter Option Two:</h1>
              <input
                type="text"
                value={this.state.wager_choiceB}
                placeholder="Please enter the second choice"
                className="create-wager-input"
                onChange={this.update("wager_choiceB")}
              />
              <br />
              <br />
              <button
                onClick={this.handleSubmit}
                className="create-wager-button"
              >
                Create a Wager
              </button>
            </form>
          </div>
        );
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

