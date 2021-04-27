import styled from 'styled-components';

const Container = styled.div`
    margin: auto;
    padding: 10px;
    background: #0e005e;
`;

const Navbar = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
`;

const Nav = styled.nav`
    text-align: right;
`;
const Ul = styled.ul`
    display: inline-block;
    list-style-type: none;
    vertical-align: center;
`;
const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
`;

const Img = styled.img`
    width: 50px;
    padding-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;
const Input = styled.input`
    padding: 8px;
    cursor: pointer;
    width: 400px;
    height: 32px;
    transition: background-color 0.1s;
    background: rgb(191, 207, 230);
    border: none;
    border-radius: 2px;
`;

const A = styled.a`
    text-decoration: none;
    color: white;
`;
export { Container, Navbar, Nav, Ul, Li, Img, Center, Input, A };
