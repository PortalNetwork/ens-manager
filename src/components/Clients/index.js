import React, { Component } from 'react';
import styled from 'styled-components';
import metamask from '../../images/metamask.png';
import status from '../../images/status.png';
import toshi from '../../images/toshi.png';
import Introduction from '../Introduction'
const ClientsDiv = styled.div`
    max-width: 480px;
    width: 100%;
    height: auto;
    min-height: 600px;
    margin: 0px auto;
    padding: 20px 20px 20px 20px;
    background-color: #1f398f;
    box-sizing: border-box;
    @media screen and (max-width: 720px) {
        min-height: 500px;
    }
`
class Clients extends Component {
    render() {
        return (
            <ClientsDiv>
                <Introduction/>
                <div className="wallet">
                    <a href="https://metamask.io/" target="_blank" className="wallet_list"><img src={metamask} alt=""/><p>Metamask</p></a>
                    <a href="https://status.im/" target="_blank" className="wallet_list"><img src={status} alt=""/><p>Status</p></a>
                    <a href="https://wallet.coinbase.com/" target="_blank" className="wallet_list"><img src={toshi} alt=""/><p>Coinbase Wallet</p></a>
                </div>
            </ClientsDiv>
        )
    }
}

export default Clients;
