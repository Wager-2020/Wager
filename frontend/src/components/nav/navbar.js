import React from 'react';
// import { Link } from 'react-router-dom'
import './navbar.scss'

// import { Component } from "react";
import Select from "react-select";

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
        this.props.history.push('/');
      });
    } else {
      this.props.history.push(`/${selectedOption.value}`);
    }
  };

  render() {
    let options = null;
    if (this.props.loggedIn) {
      options = [
        { value: "home", label: "home" },
        { value: "wagers", label: "wagers" },
        { value: "messages", label: "messages" },
        { value: "leaderboard", label: "leaderboard" },
        { value: "profile", label: "profile" },
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
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}



export default NavBar;