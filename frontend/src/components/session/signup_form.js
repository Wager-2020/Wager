import React from 'react';
import { withRouter } from 'react-router-dom';
import "./login-signup.scss";
import DemoLoginButton from './demo_login_button'


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); 
  }


  render() {
    return (
      <div className="signup-form-container">
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
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <div className="error-messages">{this.state.errors.email}</div>
            <input
              type="text"
              value={this.state.handle}
              onChange={this.update("handle")}
              placeholder="Handle"
            />
            <div className="error-messages">{this.state.errors.handle}</div>
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <div className="error-messages">{this.state.errors.password}</div>
            <input
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <div className="error-messages">{this.state.errors.password}</div>
            <br />
            <input type="submit" value="Submit" />

            <div className="login-signup-switch">
              or{" "}
              <span
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                {" "}
                &nbsp; Login?
              </span>
            </div>
          </div>
          <DemoLoginButton signup={this.props.signup} />
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);