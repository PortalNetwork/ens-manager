import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import MetamaskChecker from './Web3Checker/Web3Checker';
import SearchBar from './SearchBar/SearchBar';
import { Warning } from './Warning/Warning';
import Connect from './Connect/Connect';
import './App.css';
import logo from '../images/logo.png';
import Clients from '../components/Clients';
import Footer from '../components/Footer';
import SetResolver from "./SetResolver";

const FilterDiv = styled.div`
  width: 100%;
  height: 100%;
  transition: filter .05s;
  ${props => props.Filter && css`
    filter: blur(15px);
    ${'' /* background-color: #1f398f; */}
  `}
`


class App extends Component {
  
  state = {
    web3: null,
    hasProvider: false,
    isConnect: false,
    isLock: false,
    isFooterOut: false,
    isFilter: false,
    reoverData:{}
  };

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

  footerOutFn = (isOut) =>{
    this.setState({isFooterOut: isOut})
  }

  EditResOverFn =()=>{
    this.setState({isFilter: true});
  }

  EditResCloseFn =()=>{
    this.setState({isFilter: false});
  }

  getReoverData = (data) =>{
    this.setState({reoverData: data});
  }

  render() {
    const funcs = {
      onCheckSuccess : async (web3, provider, account, network) => await this.initialize(web3, provider, account, network),
      onCheckError : async (error) => await this.initError(error)
    }
    const { isFilter, hasProvider, isConnect, reoverData } = this.state;

    return (
      <div className="wrap">
        <FilterDiv Filter={isFilter}>
          <div className="header">
            <h1><img src={logo} alt=""/></h1>
          </div>
          <Warning {...this.props}/>
          <MetamaskChecker {...funcs} />

          {(!hasProvider) ? <Clients/> : null}
          {(hasProvider && !this.state.isConnect) ? <Connect {...this.props} {...this.state} handleConnect={this.handleConnect}/> : null}
          {(isConnect) && <SearchBar getReoverData={this.getReoverData} EditResOverFn={this.EditResOverFn} {...this.props} {...this.state} footerOutFn={this.footerOutFn} />}
          <Footer isFooterOut={this.state.isFooterOut}/>
        
        </FilterDiv>
        

        {isFilter && <SetResolver EditResCloseFn={this.EditResCloseFn} reoverData={reoverData} />}
      </div>
    );
  }
}

export default App;
