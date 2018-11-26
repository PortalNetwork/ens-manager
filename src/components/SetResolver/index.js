import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import closeSvg from "../../images/ic-close.svg";
import { getEthereumResolverAddress, getEthereumRegistryAddress, getEtherscanUrl } from '../../lib/web3Service';
import { setResolver } from '../../lib/registryService';
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

const ResoverInout = styled.input`
  width: 287px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: SFProText;
  font-size: 12px;
  color: #303030;
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
const SerResoverBtn = styled.a`
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
    resolverAddr: ""
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleDefaultResolver = (callback) => {
    const resolverAddr = getEthereumResolverAddress();
    console.log('resolverAddr:',resolverAddr);
    this.setState({resolverAddr: resolverAddr}, ()=>{
      if(callback) callback();
    });
  }

  handleSetResovler = (type) => {
    const { handleClose } = this.props;
    if(type === "Default"){
      return this.handleDefaultResolver(()=> this.gotoSetResovler());
    }
    if (this.state.resolverAddr.length !== 42) {
      handleClose();
      return alert("Resolver hash incorrect")
    }
    this.gotoSetResovler();
  }

  gotoSetResovler = () =>{
    const { handleClose } = this.props;
    const {web3, searchValue, metaMask, handleWarningOpen} = this.props;
    const to = getEthereumRegistryAddress();
    const resolverData = setResolver(searchValue, this.state.resolverAddr);
    web3.eth.sendTransaction({
      from: metaMask.account, 
      to: to,
      value: 0,
      data: resolverData 
    }, (err, result)=> {
        if (err) {
          handleClose();
          return handleWarningOpen(err.message);
        }
        const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
        handleClose();
        handleWarningOpen(tx);
    });
  }


  render() {
    const { resolverAddr } = this.state
    const { handleClose } = this.props;
    return (
      <SetResoverPop>
        <h1>Set Resolver <a onClick={handleClose}><img src={closeSvg} alt=""/></a></h1>
        <p>Enter the resolver you assigned, or use the default value to complete the setup.</p>
            <div>
                <ResoverInout
                  type="text" 
                  name="resolverAddr" 
                  value={resolverAddr} 
                  placeholder={getEthereumResolverAddress()} 
                  onChange={this.handleInputChange}
                >
                </ResoverInout>
                
                <BtnBox>
                  <SerResoverBtn onClick={ ()=> this.handleSetResovler('Default')}>Set Default</SerResoverBtn>
                  <SerResoverBtn Resolver onClick={ ()=> this.handleSetResovler()}>Set Resolver</SerResoverBtn>
                </BtnBox>
            </div>
        {/* } */}
      </SetResoverPop>
    )
  }
}
