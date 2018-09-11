import React, { Component } from 'react';
import {getEthereumResolverAddress, getEthereumRegistryAddress} from '../../../lib/web3Service';
import {setResolver} from '../../../lib/registryService';
import Tooltip from 'material-ui/Tooltip';
import { Error } from 'material-ui-icons';
import './Resolver.css';

class Resolver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resolverAddr: ""
    };

    this.handleDefaultResolver = this.handleDefaultResolver.bind(this);
    this.handleSetResovler = this.handleSetResovler.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleDefaultResolver = () => {
    const resolverAddr = getEthereumResolverAddress();
    this.setState({resolverAddr});
    this.props.handleWarningOpen("Default resolver is deploy by Ethereum Foundation to resolve the ENS domain");
  }

  handleSetResovler = () => {
    if (this.state.resolverAddr.length !== 42) {
      this.props.handleWarningOpen('Resolver hash incorrect');
      return;
    }
    let self = this;
    const to = getEthereumRegistryAddress();
    const resolverData = setResolver(this.props.searchValue, this.state.resolverAddr);
    this.props.web3.eth.sendTransaction({
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: resolverData }, function(err, result) {
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
        <h3>
          <span>SET RESOLVER</span>
          <Tooltip title="Set a resolver for your ENS name. This will allow you to set address or IPFS hash that your name will resolve to.">
            <Error/>
          </Tooltip>
        </h3>
        <div className="type_list">
          <div className="type_box">
            <label>Domain Owner</label>
            <p>{this.props.owner}</p>
          </div>
          <div className="type_box">
            <label>Resolver</label>
            <p className="status_check">{this.props.resolver}{ this.props.resolver !== '0x0000000000000000000000000000000000000000' && 
              <span className="icon_check"></span>
            }</p>
          </div>
          { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
            this.props.owner === this.props.metaMask.account &&
            <div className="type_enter">
              <input type="text" name="resolverAddr" value={this.state.resolverAddr} placeholder={getEthereumResolverAddress()} onChange={this.handleInputChange}/>
              <a href="javascript:;" className="setting_btn" onClick={() => this.handleDefaultResolver()}>Default
                {/* <Tooltip title="Default resolver is deploy by Ethereum Foundation to resolve the ENS domain"></Tooltip> */}
              </a>
            </div>
          }
          { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
            this.props.owner === this.props.metaMask.account &&
            <button type="button" onClick={() => this.handleSetResovler()}>Set Resolver</button>
          }
        </div>
      </div>
    )
  }
}

export default Resolver;
