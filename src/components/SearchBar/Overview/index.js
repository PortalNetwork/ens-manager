import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import bulletpng from "../../../images/bullet.png";
const OverviewBox = styled.div`
    width: 100%;
    display: ${props => (props.isKeyDown ? 'none' : 'black')};
    >h3{
        position: relative;
        margin-bottom: 15px;
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
    }
`;
const Overview = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 16px 20px;
`;
const DomainInfo = styled.h1`
    font-family: SFProText;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
    color: #707070;
    margin-bottom: 24px;
`;
const ListItem = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-bottom: 10px;
`;
const Titlebar = styled.div`
    float: left;
    width: 35%;
    font-family: SFProText;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.87;
    color: #000000;
`;
const Valuebox = styled.div`
    float: left;
    width: 65%;
    font-family: SFProText;
    font-size: 12px;
    font-weight: 500;
    word-break: break-all;
    line-height: 1.87;
    color: #000000;
`;
export default class extends Component {

    web3fromWei = (value) =>{
        return this.props.web3.fromWei(value, 'ether')
    }

    render() {
        const {isKeyDown, entries, owner} = this.props;
        // const AuctionTimeregDate = new Date(entries.registrationDate);
        // const SubmitBidsTimeregDate = new Date(entries.registrationDate);
        // const AuctionTime = moment.utc(AuctionTimeregDate.removeDays(5)).format('MMMM Do YYYY, h:mm:ss a');
        // const SubmitBidsTime = moment.utc(SubmitBidsTimeregDate.removeDays(3)).format('MMMM Do YYYY, h:mm:ss a');
        const RevealTime = moment.utc(entries.registrationDate).format('MMMM Do YYYY, h:mm:ss a');

        console.log(this.props);
        return (
            <OverviewBox isKeyDown={isKeyDown} bulletpng={bulletpng}>
                <h3><span>OVERVIEW</span></h3>
                <Overview>
                    <DomainInfo>Domain Info</DomainInfo>
                    <ListItem>
                        <Titlebar>Status</Titlebar>
                        <Valuebox>{entries.state}</Valuebox>
                    </ListItem>
                    <ListItem>
                        <Titlebar>Owner</Titlebar>
                        <Valuebox>{owner}</Valuebox>
                    </ListItem>
                    <ListItem>
                        <Titlebar>Winning Deed</Titlebar>
                        <Valuebox>{entries.deed}</Valuebox>
                    </ListItem>
                    <ListItem>
                        <Titlebar>Reveal Bids </Titlebar>
                        <Valuebox>{RevealTime}</Valuebox>
                    </ListItem>
                    <ListItem>
                        <Titlebar>Value</Titlebar>
                        <Valuebox>{`${this.web3fromWei(entries.value)} ETH`}</Valuebox>
                    </ListItem>
                    <ListItem>
                        <Titlebar>Highest Bid</Titlebar>
                        <Valuebox>{`${this.web3fromWei(entries.highestBid)} ETH`}</Valuebox>
                    </ListItem>
                </Overview>
            </OverviewBox>
        )
    }
}
