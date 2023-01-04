// material-ui
import { useTheme } from '@mui/material/styles';
import { React, useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';

import tableIcons from 'views/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

// project imports
import Avatar from 'ui-component/extended/Avatar';
// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

const avatarImage = require.context('assets/images/profile', true);

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: 'User Name',
            field: 'username',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Address',
            field: 'address',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Email',
            field: 'email',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Contact Number',
            field: 'contactNumber',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'NIC',
            field: 'nic',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'DOB',
            field: 'image',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },

        {
            title: 'Status',
            field: 'activeState',
            filterPlaceholder: 'True || False',
            align: 'center',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                    style={{
                        alignItems: 'center',
                        align: 'center',
                        display: 'flex'
                    }}
                >
                    {rowData.activeState === true ? (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="success" size="small" />} checked="true" />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="error" size="small" />} checked="false" />
                        </FormGroup>
                    )}
                </div>
            )
        }
    ];

    // React.useEffect(() => {
    //     setData(usersS1);
    // }, [usersS1]);

    const fetchAllUsers = async () => {
        await axios.get('http://localhost:8080/api/auth/get-all-users').then((response) => {
            console.log(response.data);
            setTableData(response.data.data.list);
            // setTableData(response.data.data.list);
        });
    };
    useEffect(() => {
        fetchAllUsers();
    }, []);
    // React.useEffect(() => {
    //     dispatch(getUsersListStyle1());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div>
            <MainCard>
                <div style={{ textAlign: 'right' }}> </div>
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
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
                                                    <Grid container spacing={gridSpacing}>
                                                        <Grid item> First Name : {rowData.firstName}</Grid>
                                                        <Grid item>Last Name : {rowData.lastName}</Grid>
                                                        <Grid item>Middle Name: {rowData.mname}</Grid>
                                                        <Grid item>Company Email: {rowData.companyEmail}</Grid>
                                                    </Grid>
                                                </div>
                                            )
                                        }
                                    ]}
                                    columns={columns}
                                    data={tableData}
                                    actions={[
                                        {
                                            icon: tableIcons.Add,
                                            tooltip: 'Add New',
                                            isFreeAction: true
                                            // onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit'
                                            // onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View'
                                            // onClick: () => handleClickOpen('VIEW', rowData)
                                        })
                                    ]}
                                    options={{
                                        padding: 'dense',
                                        showTitle: false,
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
                                        exportFileName: 'User Data',
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
                                            color: 'black'
                                        },
                                        rowStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            fontSize: '13px',
                                            padding: 0
                                        }
                                    }}
                                />

                                {/* {open ? <CustomerManage open={open} handleClose={handleClose} marketCode={marketCode} mode={mode} /> : ''} */}
                                {/* {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null} */}
                            </Grid>
                        </Grid>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default UserList;
