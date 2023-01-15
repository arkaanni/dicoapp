const Action = {
  SET_MESSAGE: 'message/setMessage',
  UNSET_MESSAGE: 'message/setMessage',
};

const MessageType = {
  INFO: 'info',
  ERROR: 'error',
};

const setMessage = (message) => ({
  type: Action.SET_MESSAGE,
  payload: { message },
});

const unsetMessage = () => ({
  type: Action.UNSET_MESSAGE,
});

const displayMessage = ({ type, text }) => (dispatch) => {
  dispatch(setMessage({ type, text }));
  setTimeout(() => {
    dispatch(setMessage(null));
  }, 5000);
};

export {
  Action,
  MessageType,
  setMessage,
  unsetMessage,
  displayMessage,
};
