import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {

  render() {
    return (
      <div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.view,
    flashMessage: state.flashMessage,
    users: state.users,
    selectedWeek: state.selectedWeek,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkedIfLoggedIn,
    changeView,
    logout,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);