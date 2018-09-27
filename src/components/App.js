import React, { Component } from 'react';
import MetamaskChecker from './Web3Checker/Web3Checker';
import SearchBar from './SearchBar/SearchBar';
import {Warning} from './Warning/Warning';
import Connect from './Connect/Connect';
import './App.css';
import logo from '../images/logo.png';
import socialTe from '../images/te.png';
import socialTwitter from '../images/twitter.png';
import Clients from '../components/Clients';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      hasProvider: false,
      isConnect: false,
      isLock: false,
    };
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleConnect = () => {
    this.setState({isConnect: true});
  }

  async fetchAccount(web3) {
    web3.eth.getAccounts((err, accounts) => {
      if (accounts && accounts.length > 0) {
        if (accounts[0] !== this.props.metaMask.account) {
          this.props.handleMetaMaskAccount(accounts[0]);
        }
      }
    });
    setTimeout(() => this.fetchAccount(web3), 1000)
  }

  async initialize (web3, provider, account, network) {
    this.setState({hasProvider: true, web3});
    this.props.handleMetaMaskAccount(account);
    this.props.handleMetaMaskNetwork(network);
    this.fetchAccount(web3);
  }

  async initError (error) {
    //alert('ERROR');
    //this.props.handleWarningOpen('ERROR');
  }

  render() {
    const funcs = {
      onCheckSuccess : async (web3, provider, account, network) => await this.initialize(web3, provider, account, network),
      onCheckError : async (error) => await this.initError(error)
    }

    return (
      <div className="wrap">
        <div className="header">
          <h1><img src={logo} alt=""/></h1>
        </div>

        <Warning {...this.props}/>
        <MetamaskChecker {...funcs} />

        {(!this.state.hasProvider) ? <Clients/> : null}
        {(this.state.hasProvider && !this.state.isConnect) ? <Connect {...this.props} {...this.state} handleConnect={this.handleConnect}/> : null}
        {(this.state.isConnect) ? <SearchBar {...this.props} {...this.state}/> : null}

        <div className="footer">
          <div className="content">
            <div className="map_box">
              <h4>Company</h4>
              <ul className="map">
                <li><a href="https://www.portal.network/" target="_blank">Portal Network</a></li>
                <li><a href="mailto:support@portal.network">Contact Us</a></li>
              </ul>
            </div>
            <ul className="social">
              <li><a href="https://t.me/portalnetworkofficial" target="_blank"><img src={socialTe} alt=""/></a></li>
              <li><a href="https://twitter.com/itisportal" target="_blank"><img src={socialTwitter} alt=""/></a></li>
            </ul>
          </div>
          <p>Powered by Portal Network</p>
        </div>
      </div>
    );
  }
}

export default App;
