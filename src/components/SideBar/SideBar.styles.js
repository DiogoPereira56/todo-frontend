import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    //margin-right: 290px;
    margin-right: ${(props) => (props.hideSideBar ? '72px' : '290px')};
    margin-top: 52px;
`;
const SideBar2 = styled.div`
    //width: 290px;
    width: ${(props) => (props.hideSideBar ? '72px' : '290px')};
    height: 100%;
    background: #eeeeee;
    padding: 30px 0px;
    position: fixed;
`;
const H2 = styled.h2`
    text-align: left;
    margin-bottom: 20px;
    margin-left: 10px;
`;
const Img = styled.img`
    width: 35px;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;
const Li = styled.li`
    padding: 10px;
    border-bottom: 1px solid #bdb8d7;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;
const P = styled.p`
    color: black;
    display: block;
    font-size: 0.8rem;

    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const Input = styled.input`
    border: none !important;
    background: #eeeeee;
    font-size: 1rem;
    width: 100%;
    padding: 6px 6px 8px 6px;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;
const Ul = styled.ul`
    margin-bottom: 20px;
`;
const PaginationWrapper = styled.div`
    display: flex;
    margin: 7px;
`;

const PaginnationNumber = styled.div`
    margin-left: 3px;
    margin-right: 3px;
    width: 20px;
    text-align: center;
    border: solid black 1px;

    cursor: pointer;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;

const PaginationPosition = styled.div`
    /* position: absolute;
    bottom: 18.5%; */
    //border-bottom: 1px solid #bdb8d7;
`;

export {
    Wrapper,
    SideBar2,
    H2,
    Img,
    Li,
    P,
    Input,
    Ul,
    PaginationWrapper,
    PaginnationNumber,
    PaginationPosition,
};
