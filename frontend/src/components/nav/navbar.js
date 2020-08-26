import React from 'react';
import Select from "react-select";
import './navbar.scss'
import SearchBarContainer from './searchbar_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption){
    if (selectedOption.value === "home") {
      this.props.history.push("/");
    }  else if (selectedOption.value === "profile") {
      this.props.history.push(`/users/${this.props.user.id}`);
    } else if (selectedOption.value === "logout") {
      this.props.logout().then(() => {
        this.props.history.push('/login');
      });
    } else {
      this.props.history.push(`/${selectedOption.value}`);
    }
  };

  logout() {
    if (this.props.logout) {
      this.props.logout();
    }
  }

  render() {
    let options = null;
    if (this.props.loggedIn) {
      options = [
        { value: "home", label: "home" },
        { value: "wagers", label: "wagers" },
        { value: "messages", label: "messages" },
        { value: "leaderboard", label: "leaderboard" },
        { value: "profile", label: "profile" },
        { value: "wagers/new", label: "create wager"},
        { value: "logout", label: "logout" },
      ];
    } else {
      options = [
        { value: "home", label: "home" },
        { value: "wagers", label: "wagers" },
        { value: "messages", label: "messages" },
        { value: "leaderboard", label: "leaderboard" },
        { value: "signup", label: "signup" },
        { value: "login", label: "login" },
      ];   
    }
    const selectedOption = null;
    return (
      <div className="nav-bar-header">
        <img onClick={() => {
          this.props.history.push("/");
        }} src="https://i.imgur.com/sCK0kqg.jpg" alt=""></img>

        <div className="search-container">
          <SearchBarContainer />
        </div>

        <div className="select-container">
          <Select
            style={{
              borderRadius: 100,
            }}
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            placeholder = 'Nav Menu'
          />
        </div>
        {this.props.children}
      </div>
    );
  }
}



export default NavBar;