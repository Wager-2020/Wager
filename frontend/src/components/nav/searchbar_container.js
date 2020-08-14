import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchBar from "./searchbar";
import { fetchSearchUsers, clearSearchUsers } from "../../actions/user_actions";

const mapStateToProps = state => {
  return {
    searchUsers: Object.values(state.entities.searchUsers)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSearchUsers: searchHandle => dispatch(fetchSearchUsers({ searchHandle })),
    clearSearchUsers: () => dispatch(clearSearchUsers())
  }
}

const SearchBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));

export default SearchBarContainer;