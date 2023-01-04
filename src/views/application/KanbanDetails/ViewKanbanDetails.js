import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/MaterialTableIcons';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import UserStory from '../kanban/Backlogs/UserStory';

const ViewKanbanDetails = () => {
    const [tableData, setTableData] = useState([]);
    const kanban = useSelector((state) => state.kanban);
    const { userStory, userStoryOrder } = kanban;
    // const kanban = useSelector((state) => state.kanban);
    // const { userStory, userStoryOrder } = kanban;
    const columns = [
        {
            title: 'ID',
            field: 'id',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Title',
            field: 'title',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        // {
        //     title: 'Description',
        //     field: 'description',
        //     align: 'center',
        //     grouping: false,
        //     filterPlaceholder: 'filter'
        // },
        {
            title: 'Assign',
            field: 'assign',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },

        // {
        //     title: 'Status',
        //     field: 'columnId',
        //     align: 'center',
        //     grouping: false,
        //     filterPlaceholder: 'filter'
        // }

        // {
        //     title: 'dueDate',
        //     field: 'dueDate',
        //     align: 'center',
        //     grouping: false,
        //     filterPlaceholder: 'filter'
        // }

        {
            title: 'Status',
            field: 'columnId',
            filterPlaceholder: 'filter',
            align: 'center',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                // style={{
                //     color: rowData.status === true ? '#008000aa' : '#f90000aa',
                //     fontWeight: 'bold',
                //     // background: rowData.status === true ? "#008000aa" : "#f90000aa",
                //     borderRadius: '4px',
                //     paddingLeft: 5,
                //     paddingRight: 5
                // }}
                >
                    {/* {rowData.status === true ? 'Active' : 'Inactive'} */}
                    {rowData.columnId === 'CLOSED' && <Chip label="CLOSED" size="small" chipcolor="success" />}
                    {rowData.columnId === 'NEW' && <Chip label="NEW" size="small" chipcolor="orange" />}
                    {rowData.columnId === 'RESOLVED' && <Chip label="RESOLVED" size="small" chipcolor="primary" />}
                </div>
            )
        }
    ];

    useEffect(() => {
        // console.log(kanban);
        // JSON.parse(localStorage.getItem('user'))
        console.log(JSON.parse(localStorage.getItem('kanban')));
        const value = JSON.parse(localStorage.getItem('kanban'));
        console.log(JSON.parse(localStorage.getItem('userStoryOrder')));
        setTableData(value.userStory);
    }, []);

    return (
        <MainCard title="View Kanban Card">
            <div style={{ textAlign: 'right' }}> </div>
            <br />
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <MaterialTable
                                columns={columns}
                                data={tableData}
                                detailPanel={[
                                    {
                                        tooltip: 'Show Name',
                                        render: (rowData) => (
                                            <div
                                                style={{
                                                    // fontSize: 20,
                                                    // textAlign: "center",
                                                    height: 75
                                                }}
                                            >
                                                {' '}
                                                {userStoryOrder.map((storyId, index) => {
                                                    const story = userStory.filter((item) => item.id === storyId)[0];
                                                    console.log(story);

                                                    return <UserStory key={story.id} story={story} index={index} />;
                                                })}
                                            </div>
                                        )
                                    }
                                ]}
                                // actions={[
                                //     {
                                //         icon: tableIcons.Add,
                                //         tooltip: 'Add New',
                                //         isFreeAction: true
                                //         // onClick: () => handleClickOpen('INSERT', null)
                                //     },
                                //     (rowData) => ({
                                //         icon: tableIcons.Edit,
                                //         tooltip: 'Edit'
                                //         // onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                //     }),
                                //     (rowData) => ({
                                //         icon: tableIcons.VisibilityIcon,
                                //         tooltip: 'View'
                                //         // onClick: () => handleClickOpen('VIEW', rowData)
                                //     })
                                // ]}
                                options={{
                                    padding: 'dense',
                                    showTitle: false,
                                    grouping: true,
                                    sorting: true,
                                    search: true,
                                    searchFieldAlignment: 'right',
                                    searchAutoFocus: true,
                                    searchFieldVariant: 'standard',
                                    filtering: true,
                                    paging: true,
                                    pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                                    pageSize: 5,
                                    paginationType: 'stepped',
                                    showFirstLastPageButtons: false,
                                    exportButton: true,
                                    exportAllData: true,
                                    exportFileName: 'Kanban Card Details',
                                    actionsColumnIndex: -1,
                                    columnsButton: true,

                                    headerStyle: {
                                        whiteSpace: 'nowrap',
                                        height: 20,
                                        maxHeight: 20,
                                        padding: 2,
                                        fontSize: '14px',
                                        background: '-moz-linear-gradient(top, #0790E8, #3180e6)',
                                        // background: '-ms-linear-gradient(top, #0790E8, #3180e6)',
                                        // background: '-webkit-linear-gradient(top, #0790E8, #3180e6)',
                                        textAlign: 'center',
                                        color: '#FFF'
                                    },
                                    rowStyle: {
                                        whiteSpace: 'nowrap',
                                        height: 20,
                                        fontSize: '13px',
                                        padding: 0
                                    }
                                }}
                            />

                            {/* {open ? (
                                    <MarketGroup open={open} handleClose={handleClose} marketGroupCode={managerCode} mode={mode} />
                                ) : (
                                    ''
                                )}
                                {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null} */}
                        </Grid>
                    </Grid>
                    {/* </SubCard> */}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ViewKanbanDetails;

// import React from 'react';

// const viewKanbanDetails = () => {
//     return <div>viewKanbanDetails</div>;
// };

// export default viewKanbanDetails;
