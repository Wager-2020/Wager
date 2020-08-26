import React from 'react';
import { withRouter } from 'react-router-dom';
import './login-signup.scss';

import DemoLoginButton from './demo_login_button'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
  }


  render() {
    return (
      <div className="login-container">
        <div className="companyName"></div>
        <div className="header">
          <div
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Leet<span>Wagers</span>
          </div>
        </div>
        <br />
        <form onSubmit={this.handleSubmit} className="login">
          <input
            type="text"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email"
          />
          <div className = 'error-messages'>{this.state.errors.email}</div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"
          />
          <div className = 'error-messages'>{this.state.errors.password}</div>

          <input type="submit" value="Submit" />

          <div className="login-signup-switch">
            or{" "}
            <span
              onClick={() => {
                this.props.history.push("/signup");
              }}
            >
              {" "}
              &nbsp; Sign Up?
            </span>
          </div>
          <DemoLoginButton signup={this.props.signup} />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);