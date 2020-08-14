import React from "react";
import "./searchbar.scss";

const WAIT_TIME = 1000;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHandle: "",
      currentStyle: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.hideStyle = { display: "none" };
    this.showStyle = { display: "block" };
  }

  componentDidMount() {
    this.timer = null;
    this.blurTimer = null;
  }

  handleChange(e) {
    clearTimeout(this.timer);
    e.preventDefault();
    let _timeout = () => { 
      this.props.fetchSearchUsers(this.state.searchHandle).then(() => {
        this.setState({ currentStyle: this.showStyle })
      });
    };
    this.timer = setTimeout(_timeout, WAIT_TIME);
    this.setState({ searchHandle: e.target.value });
  }

  handleBlur(e) {
    clearTimeout(this.blurTimer);
    e.preventDefault();
    let _timeout = () => {
      this.setState({
        searchHandle: "",
        currentStyle: this.hideStyle
      }, () => {
        this.props.clearSearchUsers();
      });
    }

    this.blurTimer = setTimeout(_timeout, WAIT_TIME / 5);
  }

  render() {
    return (
      <div className="search">
        <input type="search" 
        value={this.state.searchHandle}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        placeholder="What'cha lookin' for?"/>
        <div className="found-users" 
        style={this.state.currentStyle}>
          { this.props.searchUsers.map(user => {
            return (
              <div key={user._id}
              onClick={() => {
                this.props.history.push(`/users/${user._id}`)
              }}>
                {user.handle}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchBar;