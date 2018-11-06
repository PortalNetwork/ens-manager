import React, { Component } from 'react';
import { Introduction, Title, Context, SetDomainBox, ClaimBtn, GoBackBtn } from './IdentityPageUi';
import identity from '../../../images/identity.svg';
import { getEthereumSubdomainRegistrarAddress, getEtherscanUrl, getEthereumProvider } from '../../../lib/web3Service';
import { setSubdomain } from "../../../lib/subdomainRegistrarService";

export default class extends Component {

    state = {
        domain: 'coingecko',
        subdomain: '',
    }

    handStateChange = e =>{
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    viewDomain = () =>{
        return `.${this.state.domain}`
    }

    handleSetSubnode = () =>{
        if(this.state.subdomain === '') return alert("Subdomain must not be empty");
        const { metaMask, web3, handleWarningOpen } = this.props;
        const { domain, subdomain } = this.state;
        const to = getEthereumSubdomainRegistrarAddress();
        const subnodeData = setSubdomain(subdomain, domain, 'eth', metaMask.account, metaMask.account);
        web3.eth.sendTransaction({
            from: metaMask.account, 
            to: to,
            value: 0,
            data: subnodeData 
        },(err, result)=> {
            if (err) return handleWarningOpen(err.message);
            const tx = <span className="tx">Tx: <a href={getEtherscanUrl(result)} target="_blank">{result}</a></span>;
            handleWarningOpen(tx);
        });

    }

    render() {
        const { subdomain } = this.state;
        const { SeachPageSwitch } = this.props;
        return (
            <div>
                <Introduction>
                    <img src={identity} alt=""/>
                </Introduction>
                <Title>Get your exclusive identity</Title>
                <Context>Fill the field and choose a second-level domain as your wallet address.</Context>
                
                <SetDomainBox>
                    <div className="inputBox">
                        <input type="text" name="subdomain" onChange={this.handStateChange} defaultValue={subdomain}/>
                        <input type="text" name="domain" defaultValue={this.viewDomain()} disabled/>
                        <h1>.eth</h1>
                    </div>
                    <p>The subdomain will automatically bind with the currently wallet address, yet you can reset it through ENS Manager.</p>
                    <ClaimBtn onClick={this.handleSetSubnode}>Claim Subdomain</ClaimBtn>
                </SetDomainBox>

                <GoBackBtn onClick={()=> SeachPageSwitch(0)}><i className="fas fa-angle-left"></i> Go Back</GoBackBtn>
            </div>
        )
    }
}
