import styled from 'styled-components'
import iconSquared from '../imgs/iconSquared.png'

const Container = styled.div`
    margin: auto;
    padding-left: 30px;
    padding-right: 25px;
    background: #0e005e;
`

const Navbar = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
`

const Nav = styled.nav`
    flex: 1;
    text-align: right;
`
const Ul = styled.ul`
    display: inline-block;
    list-style-type: none;
`
const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
`

const Img = styled.img`
    width: 30px;
    padding-right:20px;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const TopNavbar = () => {
  return (
    <Container>
        <Navbar>
        <Img src={iconSquared} alt="" />
            <p>To Do</p>
            <Center><input placeholder="Search"></input></Center>
            <Nav>
                <Ul>
                    <Li><p>"settings"</p></Li>
                    <Li><p>"help"</p></Li>
                    <Li><p>"what's new"</p></Li>
                    <Li><p>Diogo Henrique</p></Li>
                </Ul>
            </Nav>
        </Navbar>
    </Container>
  );
}

export default TopNavbar;