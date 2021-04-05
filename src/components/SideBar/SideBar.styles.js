import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    position: relative;
`
const SideBar2 = styled.div`
    width: 290px;
    height: 100%;
    background: #eeeeee;
    padding: 30px 0px;
    position: fixed;
`
const H2 = styled.h2`
    text-align: left;
    margin-bottom: 20px;
    margin-left: 10px;
`
const Img = styled.img`
    width: 35px;
    
    &:hover{
        background: rgb(248, 248, 248);
    }
`
const Li = styled.li`
    padding: 10px;
    border-bottom: 1px solid #bdb8d7;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-top: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;

    &:hover{
        background: rgb(248, 248, 248);
    }
`
const P = styled.p`
    color: black;
    display: block;
    font-size: 0.8rem;
`
const Input = styled.input`
    border: none !important;
    background: #eeeeee;
    font-size: 1.0rem;
    width: 100%;
    padding: 6px 6px 8px 6px;

    &:hover{
        background: rgb(248, 248, 248);
    }
`
const Ul = styled.ul`
    margin-bottom: 20px;
`
export {Wrapper, SideBar2, H2, Img, Li, P, Input, Ul};