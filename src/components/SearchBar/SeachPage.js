import React, { Component } from 'react'
import styled from 'styled-components';
import Introduction from '../Introduction';
import identity from '../../images/identity.svg';
const IdentityBtn = styled.a`
    cursor: pointer;
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 4px;
    background-color: rgba(5, 21, 74, 0.9);
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    >img{
      width: 46px;
      height: 35px;
      margin-right: 20px;
    }
    >div{
      >h1 ,>p{
        color: #fff;
      }
      >h1{
        font-family: SFProText;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.73;
        letter-spacing: 0.6px;
        color: #ffffff;
      }
      >p{
        font-family: SFProText;
        font-size: 12px;
        letter-spacing: 0.4px;
        color: #ffffff;
      }
    }
`
const IdentityText = styled.p`
    font-family: SFProText;
    font-size: 12px;
    line-height: 1.6;
    text-align: center;
    color: #6878ad;
    margin-bottom: 16px;

`
export default class extends Component {
  render() {
    const {
      isSeach, searchValue, isIdentityBtn,
      handleSearchItem, handleInputChange, handleSearchItemClick, SeachPageSwitch
    } = this.props;
    return (
      <div id="SeachPage">
        <Introduction
          isSeach={isSeach}
        />
        <div className="search_bar">
          <input type="text"
            className="search_type"
            onKeyDown={handleSearchItem}
            name="searchValue"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Your Domain Name"
          />
          <a href="javascript:;" className="search_icon" onClick={handleSearchItemClick}></a>
        </div>

        <IdentityText>The wallet address you choose to logged in must be the owner of the domain to be able to manage it.</IdentityText>
        {
          isIdentityBtn &&
          <IdentityBtn onClick={() => SeachPageSwitch(1)}>
            <img src={identity} alt="" />
            <div>
              <h1>Get your exclusive identity</h1>
              <p>Claim domain name as your wallet address.</p>
            </div>
          </IdentityBtn>
        }
      </div>
    )
  }
}
