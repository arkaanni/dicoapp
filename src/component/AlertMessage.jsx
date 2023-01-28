import React from 'react';
import PropTypes from 'prop-types';
import { MessageType } from '../redux/message/action';

function AlertMessage({ type, text }) {
  return (
    <div className={`alert ${type === MessageType.INFO ? 'bg-primary' : 'bg-error'} w-fit m-4 fixed z-50 bottom-0 right-0`}>
      <p>{text}</p>
    </div>
  );
}

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AlertMessage;
