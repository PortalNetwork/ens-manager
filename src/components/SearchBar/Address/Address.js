import React, { Component } from 'react';
import {getEthereumResolverAddress} from '../../../lib/web3Service';
import {setAddress} from '../../../lib/resolverService';
import Tooltip from 'material-ui/Tooltip';
import { Error, CheckCircle } from 'material-ui-icons';
import './Address.css';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };

    this.handleDefaultAddress = this.handleDefaultAddress.bind(this);
    this.handleSetAddress = this.handleSetAddress.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleDefaultAddress = () => {
    const address = this.props.owner;
    this.setState({address});
  }

  handleSetAddress = () => {
    if (this.state.address.length !== 42) {
      this.props.handleWarningOpen('Address hash incorrect');
      return;
    }
    let self = this;
    const to = getEthereumResolverAddress(process.env.ENS_NETWORK);
    const addressData = setAddress(this.props.searchValue, this.state.address);
    this.props.web3.eth.sendTransaction({
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: addressData }, function(err, result) {
        if (err) {
          self.props.handleWarningOpen(err.message);
        } else {
          const tx = <span className="tx">Tx: <a href={`https://etherscan.io/tx/${result}`} target="_blank">{result}</a></span>;
          self.props.handleWarningOpen(tx);
        }
      });
  }

  render() {
    return (
      <div className="setting_box">
        <h3><span>SET ADDRESS</span>
          {/*<Tooltip title="Set an address that your ENS name will resolve to.">
            <Error/>
          </Tooltip>*/}
        </h3>
        <div className="type_list">
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
        </div>
      </div>
    )
  }
}

export default Address;
