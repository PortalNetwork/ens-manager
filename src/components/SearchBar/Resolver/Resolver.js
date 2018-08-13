import React, { Component } from 'react';
import {getEthereumResolverAddress, getEthereumRegistryAddress} from '../../../lib/web3Service';
import {setResolver} from '../../../lib/registryService';
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
      <div className="resolver">
        <h1>STEP 1. SET RESOLVER</h1>
        <p className="titleinfo"><b>Owner:</b> {this.props.owner}</p>
        <p className="titleinfo"><b>Resolver:</b> {this.props.resolver}</p>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
          this.props.owner === this.props.metaMask.account &&
        <div className="setResolver">
          <input 
            type="text" 
            name="resolverAddr" 
            value={this.state.resolverAddr} 
            placeholder={getEthereumResolverAddress()}
            onChange={this.handleInputChange}
            />
          <a className="defaultResolver" onClick={() => this.handleDefaultResolver()}>
            <p>Default Resolver</p>
          </a>
        </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
        <p className="setResolverBtn">
          <button onClick={() => this.handleSetResovler()}>Set Resolver</button>
        </p>
        }
      </div>
    )
  }
}

export default Resolver;
