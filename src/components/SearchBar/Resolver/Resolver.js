import React, { Component } from 'react';
// import {getEthereumResolverAddress, getEthereumRegistryAddress} from '../../../lib/web3Service';
// import { setResolver } from '../../../lib/registryService';
import IconEdit from '../../../images/ic-edit.svg'
import styled from 'styled-components';

const TypeList = styled.div`
  width: 100%;
  height: 94px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
`;

const TitleH1 = styled.h1`
    position: relative;
    font-family: SFProText;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.6;
    color: #707070;
    >a{
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 3px;
      display: block;
      width: 16px;
      height: 16px;
    }
`;

const AddrResolver = styled.p`
  font-size: 12px;
  color: #848282;
  text-align: left;
  padding: 12px 0px;
`

class Resolver extends Component {

  // state = {
  //   resolverAddr: ""
  // }

  // handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value.toLowerCase() });
  // }

  // handleDefaultResolver = () => {
  //   const resolverAddr = getEthereumResolverAddress();
  //   this.setState({resolverAddr});
  // }

  // handleSetResovler = () => {
  //   if (this.state.resolverAddr.length !== 42) {
  //     this.props.handleWarningOpen('Resolver hash incorrect');
  //     return;
  //   }
    
  //   const to = getEthereumRegistryAddress();
  //   const resolverData = setResolver(this.props.searchValue, this.state.resolverAddr);
  //   this.props.web3.eth.sendTransaction({
  //     from: this.props.metaMask.account, 
  //     to: to,
  //     value: 0,
  //     data: resolverData }, (err, result)=> {
  //       if (err) {
  //         this.props.handleWarningOpen(err.message);
  //       } else {
  //         const tx = <span className="tx">Tx: <a href={`https://etherscan.io/tx/${result}`} target="_blank">{result}</a></span>;
  //         this.props.handleWarningOpen(tx);
  //       }
  //     });
  // }

  render() {
    const { resolver, EditResOverFn } = this.props;
    console.log('resolver:',resolver);
    return (
      <div className="setting_box">
        <h3>
          <span>SET RESOLVER</span>
        </h3>
        <TypeList>
          <TitleH1>
            Current Resolver
            <a onClick={EditResOverFn}><img src={IconEdit} alt=""/></a>
          </TitleH1>
          <AddrResolver>{ resolver }</AddrResolver>
        </TypeList>
      </div>
    )
  }
}

export default Resolver;
