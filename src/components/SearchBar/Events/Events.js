import React, { Component } from 'react';
import {newOwnerEvent} from '../../../lib/registryService';
import Labels from './Labels/Labels';
import Web3 from 'web3';
import { Cached } from 'material-ui-icons';
import Button from 'material-ui/Button';
import './Events.css';


let labelsArr = [];
class Events extends Component {

  state = {
    labels: []
  }

  componentDidMount() {
    this.handleWeb3Load();
  }
  
  handleWeb3Load = async () => {
    if (window.web3 !== null) {
      let web3 = new Web3(window.web3.currentProvider);
      const newOwnerEvent = await newOwnerEvent(web3, this.props.searchValue);
      newOwnerEvent.watch((error, result) => {
        if (error) {
          console.log('error', error)
        } else {
          labelsArr.push(result.args.label.substring(2));
          let unique = Array.from(new Set(labelsArr));
          this.setState({labels: unique});
        }
      });
    }
  }

  render() {
    const {searchValue} = this.props;
    return (
      <div className="setting_box">
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
      </div>
    )
  }
}

export default Events;
