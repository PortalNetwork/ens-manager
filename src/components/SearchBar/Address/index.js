import React, { Component } from 'react';
import {getEthereumResolverAddress} from '../../../lib/web3Service';
import {setAddress} from '../../../lib/resolverService';
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

const Address = styled.p`
  font-size: 12px;
  color: #848282;
  text-align: left;
  padding: 12px 0px;
`

export default class extends Component {

  state = {
    address: ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleDefaultAddress = () => {
    const address = this.props.owner;
    this.setState({address});
  }

  // handleSetAddress = () => {
  //   if (this.state.address.length !== 42) {
  //     this.props.handleWarningOpen('Address hash incorrect');
  //     return;
  //   }
  //   const to = getEthereumResolverAddress();
  //   const addressData = setAddress(this.props.searchValue, this.state.address);
  //   this.props.web3.eth.sendTransaction({
  //     from: this.props.metaMask.account, 
  //     to: to,
  //     value: 0,
  //     data: addressData }, (err, result)=> {
  //       if (err) {
  //         // this.props.handleWarningOpen(err.message);
  //       } else {
  //         // const tx = <span className="tx">Tx: <a href={`https://etherscan.io/tx/${result}`} target="_blank">{result}</a></span>;
  //         // this.props.handleWarningOpen(tx);
  //       }
  //     });
  // }

  render() {
    const { address, SetAddressOpen } = this.props;
    return (
      <div className="setting_box">
        <h3>
          <span>ADDRESS</span>
        </h3>
        <TypeList>
          <TitleH1>
            Current Address
            <a onClick={SetAddressOpen}><img src={IconEdit} alt=""/></a>
          </TitleH1>
          <Address>{address}</Address>
        </TypeList>

        {/* <div className="type_list">
          <div className="type_box">
            <label>Current Address</label>
        <p className="status_check">{this.props.address}&nbsp;
          { this.props.address !== '0x0000000000000000000000000000000000000000' && 
            <span className="icon_check"></span>
          }
        </p>
          </div>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
          this.props.owner === this.props.metaMask.account &&
        <div className="type_enter">
          <input 
            type="text" 
            name="address" 
            value={this.state.address} 
            placeholder="0x0000000000000000000000000000000000000000"
            onChange={this.handleInputChange}
            />
          <a className="setting_btn" onClick={() => this.handleDefaultAddress()}>
            <p>Your Address</p>
          </a>
        </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
          <button onClick={() => this.handleSetAddress()}>Set Address</button>
        }
        </div> */}
      </div>
    )
  }
}
