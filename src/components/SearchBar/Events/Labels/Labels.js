import React, { Component } from 'react';
import {decryptLabel} from '../../../../apis/api';
import './Labels.css';

class Labels extends Component {

  state = {
    subdomain: ""
  }

  componentDidMount() {
    const {labelHash} = this.props;
    //console.log("labelHash=>", labelHash);
    decryptLabel([labelHash]).then(result => {
      console.log(result.data[0]);
      this.setState({subdomain: result.data[0]})
    })
  }

  render() {
    const {subdomain} = this.state;
    const {searchValue} = this.props;
    return (
      <div className="labels">
        {subdomain}.{searchValue}
      </div>
    )
  }
}

export default Labels;
