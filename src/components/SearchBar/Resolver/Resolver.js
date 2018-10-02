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

const AddrResolver = styled.p`
  font-size: 12px;
  color: #848282;
  text-align: left;
  padding: 12px 0px;
`

class Resolver extends Component {

  render() {
    const { resolver, EditResOverFn } = this.props;
    return (
      <div className="setting_box">
        <h3>
          <span>SET RESOLVER</span>
        </h3>
        <TypeList>
          <TitleH1>
            Current Resolver
            <a onClick={EditResOverFn}><img src={IconEdit} alt=""/></a>
          </TitleH1>
          <AddrResolver>{ resolver }</AddrResolver>
        </TypeList>
      </div>
    )
  }
}

export default Resolver;
