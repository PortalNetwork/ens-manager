import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import SearchBar from './SearchBar/SearchBar';
import {Warning} from './Warning/Warning';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      isKeyDown: false
    };
    this.setWeb3 = this.setWeb3.bind(this);
  }

  setWeb3(web3) {
    this.setState({web3});
  }

  render() {
    return (
      <div className="App">
        {/*<Top/>*/}
        
        <Warning {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <SearchBar {...this.props} {...this.state}/>
        <div className="urllink">
          <a href="https://twitter.com/itisportal" target="_blank"><i className="fab fa-twitter fa-3x"></i></a>
          <a href="https://t.me/portalnetworkofficial" target="_blank"><i className="fab fa-telegram fa-3x"></i></a>
        </div>
        <span className="text">
          <p>
            Powered by <a href="https://www.portal.network/" target="_blank">Portal Network</a>
          </p>
        </span>
      </div>
    );
  }
}

export default App;
