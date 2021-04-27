import '../../fonts.css';
import { Container, Navbar, Nav, Ul, Li, Img, Center, Input, A } from './TopNavbar.styles';
import iconSquared from '../../imgs/iconSquared.png';
import settings from '../../imgs/settings.png';
import help from '../../imgs/help.png';
import whatsNew from '../../imgs/whatsNew.png';
import { useLazyQuery } from '@apollo/client';
import { LOG_OUT } from '../../graphQL/Queries';
import { PropTypes } from 'prop-types';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
/* import {Warnning} from '../Login/LoginForm.style'
import {Options, Actions} from '../CenterColumn/CenterColumn.styles' */
//import { useState } from 'react'

const TopNavbar = ({ name, handleSearchedTasks }) => {
    const [logOut] = useLazyQuery(LOG_OUT);
    //const [showOptions, setShowOptions] = useState(false);
    /* <Li onClick={() => setShowOptions(!showOptions)}> <p>{name}</p> </Li> */

    const validateSearch = Yup.object({
        search: Yup.string().required('A Search is Required'),
    });

    return (
        <Container>
            <Navbar>
                <Img src={iconSquared} alt="" />
                <b>To Do</b>
                <Center>
                    <Formik
                        initialValues={{ search: '' }}
                        validationSchema={validateSearch}
                        onSubmit={handleSearchedTasks}
                    >
                        {() => (
                            <Form>
                                <Field placeholder="search" autoComplete="off" name="search" as={Input} />
                                <br />
                            </Form>
                        )}
                    </Formik>
                </Center>
                <Nav>
                    <Ul>
                        <Li>
                            <Img src={settings} alt="" />
                        </Li>
                        <Li>
                            <Img src={help} alt="" />
                        </Li>
                        <Li>
                            <Img src={whatsNew} alt="" />
                        </Li>
                        <Li>
                            {' '}
                            <p>{name}</p>{' '}
                        </Li>
                        <Li>
                            <p>
                                |{' '}
                                <A onClick={logOut} href="/">
                                    Log Out
                                </A>
                            </p>
                        </Li>
                        {/* showOptions && (
                      <Options>
                          <Actions><Warnning>
                            <a onClick={logOut} href="/">Log Out</a>
                            </Warnning></Actions>
                      </Options>
                    ) */}
                    </Ul>
                </Nav>
            </Navbar>
        </Container>
    );
};

TopNavbar.propTypes = {
    name: PropTypes.string,
    handleSearchedTasks: PropTypes.func,
};

export default TopNavbar;
