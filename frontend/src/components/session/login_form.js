import React from 'react';
import { withRouter } from 'react-router-dom';
import './login-signup.scss';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
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


  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-container">
        <div className="companyName"></div>
        <div className="header">
          <div onClick={() => {
            this.props.history.push("/");
          }}>
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
          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"
          />
          <input type="submit" value="Submit" />

          <div className="login-signup-switch">
            or <span onClick={() => {
              this.props.history.push("/signup");
            }}>Sign Up?</span>
          </div>

          {this.renderErrors()}
        </form>
        {/* <div className="signup-hyperlink">
            <Link to={`/signup`}> or Sign up</Link>
          </div> */}
      </div>
    );
  }
}

export default withRouter(LoginForm);