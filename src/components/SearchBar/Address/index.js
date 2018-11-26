import React, { Component } from 'react';
import IconEdit from '../../../images/ic-edit.svg'
import styled from 'styled-components';

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

const Address = styled.p`
  font-size: 12px;
  color: #848282;
  text-align: left;
  padding: 12px 0px;
`

export default class extends Component {

  state = {
    address: ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  }

  handleDefaultAddress = () => {
    const address = this.props.owner;
    this.setState({address});
  }

  render() {
    const { address, SetAddressOpen, searchValue2 } = this.props;
    return (
      <div className="setting_box">
        <h3>
          <span>ADDRESS</span>
        </h3>

        <TypeList>
          <TitleH1>
            Current Address :【 {searchValue2 }】
            <a onClick={SetAddressOpen}><img src={IconEdit} alt=""/></a>
          </TitleH1>
          <Address>{address}</Address>
        </TypeList>

      </div>
    )
  }
}
