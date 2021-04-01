import '../../fonts.css'
import {Container, Navbar, Nav, Ul, Li, Img, Center, Input} from './TopNavbar.styles'
import iconSquared from '../../imgs/iconSquared.png'
import settings from '../../imgs/settings.png'
import help from '../../imgs/help.png'
import whatsNew from '../../imgs/whatsNew.png'
import { useLazyQuery } from '@apollo/client'
import { LOG_OUT } from '../../graphQL/Queries'

const TopNavbar = () => {

  const [logOut, {loading}] = useLazyQuery(LOG_OUT);

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
                    <Li><p>| <a onClick={logOut} href="/">Log Out</a></p></Li>
                </Ul>
            </Nav>
        </Navbar>
    </Container>
  );
}

export default TopNavbar;