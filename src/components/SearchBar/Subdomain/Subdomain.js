import React, { Component } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import bulletpng from "../../../images/bullet.png";
import syncpng from "../../../images/ic-sync.svg";
import linkIcon from '../../../images/ic-link.svg'
import addIcon from '../../../images/ic-add.svg'
import { getEthereumRegistryAddress } from '../../../lib/web3Service';
import { setSubnodeOwner, newOwnerEvent } from '../../../lib/registryService';
import { decryptLabel } from '../../../apis/api';
import Loading from '../../Loading/Loading';
const SettingBox = styled.div`
    >h3{
        position: relative;
        margin-top: 30px;
        margin-bottom: 18px;
        padding: 0px 0px 0px 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:before{
            content: "";
            display: block;
            width: 20px;
            height: 20px;
            background: url(${props => (props.bulletpng)}) top left no-repeat;
            background-size: 100% auto;
            position: absolute;
            left: 0px;
            top: -6px;
        }
        >span{
            font-size: 12px;
            font-weight: 600;
            color: #fff;
        }
        >a{
          cursor: pointer;
        }
    }
`;

const TitleH1 = styled.h1`
    position: relative;
    font-family: SFProText;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.6;
    color: #707070;
    margin-bottom: 15px;
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

const Rectangle = styled.div`
  width: 100%;
  height: auto;
  max-height: 300px;
  overflow: auto;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 20px 24px 28px 24px;
`

const DemainItem = styled.li`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  border-bottom: dotted 2px rgba(145, 168, 239, 0.3);
  display: flex;
  align-items: center;
  >img{
    margin-right: 13px;
  }
`


class Subdomain extends Component {

  state = {
    newOwner: "",
    subnode: "",
    searchValue: "",
    labels: [],
    labelHash:"",
    subdomain: [],
    searchValueitem: "",
    subdomainArray: [],
    isItemShow: false
  };
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleWeb3Load = async () => {
    if (window.web3 === null) return 
    let web3 = new Web3(window.web3.currentProvider);
    const newOwnerEvents = await newOwnerEvent(web3, this.props.searchValue);
    let labelsArr = [];
    let unique = null;

    newOwnerEvents.watch((error, result) => {
      if (error) return console.log('error', error);
      labelsArr.push(result.args.label.substring(2));
      unique = Array.from(new Set(labelsArr));
    })

    setTimeout(() => {
      this.setState({labels: unique},()=> this.labelsMap(this.state.labels));
    }, 15000);

  }

  labelsMap = labels =>{
    let labelsArr = labels == null ? [] : labels;
    let labelHash = [];
    let BidLength = labelsArr.length;
    // let idx = 0;
    if(BidLength!=0){
      labelsArr.forEach(async hash => {
        let dL = await decryptLabel([hash]);
        // idx ++;
        labelHash.push(dL.data[0]);
        let result = [...(new Set(labelHash))];
        this.subdomainCombination(result);
      });
    }else{
      this.setState({"isItemShow": true});
    }
    
  }

  subdomainCombination = (result) =>{
    const { searchValue } = this.state;
    let arr = [];
    result.forEach((item, idx) =>{
      if(item !== null){
        arr.push(`${item}.${searchValue}`);
      }
      if(idx === result.length - 1){
        this.setState({"subdomainArray": arr, "isItemShow": true})
      }
    })
  }

  componentDidMount(){
    const value = this.props.searchValue;
    this.setState({ searchValue: value })
    this.handleWeb3Load();
  }

  render() {
    // const domain = this.state.searchValue;
    const { subdomainArray } = this.state;
    const { SetSubdomainPopOpen, handleSearchItemClick } = this.props;
    // const label = (this.state.subnode.length > 0) ? this.state.subnode + "." + domain : "<subdomain>." + domain;
    return (
      <SettingBox bulletpng={bulletpng}>
        <h3>
          <span>SET SUBDOMAIN</span>
          <a onClick={handleSearchItemClick}><img src={syncpng} alt=""/></a>
        </h3>
          { 
            !this.state.isItemShow ? 
            <Loading/> : 
            <Rectangle>
              <TitleH1>
                Current Subdomain
                <a onClick={SetSubdomainPopOpen}><img src={addIcon} alt=""/></a>
              </TitleH1>
                <ul>
                  {
                    subdomainArray.map(domain =>{
                      return (
                        <DemainItem key={domain}>
                          <img src={linkIcon} alt=""/>
                          {domain}
                        </DemainItem>
                      )
                    })
                  }
                </ul>
            </Rectangle>
          }
        {/* <div className="setting_box">
          <h3>
            <span>SUBDOMAIN LIST</span>
            <Button size="small" onClick={() => this.handleWeb3Load()}><Cached/></Button>
          </h3>
          { 
            this.state.labels.map((hash,idx) => {
              return (
                <Labels labelHash={hash} searchValue={searchValue} key={idx}/>
              )
            })
          }
        </div> */}

        {/* <div className="type_list">
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
      </div> */}
    </SettingBox>
    )
  }
}

export default Subdomain;
