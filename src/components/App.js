import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import MetamaskChecker from './Web3Checker/Web3Checker';
import SearchBar from './SearchBar/SearchBar';
import { Warning } from './Warning/Warning';
import Connect from './Connect/Connect';
import './App.css';
import logo from '../images/ic-ens-manager.svg';
import claimSubmainlogo from '../images/ic-ens-claimSubmain.svg';
import Clients from '../components/Clients';
import Footer from '../components/Footer';
import SetResolver from "./SetResolver";
import TransferOwnerPop from "./TransferOwnerPop";
import SetSubdomainPop from "./SetSubdomainPop";
import SetAddressPop from "./SetAddressPop";
import SetIpfsPop from "./SetIpfsPop";

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
    reoverData: {},
    isFilter: false,
    accounts: '',
    SeachPageIdx: 0,
  };


  SeachPageSwitch = (idx) => {
    this.setState({ SeachPageIdx: idx });
  }

  handleConnect = () => {
    this.setState({ isConnect: true });
  }

  async fetchAccount(web3) {
    web3.eth.getAccounts((err, accounts) => {
      if (accounts && accounts.length > 0) {
        this.setState({ accounts: accounts[0] })
        if (accounts[0] !== this.props.metaMask.account) {
          this.props.handleMetaMaskAccount(accounts[0]);
        }
      }
    });
    setTimeout(() => this.fetchAccount(web3), 1000)
  }

  async initialize(web3, provider, account, network) {
    this.setState({ hasProvider: true, web3 });
    this.props.handleMetaMaskAccount(account);
    this.props.handleMetaMaskNetwork(network);
    this.fetchAccount(web3);
  }

  async initError(error) {
    console.log(error);
  }

  footerOutFn = (isOut) => {
    this.props.handleToggleFooter(isOut);

    // this.setState({ 
    //   isFooterOut: isOut,
    // });
  }

  // 打開編輯ResOver
  EditResOverFn = () => {
    this.props.handleOpenResolverEditor();
  }

  //打開TransferOwner
  TransferOwnerOpen = () => {
    this.props.handleOpenTransferEditor();
  }

  //打開 Set Subdomain
  SetSubdomainPopOpen = () => {
    this.props.handleOpenSubDomainEditor();
  }

  //打開 Set Address
  SetAddressOpen = () => {
    this.props.handleOpenAddressEditor();
  }

  //打開 Set ipfs
  SetIpfsOpen = () => {
    this.props.handleOpenIPFSEditor();
  }
  
  // 關閉 pop up 編輯
  handleClosePopUpEditor = (e) => {
    this.props.handleClosePopUpEditor();
  }

  getReoverData = (data) => {
    this.setState({ reoverData: data });
  }

  render() {
    // FIXME: should be removed out of render function
    const funcs = {
      onCheckSuccess: async (web3, provider, account, network) => await this.initialize(web3, provider, account, network),
      //onCheckError : async (error) => await this.initError(error)
    }

    const {
      hasProvider,
      isConnect,
      reoverData,
      SeachPageIdx,
    } = this.state;

    const {
      handleWarningClose,
    } = this.props;

    const {
      isFoggy,
      isEditResover,
      isTransferOwner,
      isSetSubdomain,
      isSetAddress,
      isSetIpfs,
      isHiddenFooter,
      warning,
    } = this.props.app;

    return (
      <div className="wrap">
        <FilterDiv Filter={isFoggy}>
          <div className="header">
            {SeachPageIdx === 0 && <h1><img src={logo} alt="" /></h1>}
            {SeachPageIdx === 1 && <h1><img src={claimSubmainlogo} alt="" /></h1>}
          </div>

          <Warning handleWarningClose={handleWarningClose} warning={warning} />
          <MetamaskChecker {...funcs} />

          {(!hasProvider) ? <Clients /> : null}
          {(hasProvider && !this.state.isConnect) ? <Connect {...this.props} {...this.state} handleConnect={this.handleConnect} /> : null}

          {isConnect &&
            <SearchBar
              {...this.props}
              {...this.state}
              getReoverData={this.getReoverData}
              EditResOverFn={this.EditResOverFn}
              footerOutFn={this.footerOutFn}
              SeachPageSwitch={this.SeachPageSwitch}
              SetSubdomainPopOpen={this.SetSubdomainPopOpen}
              SetIpfsOpen={this.SetIpfsOpen}
              TransferOwnerOpen={this.TransferOwnerOpen}
              SetAddressOpen={this.SetAddressOpen}
            />
          }
          <Footer isFooterOut={isHiddenFooter} />
        </FilterDiv>

        {isEditResover && <SetResolver EditResCloseFn={this.handleClosePopUpEditor} reoverData={reoverData} />}
        {isTransferOwner && <TransferOwnerPop TransferOwnerClose={this.handleClosePopUpEditor} reoverData={reoverData} />}
        {isSetSubdomain && <SetSubdomainPop SetSubdomainPopClose={this.handleClosePopUpEditor} reoverData={reoverData} />}
        {isSetAddress && <SetAddressPop SetAddressClose={this.handleClosePopUpEditor} reoverData={reoverData} />}
        {isSetIpfs && <SetIpfsPop SetIpfsClose={this.handleClosePopUpEditor} reoverData={reoverData} />}
      </div>
    );
  }
}

export default App;
