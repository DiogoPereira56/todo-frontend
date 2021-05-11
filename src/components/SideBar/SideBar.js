/* eslint-disable no-unused-vars */
import { Wrapper, SideBar2, H2, Img, Li, P, Input, Ul, PaginationPosition } from './SideBar.styles';
import '../../fonts.css';
import menu from '../../imgs/menu.png';
import { useMutation } from '@apollo/client';
import ListOfTasks from './ListOfTasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NEW_LIST_MUTATION } from '../../graphQL/Mutations';
import { PropTypes } from 'prop-types';
import Pagination from '../Pagination';
import { GET_CLIENT } from '../../graphQL/Queries';

const SideBar = ({
    setChangeLayout,
    setRename,
    setShowOptions,
    setCurrentPage,
    listsPerPage,
    setShowAllTasks,
    orderByTitle,
    setSearchIsActive,
    order,
    totalLists,
    refetchTotalLists,
    setCurrentTaskPage,
    dataClient,
    loadListInfo,
}) => {
    const [makeNewList, { error: errorNewList }] = useMutation(NEW_LIST_MUTATION, {
        update: (cache, { data }) => {
            const newListFromResponse = data?.addList;
            const existingLists = cache.readQuery({
                query: GET_CLIENT,
                variables: { limit: listsPerPage, offset: 0 },
            });
            console.log(existingLists);

            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    getClientInformation: [...existingLists?.getClientInformation.list, newListFromResponse],
                },
                variables: { limit: listsPerPage, offset: 0 },
            });
        },
    });

    const handleNewList = (values) => {
        makeNewList({ variables: values }).then(refetchTotalLists());
        values.listName = '';
    };

    function doShowAllTasks() {
        setShowAllTasks(true);
        setChangeLayout(false);
        setSearchIsActive(false);
    }

    if (errorNewList) {
        console.log(errorNewList);
        return <div>error...</div>;
    }

    const validateNewList = Yup.object({
        listName: Yup.string().required('A Name is Required'),
    });

    return (
        <Wrapper>
            <SideBar2>
                <H2>
                    <Img src={menu} alt="" />
                </H2>
                <Ul>
                    <Li onClick={() => doShowAllTasks()}>
                        <P>All Tasks</P>
                    </Li>
                </Ul>

                {dataClient && (
                    <ListOfTasks
                        lists={dataClient.list}
                        setChangeLayout={setChangeLayout}
                        setRename={setRename}
                        setShowOptions={setShowOptions}
                        setShowAllTasks={setShowAllTasks}
                        orderByTitle={orderByTitle}
                        setSearchIsActive={setSearchIsActive}
                        order={order}
                        setCurrentTaskPage={setCurrentTaskPage}
                        loadListInfo={loadListInfo}
                    />
                )}

                <Formik
                    initialValues={{ listName: '' }}
                    validationSchema={validateNewList}
                    onSubmit={handleNewList}
                >
                    {() => (
                        <Form>
                            <Field placeholder=" +  New List" autoComplete="off" name="listName" as={Input} />
                            <br />
                        </Form>
                    )}
                </Formik>

                {totalLists && (
                    <PaginationPosition>
                        <Pagination
                            listsPerPage={listsPerPage}
                            totalLists={totalLists}
                            setCurrentPage={setCurrentPage}
                        />
                    </PaginationPosition>
                )}
            </SideBar2>
        </Wrapper>
    );
};

SideBar.propTypes = {
    setActiveList: PropTypes.func,
    lista: PropTypes.object,
    setChangeLayout: PropTypes.func,
    setRename: PropTypes.func,
    setShowOptions: PropTypes.func,
    setCurrentPage: PropTypes.func,
    listsPerPage: PropTypes.number,
    setShowAllTasks: PropTypes.func,
    orderByTitle: PropTypes.bool,
    setSearchIsActive: PropTypes.func,
    order: PropTypes.string,
    totalLists: PropTypes.number,
    refetchTotalLists: PropTypes.func,
    setCurrentTaskPage: PropTypes.func,
    dataClient: PropTypes.object,
    loadListInfo: PropTypes.func,
};

export default SideBar;
