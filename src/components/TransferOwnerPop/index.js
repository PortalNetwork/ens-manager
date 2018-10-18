import React, { Component } from 'react'
import styled from 'styled-components';
import closeSvg from "../../images/ic-close.svg";
import { getEthereumRegistrarAddress, getEtherscanUrl } from '../../lib/web3Service';
import { transfer } from '../../lib/registrarService';
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

const Title = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-top: dotted 2px rgba(145, 168, 239, 0.2);
  border-bottom: dotted 2px rgba(145, 168, 239, 0.2);
  margin-top: 15px;
  padding: 15px 0;
  >h2{
    font-family: SFProText;
    font-size: 10px;
    font-weight: bold;
    line-height: 1.6;
    color: #ffffff;
  }
  >p{
    font-family: SFProText;
    font-size: 12px;
    line-height: 1.6;
    letter-spacing: 0.6px;
    color: #ffffff;
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

const TransferBtn = styled.a`
  cursor: pointer;
  width: 287px;
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
  }

  handAddress = (e) =>{
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  seedTransFerAddress = () =>{
    if(this.state.address === "") return alert("Address must not be empty");
    if(this.state.address.length < 42) return alert("Address format error");
    const { searchValue, web3, metaMask, handleWarningOpen } = this.props.reoverData;
    const to = getEthereumRegistrarAddress();
    const subnodeData = transfer(searchValue.replace(".eth", ""), this.state.address);
    web3.eth.sendTransaction({
      from: metaMask.account, 
      to: to,
      value: 0,
      data: subnodeData 
    },(err, result)=> {
      if (err) return handleWarningOpen(err.message);
      // alert("Success");
      // window.open(getEtherscanUrl(result));
      this.props.TransferOwnerClose();
      const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
      handleWarningOpen(tx);
    });
  }

  render() {
    const { TransferOwnerClose } = this.props;
    const { searchValue } = this.props.reoverData;
    return (
      <TOPop>
        <h1>Transfer Domain Name Owner <a onClick={TransferOwnerClose}><img src={closeSvg} alt=""/></a></h1>
        <p>Domain transfer needs to wait for the transaction to be confirmed, you won’t be able to access it during this period</p>
        <Title>
          <h2>TRANSFERING DOMAIN NAME</h2>
          <p>{searchValue}</p>
        </Title>

        <InputItem name="address" value={this.state.address} onChange={this.handAddress} placeholder="Transferred address"/>

        <TransferBtn onClick={this.seedTransFerAddress}>Transfer</TransferBtn>
      
      </TOPop>
    )
  }
}
