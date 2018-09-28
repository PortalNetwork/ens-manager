import React, { Component } from 'react';
import styled from 'styled-components';
const MenuBar = styled.div`
    position: fixed;
    width: 100%;
    height: 49px;
    margin: 0px auto;
    background-color: #19307d;
    bottom: 0;
    left: 0;
`
const MenuMid = styled.div`
    max-width: 480px;
    width: 100%;
    height: 49px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Menubtn = styled.a`
    cursor: pointer;
    display: flex;
    width: 20%;
    height: 49px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: ${props => (props.idx === props.menuAcitveidx ? 1 : 0.5)};
    >p{
        font-size: 12px;
        margin-top: 6px;
    }
`;
export default class extends Component {
    
    render() {
        const {menuItem, handMenuAcitve, menuAcitveidx} = this.props;
        return (
            <MenuBar>
                <MenuMid>
                    {
                        menuItem.map((obj, idx)=>{
                            return (
                                <Menubtn 
                                    idx={idx} 
                                    menuAcitveidx={menuAcitveidx} 
                                    key={idx}
                                    onClick={()=> handMenuAcitve(idx)} 
                                >
                                    <img src={obj.imgurl} alt=""/>
                                    <p>{obj.name}</p>
                                </Menubtn>
                            )
                        })

                    }
                </MenuMid>
            </MenuBar>
        )
    }
}
