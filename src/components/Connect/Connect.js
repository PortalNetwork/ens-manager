import React, { Component } from 'react';
import './Connect.css';
import landing from './../../images/landing.png';
import metaMaskLogo from './../../images/metamask.png';
import statusLogo from './../../images/status.png';
import toshiLogo from './../../images/toshi.png';

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
        <div className="introduction">
          <div className="figure"><img src={landing} alt=""/></div>
          <h3>Connect DWeb/DApp & Wallet</h3>
          <p>BNS resolver enables any users to easily set the default resolver contract and bind its BNS with an IPFS hash. Below image is the first ENS resolver built by Portal Network for Ethereum Name Service, which helps both the ENS and IPFS communities to easily connect their DWeb with the ENS.</p>
        </div>
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
          {(client === 'MetaMask' || client === 'Status' || client === 'Toshi') ? <button type="button" className="status_btn" onClick={() => this.props.handleConnect()}>Continue</button> : null}
        </div>
      </div>
    )
  }
}

export default Connect;
