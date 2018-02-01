import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../actions/index';
import PropTypes from 'prop-types';

const SignUp = props => (
  <div className="credentials clear-fix">
    <h4>Sign Up</h4>
    <form >
      <div>
        <label className="credentials-label">Username:</label>
        <input className="credentials-input" id="username" type="text" name="username" />
      </div>
      <div>
        <label className="credentials-label">Password:</label>
        <input className="credentials-input" id="password" type="password" name="password" />
      </div>
      <div className="btn-credentials">
        <input className="btn-main clickable" type="button" value="Sign Up" onClick={
          () => {
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            props.signUp({ username, password });
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
          }
        }
        />
      </div>
    </form>
  </div>
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch);
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(SignUp);
