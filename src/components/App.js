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

    const metaMask = <svg width="28" height="26" viewBox="0 0 28 26" xmlns="http://www.w3.org/2000/svg"><g id="od-1-5-walkthrough" fill="none" fill-rule="evenodd"><g id="start-copy-12" transform="translate(-110 -197)"><g id="Ledger" transform="translate(74 173)"><g id="Icons/Clients/Full/Ledger" transform="translate(36 24)"><g id="metamask" transform="translate(0 .5)"><path d="M13.9151515,3.97350993 L17.6484848,3.97350993 L25.9636364,-7.10542736e-15 L27.4909091,4.13907285 L26.8121212,8.44370861 L27.4909091,8.94039735 L26.6424242,9.60264901 L27.3212121,10.0993377 L26.4727273,10.7615894 L26.9818182,11.0927152 L25.7939394,12.5827815 L28,18.5430464 L26.4727273,25 L19.8545455,22.6821192 L18.4969697,23.3443709 L16.030747,23.6958653 L13.9151515,23.6958653 L11.969253,23.6958653 L9.5030303,23.3443709 L8.14545455,22.6821192 L1.52727273,25 L0,18.5430464 L2.20606061,12.5827815 L1.01818182,11.0927152 L1.52727273,10.7615894 L0.678787879,10.0993377 L1.35757576,9.60264901 L0.509090909,8.94039735 L1.18787879,8.44370861 L0.509090909,4.13907285 L2.03636364,-7.10542736e-15 L10.3515152,3.97350993 L13.9151515,3.97350993 Z" id="Combined-Shape" fill="#969697"></path><path d="M13.5757576,18.2119205 L15.1030303,18.2119205 L15.7818182,18.8741722 L19.8545455,22.6821192 L18.4969697,23.3443709 L16.030747,23.6958653 L13.5757576,23.6958653 L11.969253,23.6958653 L9.5030303,23.3443709 L8.14545455,22.6821192 L12.2181818,18.8741722 L12.8969697,18.2119205 L13.5757576,18.2119205 Z" id="Combined-Shape" fill="#DBC0B1"></path><polygon id="left_bottom" fill="#969697" points="14.4242424 23.6958653 11.969253 23.6958653 9.5030303 23.3443709 8.14545455 22.6821192 1.52727273 25 0 18.5430464 5.26060606 17.8807947 8.82424242 17.7152318 12.2181818 18.8741722 12.8969697 18.2119205 14.4242424 18.2119205"></polygon><polygon id="right_bottom" fill="#969697" transform="matrix(-1 0 0 1 41.576 0)" points="28 23.6958653 25.5450106 23.6958653 23.0787879 23.3443709 21.7212121 22.6821192 15.1030303 25 13.5757576 18.5430464 18.8363636 17.8807947 22.4 17.7152318 25.7939394 18.8741722 26.4727273 18.2119205 28 18.2119205"></polygon><path d="M13.5757576,18.2119205 L15.1030303,18.2119205 L15.7818182,18.8741722 C15.7818182,18.8741722 16.0187353,22.4942377 16.1690236,22.6347554 C16.319312,22.775273 19.8545455,22.6821192 19.8545455,22.6821192 L18.4969697,23.3443709 L16.030747,23.6958653 L13.5757576,23.6958653 L11.969253,23.6958653 L9.5030303,23.3443709 L8.14545455,22.6821192 C8.14545455,22.6821192 11.680688,22.775273 11.8309764,22.6347554 C11.9812647,22.4942377 12.2181818,18.8741722 12.2181818,18.8741722 L12.8969697,18.2119205 L13.5757576,18.2119205 Z" id="Combined-Shape" fill="#7E7E80"></path><path d="M13.5757576,21.0264901 L12.3826392,21.0264901 L11.8787879,21.6887417 L12.2181818,18.8741722 L12.8969697,18.2119205 L13.5757576,18.2119205 L15.1030303,18.2119205 L15.7818182,18.8741722 L16.1212121,21.6887417 L15.6173608,21.0264901 L13.5757576,21.0264901 Z" id="Combined-Shape" fill="#656566"></path><polygon id="1-copy" fill="#969697" transform="matrix(-1 0 0 1 42.764 0)" points="22.7393939 11.0927152 16.969697 12.5827815 15.7818182 11.0927152 16.2909091 10.7615894 15.4424242 10.0993377 16.1212121 9.60264901 15.2727273 8.94039735 15.9515152 8.44370861 15.2727273 4.13907285 16.8 -7.10542736e-15 25.1151515 3.97350993 26.8121212 7.61589404 27.4909091 17.7152318 26.8121212 16.0596026 23.5878788 15.397351 23.5878788 17.218543 21.2121212 12.9139073"></polygon><polygon id="1-copy" fill="#969697" points="7.97575758 11.0927152 2.20606061 12.5827815 1.01818182 11.0927152 1.52727273 10.7615894 0.678787879 10.0993377 1.35757576 9.60264901 0.509090909 8.94039735 1.18787879 8.44370861 0.509090909 4.13907285 2.03636364 -7.10542736e-15 10.3515152 3.97350993 12.0484848 7.61589404 12.7272727 17.7152318 12.0484848 16.0596026 8.82424242 15.397351 8.82424242 17.218543 6.44848485 12.9139073"></polygon><polygon id="1-copy-2" fill="#7E7E80" points="12.3878788 12.9139073 12.0484848 16.0596026 8.82424242 15.397351 6.44848485 12.9139073"></polygon><polygon id="1-copy-2" fill="#7E7E80" transform="matrix(-1 0 0 1 37.164 0)" points="21.5515152 12.9139073 21.2121212 16.0596026 17.9878788 15.397351 15.6121212 12.9139073"></polygon><polygon id="1-copy-3" fill="#656566" transform="matrix(-1 0 0 1 35.467 0)" points="18.3272727 14.2384106 19.5151515 16.0596026 15.9515152 15.397351"></polygon><polygon id="2" fill="#7E7E80" transform="matrix(-1 0 0 1 43.442 0)" points="17.6484848 12.5827815 16.4606061 11.0927152 16.969697 10.7615894 16.1212121 10.0993377 16.8 9.60264901 15.9515152 8.94039735 16.630303 8.44370861 15.9515152 4.13907285 17.4787879 -7.10542736e-15 27.4909091 7.61589404 23.4181818 11.0927152"></polygon><polygon id="1-copy-5" fill="#7E7E80" transform="matrix(-1 0 0 1 41.915 0)" points="22.0606061 22.6821192 19.1757576 17.8807947 22.7393939 17.7152318"></polygon><polygon id="1-copy-5" fill="#7E7E80" points="8.14545455 22.6821192 5.26060606 17.8807947 8.82424242 17.7152318"></polygon><polygon id="1-copy-3" fill="#656566" points="10.8606061 14.2384106 12.0484848 16.0596026 8.48484848 15.397351"></polygon><polygon id="2" fill="#7E7E80" points="2.20606061 12.5827815 1.01818182 11.0927152 1.52727273 10.7615894 0.678787879 10.0993377 1.35757576 9.60264901 0.509090909 8.94039735 1.18787879 8.44370861 0.509090909 4.13907285 2.03636364 -7.10542736e-15 12.0484848 7.61589404 7.97575758 11.0927152"></polygon></g></g></g></g></g></svg>
    const toshi = <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="50%" x2="15.315%" y2="85.486%" id="linearGradient-1"><stop stop-color="#2059EB" offset="0%"></stop><stop stop-color="#1C54E6" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M14,28 C6.2680135,28 0,21.7319865 0,14 C0,6.2680135 6.2680135,0 14,0 C21.7319865,0 28,6.2680135 28,14 C28,21.7319865 21.7319865,28 14,28 Z" class="filterable" fill="url(#linearGradient-1)" fill-rule="nonzero"></path><path d="M14,22.2 C9.47126505,22.2 5.8,18.5287349 5.8,14 C5.8,9.47126505 9.47126505,5.8 14,5.8 C18.5287349,5.8 22.2,9.47126505 22.2,14 C22.2,18.5287349 18.5287349,22.2 14,22.2 Z M11.9937709,11.4 C11.6658403,11.4 11.4,11.6658403 11.4,11.9937709 L11.4,16.0062291 C11.4,16.3341597 11.6658403,16.6 11.9937709,16.6 L16.0062291,16.6 C16.3341597,16.6 16.6,16.3341597 16.6,16.0062291 L16.6,11.9937709 C16.6,11.6658403 16.3341597,11.4 16.0062291,11.4 L11.9937709,11.4 Z" id="Combined-Shape" fill="#FFF" fill-rule="nonzero"></path></g></svg>      
    const status = <svg width="29" height="28" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(-28 -7)" fill="#505DB7"><g transform="translate(28 7)"><g transform="translate(.5)"><path d="M8.9735982,-3.62544108e-16 L19.0264018,3.62544108e-16 C22.1467174,-2.10648567e-16 23.2782192,0.324889639 24.41896,0.934964463 C25.5597007,1.54503929 26.4549607,2.4402993 27.0650355,3.58104004 C27.6751104,4.72178078 28,5.85328261 28,8.9735982 L28,19.0264018 C28,22.1467174 27.6751104,23.2782192 27.0650355,24.41896 C26.4549607,25.5597007 25.5597007,26.4549607 24.41896,27.0650355 C23.2782192,27.6751104 22.1467174,28 19.0264018,28 L8.9735982,28 C5.85328261,28 4.72178078,27.6751104 3.58104004,27.0650355 C2.4402993,26.4549607 1.54503929,25.5597007 0.934964463,24.41896 C0.324889639,23.2782192 1.40432378e-16,22.1467174 -2.41696072e-16,19.0264018 L2.41696072e-16,8.9735982 C-1.40432378e-16,5.85328261 0.324889639,4.72178078 0.934964463,3.58104004 C1.54503929,2.4402993 2.4402993,1.54503929 3.58104004,0.934964463 C4.72178078,0.324889639 5.85328261,2.10648567e-16 8.9735982,-3.62544108e-16 Z M10.6707611,14.7646078 C7.68682374,14.9329041 5.8787837,16.48684 6.00633108,18.809329 C6.13723497,21.1722092 8.54273379,22.6240453 10.9493514,22.4916522 C14.8652798,22.2672571 17.754116,18.7779137 18.0796975,14.7859254 C17.5466418,14.9102449 17.0038356,14.9879525 16.4573843,15.0181743 C14.2543949,15.1427135 12.8737505,14.6400686 10.6707611,14.7646078 Z M17.124211,13.7660497 C20.2401711,13.5865337 22.1265297,11.9260101 21.9933881,9.44420061 C21.85689,6.91975603 19.3462206,5.36357619 16.8344323,5.50943299 C12.7406089,5.74616979 9.72981949,9.47785988 9.39081198,13.7436102 C9.94654892,13.6103599 10.5130863,13.5273751 11.0836118,13.4956537 C13.38394,13.3621386 14.8272393,13.8995648 17.124211,13.7660497 Z"></path></g></g></g></g></svg>

    const clients = 
      <div className="clients">
        <h1>ENS Manager setup</h1>
        <p>First, you need to connect a wallet. This will be used for this DApp.</p>
        <div><a href="https://metamask.io/">{metaMask}&nbsp;METAMASK</a></div>
        <div><a href="https://status.im/">{status}&nbsp;STATUS</a></div>
        <div><a href="https://wallet.coinbase.com/">{toshi}&nbsp;TOSHI</a></div>
      </div>;

    return (
      <div className="App">
        <Warning {...this.props}/>
        <MetamaskChecker {...funcs} />
        <h1>ENS MANAGER</h1>
        {(!this.state.hasProvider) ? clients : null}
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
