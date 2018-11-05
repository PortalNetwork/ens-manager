import React, { Component } from 'react';
import styled from 'styled-components';
import { getResolver, getOwner } from '../../lib/registryService';
import { getContent, getAddress, getText, getSupportsInterface } from '../../lib/resolverService';
import { fromContentHash } from '../../helpers/ipfsHelper';
import { getEntries } from '../../lib/registrarService';
import Loading from '../Loading/Loading';
import Resolver from './Resolver/Resolver';
import Subdomain from './Subdomain/Subdomain';
import IPFS from './IPFS';
import Address from './Address';
import Overview from './Overview';
import MenuBar from './MenuBar';
import IdentityPage from './IdentityPage';
import SeachPage from './SeachPage.js';
import overview from '../../images/ic-overview-on.svg';
import resolver from '../../images/ic-resolver-on.svg';
import subdomain from '../../images/ic-subdomain-on.svg';
import wallet from '../../images/ic-wallet-on.svg';
import ipfs from '../../images/ic-ipfs-on.svg';
import './SearchBar.css';
const Main = styled.div`
    max-width: 480px;
    width: 100%;
    height: auto;
    min-height: 600px;
    margin: 0px auto;
    padding: 10px 20px 161px 20px;
    background-color: #1f398f;
    box-sizing: border-box;
    @media screen and (max-width: 720px) {
      min-height: 500px;
    }
`;

function validateSearchDomain(value) {
  return /^[a-z]{7,}.eth$/.test(value);
}

function fetchIPFSHash(domain, resolver, web3) {
  return getContent(domain, resolver, web3).then(ipfsHash => {
    if (ipfsHash === '0x') {
      return Promise.resolve('');
    } else {
      return Promise.resolve(fromContentHash(ipfsHash));
    }
  }).catch(error => {
    console.log('fetch ipfs hash error', error);
    return Promise.resolve('');
  });
}

class SearchBar extends Component {
  // baerwerew.eth
  state = {
    searchValue: "",
    isKeyDown: false,
    isSeach: false,
    isOpenResolver: false,
    isOpenIPFS: false,
    isOpenAddress: false,
    isOpenSubdomain: false,
    isOverview: false,
    isOpenURL: true,
    owner: "",
    resolver: "",
    entries: {},
    ipfsHash: "",
    address: "",
    menuAcitveidx: 0,
    domainValue: "",
    url: "",
    accounts: '',
    isIdentityBtn: true,
    menuItem: [
      { imgurl: overview, name: "Overview" },
      { imgurl: resolver, name: "Resolver" },
      { imgurl: subdomain, name: "Subdomain" },
      { imgurl: wallet, name: "Address" },
      { imgurl: ipfs, name: "Set IPFS" }
    ]
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase()
    });
  }

  // TODO: maybe should be deprecated.
  handleSearchItem = (e) => {
    if (this.state.searchValue === "") return;
    if (this.state.isKeyDown) return;
    if (e.keyCode !== 13) return;
    this.handleSearchData();
    this.props.footerOutFn(true);
    this.setState({ isIdentityBtn: false });
    this.props.SeachPageSwitch(0);
  }

  // search domain
  handleSearchItemClick = () => {
    const { searchValue, isKeyDown, } = this.state;
    if (!searchValue || isKeyDown) {
      return;
    }

    this.handleSearchData();
    this.props.footerOutFn(true);
    this.setState({
      isIdentityBtn: false,
      menuAcitveidx: 0,
    });
    this.props.SeachPageSwitch(0);
  }

  // 呼叫合約撈取資料
  handleSearchData = async () => {
    const { searchValue, } = this.state;
    const { handleWarningOpen, handleWarningClose, web3, metaMask, } = this.props;

    handleWarningClose();
    const lowerCaseValue = searchValue.toLowerCase();
    if (validateSearchDomain(lowerCaseValue) === false) {
      handleWarningOpen('ENS has the minimum character length of 7 and should be end with .eth');
      return;
    }

    const label = lowerCaseValue.split('.').shift();
    this.setState({
      isKeyDown: true,
      isSeach: true,
      isOverview: true,
      isOpenResolver: false,
      isOpenSubdomain: false,
      isOpenURL: false,
      isOpenAddress: false,
      isOpenIPFS: false,
      ipfsHash: "",
      owner: "",
      resolver: "",
    });

    const resolver = await getResolver(lowerCaseValue, web3);
    const fetchData = await Promise.all([
      getOwner(lowerCaseValue, web3),
      getEntries(label, web3),
      getAddress(lowerCaseValue, resolver, web3),
      getSupportsInterface("0x59d1d43c", resolver, web3),
      getSupportsInterface("0xe89401a1", resolver, web3),
      fetchIPFSHash(lowerCaseValue, resolver, web3),
    ]);
    const owner = fetchData[0];
    const entries = fetchData[1];
    const address = fetchData[2];
    const textInterface = fetchData[3];
    const multihashInterface = fetchData[4];
    const ipfsHash = fetchData[5];
    const isOwner = owner === metaMask.account;
    const hasResolver = resolver !== '0x0000000000000000000000000000000000000000';

    const newData = {
      searchValue: lowerCaseValue,
      resolver,
      owner,
      entries,
      address,
      ipfsHash,
      isOpenResolver: true,
      isOpenIPFS: hasResolver && isOwner, 
      isOpenAddress: hasResolver && isOwner, 
      isOpenURL: hasResolver && isOwner, 
      isOpenSubdomain: hasResolver && isOwner,
      url: '',
    };

    // TODO: ...
    if (textInterface) {
      newData.url = await getText(lowerCaseValue, "url", resolver, web3);
    }

    this.setState({
      ...newData,
    });

    this.props.getReoverData(newData);
    this.handleLoadingClose();
    if (newData.owner === '0x0000000000000000000000000000000000000000') {
      handleWarningOpen('This ENS is OPEN for bid!');
    }
  }

  handleLoadingClose = () => {
    this.setState({ isKeyDown: false });
  }

  handMenuAcitve = (idx) => {
    const { isOpenResolver, isOpenSubdomain, isOpenAddress, isOpenIPFS } = this.state;
    const state = [true, isOpenResolver, isOpenSubdomain, isOpenAddress, isOpenIPFS];
    if (!state[idx]) return;
    this.setState({ menuAcitveidx: idx });
  }

  // TODO: maybe should be deprecated.
  overResolver = (eth) => {
    this.setState({
      domainValue: eth,
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.accounts != this.props.accounts) {
      this.setState({
        menuAcitveidx: 0,
        isKeyDown: true,
        isSeach: true,
        isOverview: true,
        isOpenResolver: false,
        isOpenSubdomain: false,
        isOpenURL: false,
        isOpenAddress: false,
        isOpenIPFS: false,
        ipfsHash: "",
        owner: "",
        resolver: ""
      });
      this.handleSearchData();
    }
  }

  componentDidMount() {
    this.setState({
      accounts: this.props.accounts,
    });
  }

  // baerwerew.ethEditResOverFn
  render() {
    const {
      EditResOverFn,
      TransferOwnerOpen,
      SetSubdomainPopOpen,
      SetAddressOpen,
      SetIpfsOpen,
      SeachPageIdx,
    } = this.props;

    return (
      <Main>
        {SeachPageIdx === 0 && <SeachPage {...this.props} {...this} {...this.state} />}
        {SeachPageIdx === 1 && <IdentityPage {...this.props} {...this} {...this.state} />}

        {this.state.isKeyDown && <Loading />}
        {/* { this.menuAcitveidx === 0 && this.state.isOpenSubdomain && <Events {...this.props} {...this.state}/> } */}
        {this.state.menuAcitveidx === 0 && this.state.isOverview && <Overview TransferOwnerOpen={TransferOwnerOpen} {...this.props} {...this.state} />}
        {this.state.menuAcitveidx === 1 && this.state.isOpenResolver && <Resolver EditResOverFn={EditResOverFn} {...this.props} {...this.state} />}
        {this.state.menuAcitveidx === 2 && this.state.isOpenSubdomain && <Subdomain handleSearchItemClick={this.handleSearchItemClick} SetSubdomainPopOpen={SetSubdomainPopOpen} {...this.props} {...this.state} />}
        {this.state.menuAcitveidx === 3 && this.state.isOpenAddress && <Address SetAddressOpen={SetAddressOpen} {...this.props} {...this.state} />}
        {this.state.menuAcitveidx === 4 && this.state.isOpenIPFS && <IPFS SetIpfsOpen={SetIpfsOpen} {...this.props} {...this.state} />}


        {/* { this.state.isOpenURL && <URL {...this.props} {...this.state}/> }
        <FileUpload {...this.props} {...this.state}/> */}

        <MenuBar
          menuAcitveidx={this.state.menuAcitveidx}
          menuItem={this.state.menuItem}
          handMenuAcitve={this.handMenuAcitve}
        />
      </Main>
    );
  }
}

export default SearchBar;
