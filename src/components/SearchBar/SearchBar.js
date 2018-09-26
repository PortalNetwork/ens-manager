import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import Resolver from './Resolver/Resolver';
import Subdomain from './Subdomain/Subdomain';
import IPFS from './IPFS/IPFS';
import Address from './Address/Address';
import Events from './Events/Events';
import {getResolver, getOwner} from '../../lib/registryService';
import {getContent, getAddress} from '../../lib/resolverService';
import {fromContentHash} from '../../helpers/ipfsHelper';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyDown: false,
      isOpenResolver: false,
      isOpenIPFS: false,
      isOpenAddress: false,
      isOpenSubdomain: false,
      searchValue : "",
      owner: "",
      resolver: "",
      ipfsHash: "",
      address: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchItem = this.handleSearchItem.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
    this.handleLoadingClose = this.handleLoadingClose.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleSearchItem = (e) => {
    if(this.state.isKeyDown) return;
    if(e.keyCode !== 13) return;
    this.handleSearchData();
  }

  handleSearchData = async () => {

    this.props.handleWarningClose();
    const keydomain = this.state.searchValue.toLowerCase().split(".wan");
    if (keydomain[keydomain.length - 1] !== "") {
      this.props.handleWarningOpen("WNS format error");
      return;
    }
    const domain = keydomain[keydomain.length - 2].split(".");
    const seachdamain = domain[domain.length-1];
    if (seachdamain.length < 7) {
      this.props.handleWarningOpen("WNS has the minimum character length of 7");
      return;
    }
    this.setState({isKeyDown: true, isOpenResolver: false, isOpenSubdomain: false, isOpenAddress: false, isOpenIPFS: false, ipfsHash: "", owner: "", resolver: ""})
    const resolver = await getResolver(this.state.searchValue, this.props.web3);
    const owner = await getOwner(this.state.searchValue, this.props.web3);
    let ipfsHash = "";
    this.setState({resolver, owner});
    if (resolver !== '0x0000000000000000000000000000000000000000') {
      ipfsHash = await getContent(this.state.searchValue, resolver, this.props.web3);
      this.setState({owner, resolver});
      if (owner !== '0x0000000000000000000000000000000000000000' && 
        owner === this.props.metaMask.account) {
        this.setState({isOpenIPFS: true, isOpenAddress: true, isOpenSubdomain: true});
      }
      if (ipfsHash !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        this.setState({ipfsHash: fromContentHash(ipfsHash)});
      }
    }
    if (owner === '0x0000000000000000000000000000000000000000') {
      this.props.handleWarningOpen('This WNS is OPEN for bid!');
    }
    const address = await getAddress(this.state.searchValue, resolver, this.props.web3);
    this.setState({isOpenResolver: true, address});
    this.handleLoadingClose();
  }

  handleLoadingClose = () => {
    this.setState({isKeyDown: false});
  }
  
  handleSearchItemClick = () => {
    if(this.state.isKeyDown) return;
    this.handleSearchData();
  }

  render() {
    return (
      <div className="main">
        <div className="search_bar">
          <input type="text" 
            className="search_type"
            onKeyDown={this.handleSearchItem} 
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            placeholder="Your Domain Name"
          />
          <a href="javascript:;" className="search_icon" onClick={this.handleSearchItemClick}></a>
        </div>

        { this.state.isKeyDown && <Loading/> }
        { this.state.isOpenSubdomain && <Events {...this.props} {...this.state}/> }
        { this.state.isOpenSubdomain && <Subdomain {...this.props} {...this.state}/> }
        { this.state.isOpenResolver && <Resolver {...this.props} {...this.state}/> }
        { this.state.isOpenAddress && <Address {...this.props} {...this.state}/> }
        { this.state.isOpenIPFS && <IPFS {...this.props} {...this.state}/> }
      </div>
    );
  }
}

export default SearchBar;
