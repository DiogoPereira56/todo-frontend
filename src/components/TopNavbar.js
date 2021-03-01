import styled from 'styled-components'
import '../fonts.css'
import iconSquared from '../imgs/iconSquared.png'
import settings from '../imgs/settings.png'
import help from '../imgs/help.png'
import whatsNew from '../imgs/whatsNew.png'


const Container = styled.div`
    margin: auto;
    padding: 13px;
    background: #0e005e;
`

const Navbar = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
`

const Nav = styled.nav`
    //flex: 1;
    text-align: right;
`
const Ul = styled.ul`
    display: inline-block;
    list-style-type: none;
    vertical-align: center;
`
const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
`

const Img = styled.img`
    width: 50px;
    padding-right:20px;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Input = styled.input`
    padding: 8px;
    cursor: pointer;
    width: 400px;
    height: 32px;
    transition: background-color 0.1s;
    background: rgb(191, 207, 230);
    border: none;
    border-radius: 2px;
`
const TopNavbar = () => {
  return (
    <Container>
        <Navbar>
            <Img src={iconSquared} alt="" />
            <b>To Do</b>
            <Center><Input placeholder="Search"></Input></Center>
            <Nav>
                <Ul>
                    <Li><Img src={settings} alt="" /></Li>
                    <Li><Img src={help} alt="" /></Li>
                    <Li><Img src={whatsNew} alt="" /></Li>
                    <Li><p>Diogo Henrique</p></Li>
                </Ul>
            </Nav>
        </Navbar>
    </Container>
  );
}

export default TopNavbar;