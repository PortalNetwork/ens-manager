import React, { Component } from 'react';
import {getEthereumResolverAddress, getEthereumRegistryAddress, getTransactionExplorerURL} from '../../../lib/web3Service';
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
      Txtype: '0x01',
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: resolverData }, function(err, result) {
        if (err) {
          console.log("set resolver err:", err);
          self.props.handleWarningOpen(err.message);
        } else {
          console.log("set resolver result:", result);
          let explorerUrl = getTransactionExplorerURL(process.env.ENS_NETWORK)
          const tx = <span className="tx">Tx: <a href={`${explorerUrl}${result}`} target="_blank">Press Me</a></span>;
          self.props.handleWarningOpen(tx);
        }
      });
  }

  render() {
    return (
      <div className="setting_box">
        <h3>
          <span>SET RESOLVER</span>
            {/*<Tooltip title="Set a resolver for your ENS name. This will allow you to set address or IPFS hash that your name will resolve to.">
              <Error/>
            </Tooltip>*/}
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
              <input type="text" name="resolverAddr" value={this.state.resolverAddr} placeholder={getEthereumResolverAddress(process.env.ENS_NETWORK)} onChange={this.handleInputChange}/>
              <a href="javascript:;" className="setting_btn" onClick={() => this.handleDefaultResolver()}>Default
                {/*<Tooltip title="Default resolver is deploy by Ethereum Foundation to resolve the ENS domain"></Tooltip>*/}
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
