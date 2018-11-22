import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export const Warning = ({warning, handleWarningClose, }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={6000}
    open={warning.isShow}
    onRequestClose={handleWarningClose}
    snackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{warning.message}</span>}
    action={[
      <Button key="close" color="secondary" size="small" onClick={handleWarningClose}>
        CLOSE
      </Button>
      ]}
  />
)

export default Warning;