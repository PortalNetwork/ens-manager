import styled from 'styled-components';
export const Introduction = styled.div`
    overflow: hidden;
    margin-top: 25px;
    margin-bottom: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    >img{
        width: 131px;
        height: 84px;
    }
`
export const Title = styled.h1`
    font-family: SFProText;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.6;
    letter-spacing: 0.8px;
    color: #ffffff;
    text-align: center;
`
export const Context = styled.p`
    font-family: SFProText;
    font-size: 12px;
    line-height: 1.6;
    letter-spacing: 0.6px;
    text-align: center;
    color: #ffffff;
`
export const SetDomainBox = styled.div`
    margin-top: 24px;
    width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 26px;
    .inputBox{
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        >input{
            display: block;
            width: 42%;
            height: 36px;
            border-radius: 4px;
            border: solid 1px #dadada;
            background-color: #ffffff;
            padding-left: 10px;
        }
    }
    >p{
        font-family: SFProText;
        font-size: 10px;
        line-height: 1.6;
        color: #000000;
        text-align: left;
        padding: 7px 5px 7px 5px;
    }
`
export const ClaimBtn = styled.a`
    cursor: pointer;
    display: block;
    width: 100%;
    height: 36px;
    border-radius: 4px;
    background-color: #314184;
    margin: 0 auto;
    font-family: SFProText;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    line-height: 36px;
    color: #ffffff;
`


export const GoBackBtn = styled.a`
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    >i{
        margin-right: 15px;
    }
`