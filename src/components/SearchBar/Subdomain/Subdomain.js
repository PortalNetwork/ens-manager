import React, { Component } from 'react';
import {getEthereumRegistryAddress} from '../../../lib/web3Service';
import {setSubnodeOwner} from '../../../lib/registryService';
import Tooltip from 'material-ui/Tooltip';
import { Error } from 'material-ui-icons';
import './Subdomain.css';

class Subdomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOwner: "",
      subnode: "",
      searchValue: ""
    };

    this.handleSetSubnodeOwner = this.handleSetSubnodeOwner.bind(this);
  }

  componentDidMount = () => {
    const value = this.props.searchValue;
    this.setState({ searchValue: value })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleSetSubnodeOwner = () => {
    if (this.state.newOwner.length !== 42) {
      this.props.handleWarningOpen('New Owner hash incorrect');
      return;
    }
    if (/[a-zA-Z0-9]+/g.test(this.state.subnode) === false) {
      this.props.handleWarningOpen('Subdomain incorrect');
      return;
    }
    let self = this;
    const to = getEthereumRegistryAddress(process.env.ENS_NETWORK);
    const subnodeData = setSubnodeOwner(this.props.searchValue, this.state.subnode, this.state.newOwner);
    this.props.web3.eth.sendTransaction({
      from: this.props.metaMask.account, 
      to: to,
      value: 0,
      data: subnodeData }, function(err, result) {
        if (err) {
          self.props.handleWarningOpen(err.message);
        } else {
          const tx = <span className="tx">Tx: <a href={`https://etherscan.io/tx/${result}`} target="_blank">{result}</a></span>;
          self.props.handleWarningOpen(tx);
        }
      });
  }

  render() {
    const label = (this.state.subnode.length > 0) ? this.state.subnode + "." + this.state.searchValue : "<subdomain>." + this.state.searchValue;
    return (

<<<<<<< HEAD
      // <div className="setting_box">
      //   <h3>
      //     <span>SET SUBDOMAIN</span>
      //     <Tooltip title="Set a subdomain for your ENS and an address or an IPFS hash that the subdomain will resolve to.">
      //       <Error/>
      //     </Tooltip>
      //   </h3>
      //   <div class="type_list">
      //     <p>Domain: <span>< subdomain ></span>.christopher.eth</p>
      //     <div class="type_box">
      //       <label>subdomain</label>
      //       <input type="text" placeholder="yourdomain">
      //     </div>
      //     <div class="type_box">
      //       <label>New Owner</label>
      //       <input type="text" class="dasabled" placeholder="yourdomain">
      //     </div>
      //     <button type="button">Create Subdomain</button>
      //   </div>
      // </div>

      <div className="subdomain">
        <h1>SET SUBDOMAIN
=======
      <div className="setting_box">
        <h3>
          <span>SET SUBDOMAIN</span>
>>>>>>> 12fdee802fc9182fe81f0e739bd930962e4c365e
          <Tooltip title="Set a subdomain for your ENS and an address or an IPFS hash that the subdomain will resolve to.">
            <Error/>
          </Tooltip>
        </h3>
        <div className="type_list">
          <p><span>Domain:&nbsp;</span><span>{label}</span></p>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
          this.props.owner === this.props.metaMask.account &&
          <div className="type_box">
          <label>subdomain</label>
          <input 
            type="text"
            name="subnode"
            value={this.state.subnode}
            placeholder="yoursubdomain"
            onChange={this.handleInputChange}
            />
          </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' &&
          this.props.owner === this.props.metaMask.account &&
        <div className="type_box">
          <label>New Owner</label>
          <input 
            type="text" 
            name="newOwner"
            value={this.props.newOwner} 
            placeholder={this.props.owner}
            onChange={this.handleInputChange}
            />
        </div>
        }
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
          <button onClick={() => this.handleSetSubnodeOwner()}>Create Subdomain</button>
        }
      </div>
    </div>
    )
  }
}

export default Subdomain;
