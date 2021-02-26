import styled from 'styled-components'
import '../fonts.css'
import menu from '../imgs/menu.png'


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
    width: 40px;
    
    &:hover{
        background: rgb(248, 248, 248);
    }
`
const Li = styled.li`
    padding: 15px;
    border-bottom: 1px solid #bdb8d7;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-top: 1px solid rgba(255,255,255,0.05);

    &:hover{
        background: rgb(248, 248, 248);
    }
`
const P = styled.p`
    color: black;
    display: block;
`

const SideBar = () => {
    return (
        <Wrapper>
            <SideBar2>
                <H2><Img src={menu} alt="" /></H2>
                <ul>
                    <Li><P>My day</P></Li>
                    <Li><P>Important</P></Li>
                    <Li><P>Planned</P></Li>
                    <Li><P>portfolio</P></Li>
                    <Li><P>Assigned to you</P></Li>
                    <Li><P>Flagged email</P></Li>
                    <Li><P>Tasks</P></Li>
                </ul> 
            </SideBar2>
        </Wrapper>
        );
    }
    
    export default SideBar;