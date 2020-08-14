import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from "react-router-dom";

import NavBar from './navbar';

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    user: state.session.user
  }
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mdp
)(NavBar));