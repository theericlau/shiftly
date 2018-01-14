import React from 'react';
import PropTypes from 'prop-types';

const FlashMessage = (props) => (
  <div className={`container ${props.type}-flash-message`}>
    {props.message.toUpperCase()}
  </div>
);

export default FlashMessage;