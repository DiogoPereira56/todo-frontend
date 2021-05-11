import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex: 1 1 0px;
    will-change: width;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
`;

const Unauthorized = styled.div`
    border: 2px solid #eee;
    margin-top: 130px;
    margin-left: 28%;
    width: 600px;
    box-shadow: 2px 2px 2px 2px #eee;
    text-align: center;
`;

const A = styled.a`
    background-color: #005da6;
    cursor: pointer;
    color: #fff;
`;

const P = styled.p`
    margin: 10px;
`;

const FixPosition = styled.div`
    //margin-bottom: 200px;
`;

export { Wrapper, Unauthorized, A, P, FixPosition };
