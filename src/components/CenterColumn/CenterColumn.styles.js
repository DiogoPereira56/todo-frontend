import styled from 'styled-components'

//Wrapper that wrapps the rest of the code
const CenterBar = styled.div`
    margin-left: 290px;
`
const TasksToolbar = styled.div`
    padding: 12px 16px 0 16px;
    display: flex;
`
//List tittle
const TasksToolbarTitleContainer = styled.div`
    display: flex;
    padding: 10px;
`
const TasksToolbarTitleItem = styled.div`
    margin-right: 20px;
`
const H2 = styled.h2`
    color: #3e69e4;
`
const Img = styled.img`
    width: 20px;
    cursor: pointer;

    &:hover{
        background: rgb(248, 248, 248);
    }
`

//Task Sorter
const TaskToolbarRight = styled.div`
    margin-left: 950px;
`
const Button = styled.button`
    cursor: pointer;
    color: #34373d;
    font-size: 1.4rem;
    border: none;
    background: none;
`
//Add Tasks
const BaseAdd = styled.div`
    padding: 0 13px;
    margin: 0 8px;
    display: flex;
    align-items: center;
`
const Add = styled.button`
    width: 40px;
    height: 40px;
    padding: 4px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 25px;
    margin-bottom: 2px;
`
const Input = styled.input`
    padding: 15px 0px;
    border: none;
    font-size: 1rem;
    width: 100%;
`

//Tasks
const Task = styled.div`
    margin: 0 24px;
    box-shadow: inset 0 1px 0 0 #e5e5e5;
    padding: 13px;
    cursor: pointer;
    
    &:hover{
        background: #eeeeee;
    }
`
const CheckBox = styled.input`
    margin-right: 10px;
`
export {CenterBar, TasksToolbar, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, Button, BaseAdd, Add, Input, Task, CheckBox}