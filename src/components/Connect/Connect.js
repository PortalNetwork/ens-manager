import React, { Component } from 'react';
import './Connect.css';
import metaMaskLogo from './../../images/metamask.png';
import statusLogo from './../../images/status.png';
import toshiLogo from './../../images/toshi.png';
import Introduction from '../Introduction'
class Connect extends Component {

  client() {
    const {isMetaMask, isToshi, isCipher, isStatus} = this.props.web3.currentProvider;
    if (!!isMetaMask) {
      return 'MetaMask';
    } else if (!!isToshi) {
      return 'Toshi';
    } else if (!!isCipher) {
      return 'Cipher';
    } else if (!!isStatus) {
      return 'Status';
    } else {
      return 'No Client';
    }
  }

  render() {
    const client = this.client();

    return (
      <div className="main">
        <Introduction/>
        <div className="status">
          <div className="status_text">
            <div className="wallet_logo">
              {client === 'MetaMask' ? <img src={metaMaskLogo} alt=""/> : null}
              {client === 'Status' ? <img src={statusLogo} alt=""/> : null}
              {client === 'Toshi' ? <img src={toshiLogo} alt=""/> : null}
            </div>
            <div className="status_content">
              <h5>Connected</h5>
              {client === 'MetaMask' ? <h4>Metamask</h4>: null}
              {client === 'Status' ? <h4>Status</h4>: null}
              {client === 'Toshi' ? <h4>Toshi</h4>: null}
              {client === 'No Client' ? <span>No Client In Use</span> : null}
            </div>
          </div>
          {(
            client === 'MetaMask' || client === 'Status' || client === 'Toshi') ? 
              <button 
                type="button" 
                className="status_btn" 
                onClick={() => this.props.handleConnect()}>
                Continue
              </button> : null}
        </div>
      </div>
    )
  }
}

export default Connect;
