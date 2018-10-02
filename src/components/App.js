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
import TransferOwnerPop from "./TransferOwnerPop";

const FilterDiv = styled.div`
  width: 100%;
  height: 100%;
  transition: filter .05s;
  ${props => props.Filter && css`
    filter: blur(25px);
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
    reoverData:{},
    isFilter: false,
    isEditResover: false,
    isTransferOwner: false,
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

  // 打開編輯ResOver
  EditResOverFn = () =>{
    this.FilterOpen();
    this.setState({isEditResover: true});
  }

  // 關閉編輯ResOver
  EditResCloseFn = () =>{
    this.FilterClose();
    this.setState({isEditResover: false});
  }

  //打開TransferOwner
  TransferOwnerOpen = () =>{
    this.FilterOpen();
    this.setState({isTransferOwner: true});

  }

  //關閉TransferOwner
  TransferOwnerClose = () =>{
    this.FilterClose();
    this.setState({isTransferOwner: false});
  }

  //打開模糊背景
  FilterOpen = () =>{
    this.setState({isFilter: true});
  }

  //關閉模糊背景
  FilterClose = () =>{
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
    const {hasProvider, isConnect, reoverData, isEditResover, isFilter, isTransferOwner  } = this.state;

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
          {(isConnect) && 
            <SearchBar 
              {...this.props} 
              {...this.state} 
              TransferOwnerOpen={this.TransferOwnerOpen}
              getReoverData={this.getReoverData} 
              EditResOverFn={this.EditResOverFn} 
              footerOutFn={this.footerOutFn}
            />}
          
          
          <Footer isFooterOut={this.state.isFooterOut}/>
        
        </FilterDiv>
        {isEditResover && <SetResolver EditResCloseFn={this.EditResCloseFn} reoverData={reoverData} />}
        {isTransferOwner && <TransferOwnerPop TransferOwnerClose={this.TransferOwnerClose} reoverData={reoverData}/>}

      </div>
    );
  }
}

export default App;
