import React, { Component } from 'react';
import {getEthereumResolverAddress, getEtherscanUrl} from '../../../lib/web3Service';
import {setText} from '../../../lib/resolverService';

class URL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };

    this.handleSetURL = this.handleSetURL.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleSetURL = () => {
    if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.state.url)) {
      this.props.handleWarningOpen('URL format incorrect');
      return;
    }
    let self = this;
    const to = getEthereumResolverAddress(process.env.ENS_NETWORK);
    const textData = setText(this.props.searchValue, "url", this.state.url);
    this.props.web3.eth.sendTransaction({
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: textData }, function(err, result) {
        if (err) {
          self.props.handleWarningOpen(err.message);
        } else {
          const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
          self.props.handleWarningOpen(tx);
        }
      });
  }

  render() {
    return (
      <div className="setting_box">
        <h3><span>SET URL</span>
        </h3>
        <div className="type_list">
          <div className="type_box">
            <label>Current URL</label>
        <p className="status_check">{this.props.url}</p>
          </div>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
          this.props.owner === this.props.metaMask.account &&
        <div className="type_enter">
          <input 
            type="text" 
            name="url" 
            value={this.state.url} 
            placeholder="https://resolver.portal.network"
            onChange={this.handleInputChange}
            />
        </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
          <button onClick={() => this.handleSetURL()}>Set URL</button>
        }
        </div>
      </div>
    )
  }
}

export default URL;
