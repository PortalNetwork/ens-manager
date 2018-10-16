import React, { Component } from 'react';
import styled from 'styled-components';
import FileUpload from "../FileUpload";
// import {getEthereumResolverAddress} from '../../../lib/web3Service';
// import {setContent} from '../../../lib/resolverService';
import IconEdit from '../../../images/ic-edit.svg'
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

const Ipfs = styled.p`
  font-size: 12px;
  color: #848282;
  text-align: left;
  padding: 12px 0px;
`

export default class extends Component {

  state = {
    ipfs: "",
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // handleSetIPFSHash = () => {
  //   if (this.state.ipfs.length !== 46) {
  //     this.props.handleWarningOpen('IPFS Hash incorrect');
  //     return;
  //   }
  //   const to = getEthereumResolverAddress();
  //   const ipfsData = setContent(this.props.searchValue, this.state.ipfs);
  //   this.props.web3.eth.sendTransaction({
  //     from: this.props.metaMask.account, 
  //     to: to,
  //     value: 0,
  //     data: ipfsData },(err, result)=> {
  //       if (err) {
  //         this.props.handleWarningOpen(err.message);
  //       } else {
  //         const tx = <span className="tx">Tx: <a href={`https://etherscan.io/tx/${result}`} target="_blank">{result}</a></span>;
  //         this.props.handleWarningOpen(tx);
  //       }
  //     });
  // }

  render() {
    const { ipfsHash, SetIpfsOpen } = this.props;

    return (
      <div className="setting_box">
        <h3><span>SET IPFS HASH</span></h3>

        <TypeList>
          <TitleH1>
            Current IPFS Hash
            <a onClick={SetIpfsOpen}><img src={IconEdit} alt=""/></a>
          </TitleH1>
         
          <Ipfs>
            {
              ipfsHash === '' ? "Currently there's no IPFS Hash has been connected." : ipfsHash
            }
          </Ipfs>
        </TypeList>
        
        <FileUpload {...this.props}/>
      </div>
    )
  }
}
