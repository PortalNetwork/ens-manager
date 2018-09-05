import React, { Component } from 'react';
import {getEthereumResolverAddress} from '../../../lib/web3Service';
import {setContent} from '../../../lib/resolverService';
import Tooltip from 'material-ui/Tooltip';
import { Error, CheckCircle } from 'material-ui-icons';
import './IPFS.css';

class IPFS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfs: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetIPFSHash = this.handleSetIPFSHash.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSetIPFSHash = () => {
    if (this.state.ipfs.length !== 46) {
      this.props.handleWarningOpen('IPFS Hash incorrect');
      return;
    }
    let self = this;
    const to = getEthereumResolverAddress();
    const ipfsData = setContent(this.props.searchValue, this.state.ipfs);
    this.props.web3.eth.sendTransaction({
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: ipfsData }, function(err, result) {
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
      <div className="ipfs">
        <h1>SET IPFS HASH
          <Tooltip title="Set an IPFS hash that your ENS name will resolve to.">
            <Error/>
          </Tooltip>
        </h1>
        <p className="titleinfo"><b>Current IPFS Hash:&nbsp;</b> {this.props.ipfsHash}&nbsp;
          { this.props.ipfsHash !== '0x0000000000000000000000000000000000000000000000000000000000000000' && 
            <CheckCircle/>
          }
        </p>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
        <div className="setIPFS">
          <input 
            type="text" 
            name="ipfs" 
            value={this.state.ipfs} 
            placeholder="QmSpuwejUGjREmgsvm8eq3ZdsS7mVTHCRPZmLiUq84S9x8" 
            onChange={this.handleInputChange}/>
        </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
        <p className="setIPFSBtn">
          <button onClick={() => this.handleSetIPFSHash()}>Set IPFS Hash</button>
        </p>
        }
      </div>
    )
  }
}

export default IPFS;