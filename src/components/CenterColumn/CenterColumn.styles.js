import styled from 'styled-components';

//Wrapper that wrapps the rest of the code
const CenterBar = styled.div`
    //width: 100%;
`;
const TasksToolbar = styled.div`
    padding: 12px 16px 0 16px;
    display: flex;
`;
const Wrapper = styled.div`
    display: flex;
    flex: 1 1 0px;
    margin-top: 52px;
    position: relative;
    z-index: 500;
    min-height: calc(100vh - 52px);
`;
//Description Bar
const DescriptionContainer = styled.div`
    width: 350px;
    height: 100%;
    background: #eeeeee;
    position: fixed;
    right: 0%;
    padding: 10px;
`;
const Description = styled.textarea`
    margin: 10px;
    padding: 16px;
    border: 1px solid #eaeaea;
    border-width: 1px;
    border-radius: 2px;
    width: 94%;
    height: 200px;
`;
const Hide = styled.img`
    margin-left: 10px;
    width: 20px;
    cursor: pointer;
`;
//List tittle
const TasksToolbarTitleContainer = styled.div`
    display: flex;
    padding: 10px;
    width: 700px;
    //background-color: brown;
    //min-width: ${(props) => (props.changeLayout ? 'calc(100vw - 1400px)' : 'calc(100vw - 1050px)')};
`;
const TasksToolbarTitleItem = styled.div`
    margin-right: 20px;
`;
const H2 = styled.h2`
    color: #3e69e4;
    cursor: pointer;
`;
const Img = styled.img`
    width: 20px;
    cursor: pointer;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;

const ListInput = styled.input`
    padding: 15px 0px;
    border: none;
    font-size: 1rem;
    width: 140px;
    height: 30px;
`;

//Task Sorter
const TaskToolbarRight = styled.div`
    //margin-left: 950px;
    min-width: ${(props) => (props.changeLayout ? 'calc(100vw - 1400px)' : 'calc(100vw - 1050px)')};
    text-align: right;
    //min-width: calc(100vw - 540px);
`;
const ChangeTask = styled(TaskToolbarRight)`
    margin-left: 600px;
`;
const Button = styled.button`
    cursor: pointer;
    font-size: 1.4rem;
    border: none;
    background: none;
`;
//Add Tasks
const BaseAdd = styled.div`
    padding: 0 13px;
    margin: 0 8px;
    display: flex;
    align-items: center;
`;
const Add = styled.button`
    width: 40px;
    height: 40px;
    padding: 4px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 25px;
    margin-bottom: 2px;
`;
const Input = styled.input`
    padding: 15px 0px;
    border: none;
    font-size: 1rem;
    width: 100%;
    height: 60px;
`;

//Tasks
const Task = styled.div`
    margin: 0 24px;
    box-shadow: inset 0 1px 0 0 #e5e5e5;
    padding: 13.8px;
    cursor: pointer;

    &:hover {
        background: #eeeeee;
    }
`;
const CheckBox = styled.input`
    margin-right: 10px;
`;

const Content = styled.div`
    display: grid;
    //position: static;
    //z-index: 99;
    //background-color: green;
    //grid-template-columns: 1fr 1fr;
    //overflow-y: scroll;
`;

//List Options
const Options = styled.div`
    width: 150px;
    background-color: white;
    position: absolute;
    z-index: 400;
    border: 2px solid #eee;
    //display: flex;
    //display: grid;
`;

const Actions = styled.div`
    padding: 10px;
    //padding: 9px;
    //border-bottom: 1px solid #bdb8d7;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    //grid-row: 1;

    &:hover {
        background: rgb(248, 248, 248);
    }
`;

const NoList = styled.div`
    text-align: center;
    margin-top: 300px;
    width: 100%;
    //border: 2px solid black;
`;

export {
    CenterBar,
    TasksToolbar,
    TasksToolbarTitleContainer,
    TasksToolbarTitleItem,
    H2,
    Img,
    TaskToolbarRight,
    Button,
    BaseAdd,
    Add,
    Input,
    Task,
    CheckBox,
    ChangeTask,
    DescriptionContainer,
    Description,
    Wrapper,
    Hide,
    Options,
    Actions,
    ListInput,
    Content,
    NoList,
};
