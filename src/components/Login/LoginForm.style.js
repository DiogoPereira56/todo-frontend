import styled from 'styled-components'

const Wrapper = styled.div`
    border: 2px solid #eee;
    margin-top: 70px;
    margin-left: 28%;
    width: 600px;
    box-shadow: 2px 2px 2px 2px #eee;
`
const Flexbox = styled.div`
    display: flex;
    background-color: #eee;
    text-align: center;
`
const Aside = styled.div`
    padding: 20px;
    align-items: center;
    cursor: pointer;
    flex: 1 100%;
    
    &:hover{
        background-color: rgb(214, 214, 214)
    }
`
const FormPadding = styled.div`
    padding: 20px;
`
const Button = styled.button`
    outline: none;
    text-decoration: none;
    background-color: #005da6;
    border-color: transparent;
    cursor: pointer;
    color: #fff;
    min-height: 32px;
    min-width: 108px;
`
const Label = styled.label`
    font-size: 20px;
`
const Input = styled.input`
    border-style: solid;
    padding: 6px 10px;
    border-width: 1px;
    border-color: rgba(0,0,0,0.6);
    height: 36px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    display: block;
    width: 100%;
    margin-top: 10px;
`

const Warnning = styled.div`
    color: red;
`

export {Wrapper, Aside, Flexbox, FormPadding, Button, Label, Input, Warnning }