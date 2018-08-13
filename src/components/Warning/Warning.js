import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export const Warning = (props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={6000}
    open={props.warning.open}
    onRequestClose={props.handleWarningClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.warning.message}</span>}
    action={[
      <Button key="close" color="secondary" size="small" onClick={props.handleWarningClose}>
        CLOSE
      </Button>
      ]}
  />
)

export default Warning;