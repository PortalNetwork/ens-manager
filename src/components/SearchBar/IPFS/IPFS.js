import React, { Component } from 'react';
import {getEthereumResolverAddress} from '../../../lib/web3Service';
import {setContent} from '../../../lib/resolverService';
import Tooltip from 'material-ui/Tooltip';
import { Error, CheckCircle } from 'material-ui-icons';
import './IPFS.css';
import wanUtil from 'wanchain-util';


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

  handleSetIPFSHash = async () => {

    if (this.state.ipfs.length !== 46) {
      this.props.handleWarningOpen('IPFS Hash incorrect');
      return;
    }
    let self = this;
    const web3 = this.props.web3
    const to = getEthereumResolverAddress();
    const ipfsData = setContent(this.props.searchValue, this.state.ipfs);
    const from = this.props.metaMask.account;
    const nonceOrigin = await this.getNonce(this.props.web3, from);
    const nonce = `0x${nonceOrigin.toString(16)}`;
    // const gasPrice = `0x${(200000000000).toString(16)}`;
    const gasPrice = await this.getGasPrices(this.props.web3);
    

    const txnObject = {
      Txtype: '0x01',
      nonce: nonce,
      gasPrice: gasPrice, 
      from: from, 
      to: to,
      value: '0x00',
      data: ipfsData,
    };

    // SAMPLE: sendRawTransaction
    // web3.eth.estimateGas(txnObject, function(err, result){
    //   const estimateGas = result
    //   const estimateGasHex = web3.toHex(estimateGas);
    //   txnObject.gasLimit = estimateGasHex;
    //   const hexPrivateKey = Buffer.from(window.privateKey, 'hex');
    //   console.log("txnObject", txnObject)
    //   const tx = new wanUtil.wanchainTx(txnObject);
    //   tx.sign(hexPrivateKey);
    //   const rawTxHash = `0x${tx.serialize().toString('hex')}`;

    //   const transactionHash = web3.eth.sendRawTransaction(rawTxHash, function(err, txHash) {
    //     if (err) {
    //       console.log("RawTransaction:", err);
    //     } else {
    //       console.log("RawTransaction:", txHash);
    //     }
    //   });
    // });

    
    
    console.log("tx from:", from, "tx to:", to);
    try{

      var batch = web3.createBatch();
      
      batch.add(
        web3.eth.sendTransaction.request(txnObject, 
          function(err, result) {
            if (err) {
              console.log("err00:", err.message);
              self.props.handleWarningOpen(err.message);
            } else {
              const tx = <span className="tx">Tx: <a href={`http://47.104.61.26/block/trans/${result}`} target="_blank">Press Me</a></span>;
              self.props.handleWarningOpen(tx);
              console.log("result00:", result);
            }
          }
        )
      );

      batch.add(
        web3.eth.getTransactionCount.request(from, function(err, result){
          if(err) {
            console.log("err2", err);
          } else {
            console.log("result2:", result);
          }
        })
      );

      batch.add(
        web3.eth.getBlock.request("latest", function(error,result){
          if(error){
              console.log("err1:", error);
          } else {
            console.log("resutl1:", result);
          }
        })
      );

      batch.add(
        web3.eth.getBalance.request(from, function (error, result) {
          if (!error) {
              console.log("result3:", result);
          } else {
              // const balance = web3.fromWei(result,'ether').toFixed(2);
              // console.log("balance", balance)
              console.error("error3:", error);
          }
        })
      );

      batch.execute();

    } catch(error) {
      console.log("error:", error);
    }
  }

  getGasPrices = (web3) => {
    return new Promise((resolve, reject) => {
      web3.eth.getGasPrice(function(err, gasPrice){
        if(err) {
          reject(err);
          return;
        }
        resolve(gasPrice);
      })
    })
  }

  getNonce = (web3, from) => {
    return new Promise((resolve, reject) => {
      web3.eth.getTransactionCount(from, function(err, value) {
        if(err) {
          reject(err);
          return;
        }
        resolve(value);
      });
    })
  }

  render() {
    return (
      <div className="setting_box">
        <h3><span>SET IPFS HASH</span>
          {/*<Tooltip title="Set an IPFS hash that your ENS name will resolve to.">
            <Error/>
          </Tooltip>*/}
        </h3>
        <div className="type_list">
        <div className="type_box">
        <label>Current IPFS Hash</label>
        <p className="status_check">{this.props.ipfsHash}
          { this.props.ipfsHash !== '0x0000000000000000000000000000000000000000000000000000000000000000' && 
            <span className="icon_check"></span>
          }
        </p>
        </div>
        { this.props.owner !== '0x0000000000000000000000000000000000000000' && 
          this.props.owner === this.props.metaMask.account &&
        <div className="type_box">
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
          <button onClick={() => this.handleSetIPFSHash()}>Set IPFS Hash</button>
        }
        </div>
      </div>
    )
  }
}

export default IPFS;