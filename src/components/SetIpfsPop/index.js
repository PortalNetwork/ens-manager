import React, { Component } from 'react'
import styled from 'styled-components';
import closeSvg from "../../images/ic-close.svg";
import { getEthereumResolverAddress, getEtherscanUrl } from '../../lib/web3Service';
import { setContent } from '../../lib/resolverService';
const half = num => {
  return `${-(num / 2)}px`
}
const TOPop = styled.div`
  position: fixed;
  width: 335px;
  height: auto;
  overflow: hidden;
  border-radius: 6px;
  background-color: rgba(5, 21, 74, 0.95);
  top: 50%;
  left: 50%;
  margin-left: ${half(335)};
  margin-top: ${half(394)};
  padding: 20px 24px 28px 24px;
  >h1{
    display: block;
    width: 100%;
    position: relative;
    font-family: SFProText;
    font-size: 14px;
    line-height: 1.3;
    color: #ffffff;
    margin-bottom: 14px;
    >a{
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 0;
      display: block;
      width: 10.5px;
      height: 10.5px;
    }
  }
  >p{
    font-family: SFProText;
    font-size: 12px;
    line-height: 1.6;
    letter-spacing: 0.6px;
    color: #ffffff;
    padding-top: 10px;
    text-align: left;
  }
`;
const InputItem = styled.input`
  font-family: SFProText;
  font-size: 12px;
  width: 287px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: 16px;
  padding-left: 11px;
  border: 0;
  /* margin-bottom: 14px; */
  &::placeholder { 
    color: #aeaeae;
    opacity: 1;
  }
`;

const SeedBtn = styled.a`
  cursor: pointer;
  width: 288px;
  height: 36px;
  border-radius: 4px;
  background-color: #314184;
  font-family: SFProText;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`
export default class extends Component {
  state={
    hash: "",
    resolver: getEthereumResolverAddress(),
  }

  handleInputChange = (e) =>{
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSetIPFSHash = () => {
    const { hash: ipfsHash,  resolver, } = this.state;

    if(resolver.length < 42) return alert("Wrong resolver");
    if(resolver === "") this.setState({"resolver": getEthereumResolverAddress()})

    const {
      metaMask,
      web3,
      handleWarningOpen,
      searchValue,
    } = this.props;

    if (ipfsHash.length !== 46) {
      handleWarningOpen('IPFS Hash incorrect');
      return;
    }

    // const to = getEthereumResolverAddress();
    const ipfsData = setContent(searchValue, ipfsHash);
    web3.eth.sendTransaction({
      from: metaMask.account, 
      to: resolver,
      value: 0,
      data: ipfsData 
    }, (err, result) => {
        if (err) return handleWarningOpen(err.message);
        this.props.handleClose();
        const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
        handleWarningOpen(tx);
    });
  }

  render() {
    const { handleClose } = this.props;
    const to = getEthereumResolverAddress();
    return (
      <TOPop>
        <h1>Set IPFS HASH <a onClick={handleClose}><img src={closeSvg} alt=""/></a></h1>
        <p>Enter your specified IPFS hash, you will be able to visit the Dweb (with the installation of browser extension). </p>
        <InputItem 
            name="hash" 
            value={this.state.hash} 
            placeholder="QmcvpYRiw2ReaZp5GRK25fSQ6wCuqjjwpegSL"
            onChange={this.handleInputChange}
        />
        <InputItem 
            name="resolver" 
            value={this.state.resolver} 
            placeholder={to}
            onChange={this.handleInputChange}
        />
        <p>Default Resolver, can be changed</p>
        <SeedBtn onClick={this.handleSetIPFSHash}>Set IPFS Hash</SeedBtn>
      </TOPop>
    )
  }
}
