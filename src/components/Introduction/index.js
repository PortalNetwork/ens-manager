import React, { Component } from 'react'
import styled from 'styled-components';
import landing from '../../images/landing.png';
const Introduction = styled.div`
	margin-bottom: 25px;
    img {
        width: 100%;
        margin-bottom: 33px;
    }
    h3 {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
    }
    p {
        font-size: 12px;
        line-height: 1.6;
        color: #fff;
    }
`
export default class extends Component {
  render() {
    return (
        <Introduction>
            <img src={landing} alt=""/>
            <h3>Connect DWeb/DApp & Wallet</h3>
            <p>You can easily manage your domain by using ENS Manager, such as set resolver, set top-level domain, bind or set IPFS Hash.</p>
        </Introduction>
    )
  }
}
