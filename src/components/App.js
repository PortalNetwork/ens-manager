import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import MetamaskChecker from './Web3Checker/Web3Checker';
import SearchBar from './SearchBar/SearchBar';
import {Warning} from './Warning/Warning';
import Connect from './Connect/Connect';
import './App.css';

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
    console.log('Toshi', !!provider.isToshi);
    console.log('Cipher', !!provider.isCipher);
    console.log('MetaMask', !!provider.isMetaMask);
    console.log('ImToken', !!provider.isImToken);
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
      <div className="App">
        <Warning {...this.props}/>
        <MetamaskChecker {...funcs} />
        <h1>ENS MANAGER</h1>
        {(this.state.hasProvider && !this.state.isConnect) ? <Connect {...this.props} {...this.state} handleConnect={this.handleConnect}/> : null}
        {(this.state.isConnect) ? <SearchBar {...this.props} {...this.state}/> : null}
        <div className="urllink">
          <a href="https://twitter.com/itisportal" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
          <a href="https://t.me/portalnetworkofficial" target="_blank"><i className="fab fa-telegram fa-2x"></i></a>
        </div>
        <span className="text">
          <p>
            Powered by <a href="https://www.portal.network/" target="_blank">Portal Network</a>
            <span className="links">
              <a href="https://twitter.com/itisportal" target="_blank"><i className="fab fa-twitter fa-1x"></i></a>
              <a href="https://t.me/portalnetworkofficial" target="_blank"><i className="fab fa-telegram fa-1x"></i></a>
            </span>
          </p>
        </span>
      </div>
    );
  }
}

export default App;
