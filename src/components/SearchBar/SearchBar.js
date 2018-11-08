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
    ipfsHash: "",
    address: "",
    menuAcitveidx: 0,
    domainValue: "",
    entries:"",
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
    this.setState({ [name]: value.toLowerCase() });
  }

  handleSearchItem = (e) => {
    if(this.state.searchValue === "") return;
    if(this.state.isKeyDown) return;
    if(e.keyCode !== 13) return;
    this.props.footerOutFn(true);
    this.setState({isIdentityBtn: false});
    this.props.SeachPageSwitch(0);
    this.handleSearchData();
  }

  handleSearchItemClick = () => {
    if(this.state.searchValue === "") return;
    if(this.state.isKeyDown) return;
    this.props.footerOutFn(true);
    this.setState({isIdentityBtn: false});
    this.props.SeachPageSwitch(0);
    this.handleSearchData();
  }

  handleSearchData = async () => {
    this.props.handleWarningClose();
    // 
    const keydomain = this.state.searchValue.toLowerCase().split(".eth");

    if(keydomain[0]===""){
      this.setState({isIdentityBtn: true, isKeyDown: false, isSeach: false, isOverview: false});
      return;
    }

    if (keydomain[keydomain.length - 1] !== "") {
      this.props.handleWarningOpen("ENS format error");
      return ;
    }

    const domain = keydomain[keydomain.length - 2].split(".");
    const seachdamain = domain[domain.length-1];

    if (seachdamain.length < 7) return this.props.handleWarningOpen("ENS has the minimum character length of 7");
    this.setState({ isKeyDown: true,isSeach: true, isOverview: true, isOpenResolver: false, isOpenSubdomain: false, isOpenURL: false, isOpenAddress: false, isOpenIPFS: false, ipfsHash: "", owner: "", resolver: ""})

    const resolver = await getResolver(this.state.searchValue, this.props.web3);
    const owner = await getOwner(this.state.searchValue, this.props.web3);
    const entries = await getEntries(seachdamain, this.props.web3);

    let ipfsHash = "";
    this.setState({resolver, owner, entries});


    if (resolver !== '0x0000000000000000000000000000000000000000') {

      ipfsHash = await getContent(this.state.searchValue, resolver, this.props.web3);
      this.setState({owner, resolver, entries});

      if (owner !== '0x0000000000000000000000000000000000000000' && owner === this.props.metaMask.account) {
        this.setState({isOpenIPFS: true, isOpenAddress: true, isOpenURL: true, isOpenSubdomain: true});
      }

      if (ipfsHash !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        this.setState({ipfsHash: fromContentHash(ipfsHash)});
      }
    }
    
    if (owner === '0x0000000000000000000000000000000000000000') {
      this.props.handleWarningOpen('This ENS is OPEN for bid!');
    }

    const address = await getAddress(this.state.searchValue, resolver, this.props.web3);
    const textInterface = await getSupportsInterface("0x59d1d43c", resolver, this.props.web3);
    const multihashInterface = await getSupportsInterface("0xe89401a1", resolver, this.props.web3);
    if (textInterface) {
      const url = await getText(this.state.searchValue, "url", resolver, this.props.web3);
      this.setState({url});
    }
    this.setState({isOpenResolver: true, address});
    this.handleLoadingClose();


    let deta = {...this.props, ...this.state}
    this.props.getReoverData(deta);
  }

  handleLoadingClose = () => {
    this.setState({isKeyDown: false});
  }
  
  handMenuAcitve = (idx) =>{
    const {isOpenResolver, isOpenSubdomain, isOpenAddress, isOpenIPFS} = this.state;
    const state = [true, isOpenResolver, isOpenSubdomain, isOpenAddress, isOpenIPFS];
    if(!state[idx]) return;
    this.setState({menuAcitveidx: idx});
  }


  overResolver =(eth)=>{
    this.setState({
        domainValue: eth,
    })
  }
  
  
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.accounts != this.props.accounts){
      this.setState({menuAcitveidx:0, isKeyDown: true, isSeach: true, isOverview: true, isOpenResolver: false, isOpenSubdomain: false, isOpenURL: false, isOpenAddress: false, isOpenIPFS: false, ipfsHash: "", owner: "", resolver: ""})
      this.handleSearchData();
    }
  }
  componentDidMount(){
    this.setState({accounts: this.props.accounts})
  }

  // baerwerew.ethEditResOverFn
  render() {
    const { EditResOverFn, TransferOwnerOpen, SetSubdomainPopOpen, SetAddressOpen, SetIpfsOpen, web3, handleWarningOpen, metaMask, SeachPageIdx  } = this.props;
    return (
      <Main>

      
        { SeachPageIdx === 0 && <SeachPage {...this.props} {...this} {...this.state}/>}
        { SeachPageIdx === 1 && <IdentityPage {...this.props} {...this} {...this.state}/>}
        
        { this.state.isKeyDown && <Loading/> }
        {/* { this.menuAcitveidx === 0 && this.state.isOpenSubdomain && <Events {...this.props} {...this.state}/> } */}
        { this.state.menuAcitveidx === 0 && this.state.isOverview && <Overview TransferOwnerOpen={TransferOwnerOpen} {...this.props} {...this.state}/> }
        { this.state.menuAcitveidx === 1 && this.state.isOpenResolver && <Resolver EditResOverFn={EditResOverFn} {...this.props} {...this.state}/> }
        { this.state.menuAcitveidx === 2 && this.state.isOpenSubdomain && <Subdomain handleSearchItemClick={this.handleSearchItemClick} SetSubdomainPopOpen={SetSubdomainPopOpen} {...this.props} {...this.state}/> }
        { this.state.menuAcitveidx === 3 && this.state.isOpenAddress && <Address SetAddressOpen={SetAddressOpen} {...this.props} {...this.state}/> }
        { this.state.menuAcitveidx === 4 && this.state.isOpenIPFS && <IPFS SetIpfsOpen={SetIpfsOpen} {...this.props} {...this.state}/> }
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
