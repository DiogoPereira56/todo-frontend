import {CenterBar, TasksToolbar, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, Button, BaseAdd, Add, Input, Task, CheckBox, ChangeTask,
    DescriptionContainer, Description, Wrapper, Hide, Options, Actions} from './CenterColumn.styles'
import '../../fonts.css'
import more from '../../imgs/more.png'
import sort from '../../imgs/sort.png'
import { useState } from 'react';
import hide from '../../imgs/hide.png'
import { PropTypes } from 'prop-types'

const CenterColumn = ({activeList}) => {

    const [changeLayout, setChangeLayout] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <Wrapper>
            <CenterBar>
                <TasksToolbar>

                    <TasksToolbarTitleContainer>
                        <TasksToolbarTitleItem><H2>{activeList}</H2></TasksToolbarTitleItem>
                        <TasksToolbarTitleItem>
                            <H2><Img src={more} alt="" onClick={() => setShowOptions(!showOptions)} /></H2>
                            {showOptions && (
                                <Options>
                                    <Actions>Rename List</Actions>
                                    <Actions>Delete List</Actions>
                                </Options>
                            )}
                        </TasksToolbarTitleItem>
                    </TasksToolbarTitleContainer>
                    
                    {changeLayout &&(
                        <TaskToolbarRight changeLayout>
                            <Img src={sort} alt="" />
                            <Button>Sort</Button>
                        </TaskToolbarRight>
                    )}

                    {!changeLayout &&(
                        <TaskToolbarRight>
                            <Img src={sort} alt="" />
                            <Button>Sort</Button>
                        </TaskToolbarRight>
                    )}
                    
                </TasksToolbar>

                <BaseAdd>
                    <Add>+</Add>
                    <Input placeholder="Add a Task" />
                </BaseAdd>
                
                <Task onClick={() => setChangeLayout(true)}>
                    <CheckBox type="checkbox"/>task1
                </Task>
                <Task onClick={() => setChangeLayout(true)}>
                    <CheckBox type="checkbox"/>task2
                </Task>
            </CenterBar>

            {changeLayout && (
                <DescriptionContainer>
                    <H2>TaskName</H2>
                    <form>
                        <Description placeholder="Description"/>
                    </form>
                    <Hide onClick={() => setChangeLayout(false)} src={hide} alt="" />
                </DescriptionContainer>
            )}
        </Wrapper>
        );
    }

    CenterColumn.propTypes = {
        activeList: PropTypes.string,
    }
    
    export default CenterColumn;