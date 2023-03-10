import { React, useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';

import tableIcons from 'views/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import CustomerManage from './CustomerManage';

function ViewCustomer() {
    const [open, setOpen] = useState(false);
    const [marketCode, setMarketCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: 'Customer Name',
            field: 'name',
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
            title: 'Status',
            field: 'status',
            filterPlaceholder: 'True || False',
            align: 'center',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                    style={{
                        color: rowData.status === true ? '#008000aa' : '#f90000aa',
                        fontWeight: 'bold',
                        // background: rowData.status === true ? "#008000aa" : "#f90000aa",
                        borderRadius: '4px',
                        paddingLeft: 5,
                        paddingRight: 5
                    }}
                >
                    {rowData.status === true ? 'Active' : 'Inactive'}
                </div>
            )
        }
    ];

    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    // const lastModifiedDate = useSelector((state) => state.marketReducer.lastModifiedDateTime);

    const fetchPost = async () => {
        await axios.get('http://localhost:8080/api/v1/customer/get-all-customer').then((response) => {
            console.log(response.data);
            setTableData(response.data.data.list);
        });
    };
    useEffect(() => {
        fetchPost();
    }, []);

    // const marketData = useSelector((state) => state.marketReducer.market);
    // const error = useSelector((state) => state.marketReducer.errorMsg);
    // const dispatch = useDispatch();

    // const marketListData = useSelector((state) => state.marketReducer.marketList);

    // useEffect(() => {
    //     setLastModifiedTimeDate(
    //         lastModifiedDate === null
    //             ? ''
    //             : new Date(lastModifiedDate).toLocaleString('en-GB', {
    //                   year: 'numeric',
    //                   month: 'long',
    //                   day: '2-digit',
    //                   hour: 'numeric',
    //                   minute: 'numeric',
    //                   hour12: true
    //               })
    //     );
    // }, [lastModifiedDate]);

    // useEffect(() => {
    //     const dataArray = [];
    //     if (marketListData?.payload?.length > 0) {
    //         {
    //             marketListData?.payload.length != 0 &&
    //                 marketListData?.payload[0].map((item) => {
    //                     console.log('code:' + item.code);
    //                     const initialValues = {
    //                         code: item.code,
    //                         name: item.name,
    //                         managerCode: item.manager.code,
    //                         shortName: item.manager.shortName,
    //                         // mobileNumber:item.managerAdditionalDetails[0].officeTelNumber,
    //                         // codeAndNameDetail:item.codeAndNameDetail.name,
    //                         // fax: item.managerAdditionalDetails[0].fax1,
    //                         status: item.status
    //                     };
    //                     dataArray.push(initialValues);
    //                 });
    //         }
    //     }
    //     setTableData(dataArray);
    // }, [marketListData]);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setMarketCode(data.code);
        } else if (type === 'INSERT') {
            setMarketCode('');
            setMode(type);
        } else {
            setMode(type);
            setMarketCode(data.code);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchPost();
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };
    return (
        <div>
            <MainCard title="Customer Setup">
                <div style={{ textAlign: 'right' }}> Last Modified Date : {lastModifiedTimeDate}</div>
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
                                    columns={columns}
                                    data={tableData}
                                    actions={[
                                        {
                                            icon: tableIcons.Add,
                                            tooltip: 'Add New',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View',
                                            onClick: () => handleClickOpen('VIEW', rowData)
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
                                        exportFileName: 'Market Data',
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

                                {open ? <CustomerManage open={open} handleClose={handleClose} marketCode={marketCode} mode={mode} /> : ''}
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
}

export default ViewCustomer;
