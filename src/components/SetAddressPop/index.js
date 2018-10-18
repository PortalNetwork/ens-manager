import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import closeSvg from "../../images/ic-close.svg";
import { getEthereumResolverAddress, getEtherscanUrl } from '../../lib/web3Service';
import { setAddress } from '../../lib/resolverService';
const half = num =>{
  return `${-(num / 2)}px`
}
const SetResoverPop = styled.div`
    position: fixed;
    width: 335px;
    height: 226px;
    border-radius: 6px;
    background-color: rgba(5, 21, 74, 0.95);
    top: 50%;
    left: 50%;
    margin-left: ${half(335)};
    margin-top: ${half(226)};
    padding: 20px 24px;
    >h1{
      display: block;
      width: 100%;
      position: relative;
      font-family: SFProText;
      font-size: 14px;
      line-height: 1.3;
      color: #ffffff;
      >a{
        cursor: pointer;
        position: absolute;
        top: 0;
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

const AddressInout = styled.input`
  width: 287px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: SFProText;
  font-size: 12px;
  color: #aeaeae;
  padding-left: 11px;
  margin-top: 20px;
`
const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`
const SerAddressBtn = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 138.5px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px rgba(255, 255, 255, 0.5);
  font-family: SFProText;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;

  ${props => props.Resolver && css`
    background-color: #314184;
    border: 0px;
  `}
`

export default class extends Component {

  state = {
    address: "",
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }


  handleSetAddress = () => {
    if (this.state.address.length !== 42){
        alert('Address hash incorrect');
    //   this.props.handleWarningOpen('Address hash incorrect');
        return;
    }

    const { searchValue, metaMask, web3, handleWarningOpen } = this.props.reoverData;
    const to = getEthereumResolverAddress();
    const addressData = setAddress(searchValue, this.state.address);

    web3.eth.sendTransaction({
      from: metaMask.account, 
      to: to,
      value: 0,
      data: addressData 
    }, (err, result)=> {
        if (err) return handleWarningOpen(err.message);
        // alert("Success");
        // window.open(getEtherscanUrl(result));
        this.props.SetAddressClose();
        const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
        handleWarningOpen(tx);
    });
  }

  componentDidMount(){
    console.log(this.props);
  }

  SetDefaultBtn = (account) =>{
    this.setState({address: account},()=> this.handleSetAddress());
  }


  render() {
    const { SetAddressClose } = this.props;
    const { metaMask } = this.props.reoverData;

    return (
      <SetResoverPop>
        <h1>Set Resolver <a><img onClick={SetAddressClose} src={closeSvg} alt=""/></a></h1>
        <p>Enter the resolver you assigned, or use the default value to complete the setup.</p>
        <div>
            <AddressInout
                type="text" 
                name="address" 
                value={this.state.address} 
                placeholder={metaMask.account} 
                onChange={this.handleInputChange}
            >
            </AddressInout>
            <BtnBox>
                <SerAddressBtn onClick={()=>this.SetDefaultBtn(metaMask.account)}>Set Default</SerAddressBtn>
                <SerAddressBtn Resolver>Set Address</SerAddressBtn>
            </BtnBox>
        </div>
      </SetResoverPop>
    )
  }
}
