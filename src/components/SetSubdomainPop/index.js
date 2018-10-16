import React, { Component } from 'react'
import styled from 'styled-components';
import closeSvg from "../../images/ic-close.svg";
import { getEthereumRegistryAddress, getEtherscanUrl } from '../../lib/web3Service';
import { setSubnodeOwner, getOwner } from '../../lib/registryService';
const half = num =>{
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
  margin-bottom: 14px;
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
`
export default class extends Component {

  state={
    address: "",
    subnode: "",
    searchValue: "",
  }

  handleInputChange = (e) =>{
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSetSubnodeOwner = () => {
    if (/[a-zA-Z0-9]+/g.test(this.state.subnode) === false) return alert('Subdomain incorrect');
    const { searchValue, metaMask, web3, owner } = this.props.reoverData;
    const to = getEthereumRegistryAddress();
    const subnodeData = setSubnodeOwner(searchValue, this.state.subnode, owner);

    web3.eth.sendTransaction({
      from: metaMask.account, 
      to: to,
      value: 0,
      data: subnodeData 
    },(err, result)=> {
      if (err) return alert(err.message);
      alert("Success");
      window.open(getEtherscanUrl(result));
      this.props.SetSubdomainPopClose();
    });

  }
  
  render() {
    const { SetSubdomainPopClose } = this.props;

    return (
      <TOPop>
        <h1>Set Subdomain <a onClick={SetSubdomainPopClose}><img src={closeSvg} alt=""/></a></h1>
        <p>Enter the subdomain name you desire, it will show as  ＜subdomain＞ . christopher.eth </p>
        <InputItem 
            name="subnode" 
            value={this.state.subnode} 
            onChange={this.handleInputChange}
        />
        <SeedBtn onClick={this.handleSetSubnodeOwner}>Create Subdomain</SeedBtn>
      </TOPop>
    )
  }
}
