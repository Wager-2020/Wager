import React from 'react';
import faker from 'faker';

class DemoLoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let _demoUser = {
      handle: faker.internet.userName(),
      email: `${(Math.random() * 10000000000000000)}${faker.internet.email()}`,
      password: 'password',
      password2: 'password'
    };
    this.props.signup(_demoUser);
  }


  render() {
    return (
      <button 
        className="demo-login"
        onClick={this.handleSubmit}>
        Demo Login
      </button>
    );
  }
}

export default DemoLoginButton;