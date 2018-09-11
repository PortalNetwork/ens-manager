import React, { Component } from 'react';
import {decryptLabel} from '../../../../apis/api';
import './Labels.css';

class Labels extends Component {

  state = {
    subdomain: "",
    searchValue: ""
  }

  componentDidMount() {
    const {labelHash, searchValue} = this.props;
    //console.log("labelHash=>", labelHash);
    decryptLabel([labelHash]).then(result => {
      console.log(result.data[0]);
      this.setState({subdomain: result.data[0], searchValue})
    })
  }

  render() {
    const {subdomain} = this.state;
    return (
      <div className="type_list">
        <ul className="domain_list">
          <li>{subdomain}.{this.state.searchValue}</li>
        </ul>
      </div>
    )
  }
}

export default Labels;
