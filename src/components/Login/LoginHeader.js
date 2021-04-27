import { Container, Navbar, Img } from '../TopNavbar/TopNavbar.styles';
import iconSquared from '../../imgs/iconSquared.png';

const LoginHeader = () => {
    return (
        <Container>
            <Navbar>
                <Img src={iconSquared} alt="" />
                <b>To Do</b>
            </Navbar>
        </Container>
    );
};

export default LoginHeader;
