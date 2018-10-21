import React, { Component } from 'react'
import styled from 'styled-components';
import socialTe from '../../images/te.png';
import socialTwitter from '../../images/twitter.png';
const Footer = styled.div`
    position: fixed;
    bottom: ${props => (props.isFooterOut ? '-250px' : '0px')};;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #19307d;
    transition: bottom .4s;
`;
const Content = styled.div`
    max-width: 480px;
    width: 100%;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Footertext = styled.p`
    max-width: 480px;
    width: 100%;
    margin: 0px auto;
    font-size: 10px;
    text-transform: uppercase;
    color: #fff;
    text-align: right;
`
const Mapbox = styled.div`
    h4 {
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 10px;
    }
`;

const Mapdiv = styled.div`
    display: flex;
    flex-direction: column;
    li {
        &+li {
            margin-top: 10px;
        }
        a {
            display: block;
            text-decoration: none;
            font-size: 12px;
            color: #fff;
        }
    }
`;

const Socialul = styled.ul`
    display: flex;
    align-items: center;
    li {
        &+li {
            margin-left: 15px;
        }
        a {
            display: block;
            width: 20px;
            img {
                width: 100%;
            }
        }
    }
`

export default class extends Component {
    render() {
        const {isFooterOut} = this.props;
        return (
            <Footer isFooterOut={isFooterOut}>
                <Content>
                    <Mapbox>
                        <h4>Company</h4>
                        <Mapdiv>
                            <li><a href="https://www.portal.network/" target="_blank">Portal Network</a></li>
                            <li><a href="mailto:support@portal.network">Contact Us</a></li>
                        </Mapdiv>
                    </Mapbox>
                    <Socialul>
                        <li><a href="https://t.me/portalnetworkofficial" target="_blank"><img src={socialTe} alt=""/></a></li>
                        <li><a href="https://twitter.com/itisportal" target="_blank"><img src={socialTwitter} alt=""/></a></li>
                    </Socialul>
                </Content>
                <Footertext>Powered by Portal Network</Footertext>
            </Footer>
        )
    }
}
