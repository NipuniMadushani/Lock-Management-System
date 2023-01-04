// import React from 'react';
import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Checkbox,
    Button,
    Typography,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch
} from '@mui/material';
import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import * as yup from 'yup';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { React, useEffect, forwardRef, useState, Fragment, useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';
// import {
//     checkDuplicateMarketsCode,
//     getMarketDetailsByCode,
//     saveMarketData,
//     updateMarketData
// } from 'store/actions/masterActions/operatorActions/MarketAction';
// import { getAllActiveManagerData } from 'store/actions/masterActions/operatorActions/ManagerAction';
// import CreatedUpdatedUserDetailsWithTableFormat from '../../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

const CustomerManage = ({ open, handleClose, mode, marketCode }) => {
    const initialValues1 = {
        name: '',
        address: '',
        email: '',
        contactNumber: '',
        // status: true,
        createdBy: '',
        companyId: 1
    };

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            axios.post('http://localhost:8080/api/v1/customer/save', data).then((response) => {
                console.log(response.data);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'New Customer has been successfully saved.',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                // window.location.reload();
                // setTableData(response.data.data.list);
            });
            // };
            // fetchPost();
            // dispatch(saveMarketData(data));
        } else if (mode === 'VIEW_UPDATE') {
            // dispatch(updateMarketData(data));
        }
        handleClose();
    };
    const [formValues, setFormValues] = useState(initialValues1);

    // const managerListData = useSelector((state) => state.managerReducer.activeManagerList);
    // const [loadValues, setLoadValues] = useState(null);
    // const ref = useRef(null);
    // const [clusterListOptions, setManagerListOptions] = useState([]);
    // const dispatch = useDispatch();
    // const managerToUpdate = useSelector((state) => state.managerReducer.managerToUpdate);

    // const marketToUpdate = useSelector((state) => state.marketReducer.marketToUpdate);

    // useEffect(() => {
    //     if ((mode === 'VIEW_UPDATE' && marketToUpdate != null) || (mode === 'VIEW' && marketToUpdate != null)) {
    //         setLoadValues(marketToUpdate);
    //     }
    // }, [marketToUpdate]);

    // useEffect(() => {
    //     if (managerListData != null) {
    //         setManagerListOptions(managerListData);
    //     }
    // }, [managerListData]);

    // const duplicateCode = useSelector((state) => state.marketReducer.duplicateCode);

    // useEffect(() => {
    //     if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
    //         // dispatch(getMarketDetailsByCode(marketCode));
    //     }
    // }, [mode]);

    useEffect(() => {
        // dispatch(getAllActiveManagerData());
    }, []);

    // useEffect(() => {
    //     if ((mode === 'VIEW_UPDATE' && managerToUpdate != null) || (mode === 'VIEW' && managerToUpdate != null)) {
    //         setLoadValues(managerToUpdate);
    //     }
    // }, [managerToUpdate]);

    // yup.addMethod(yup.string, 'checkDuplicateMarketCode', function (message) {
    //     return this.test('checkDuplicateMarketCode', 'Duplicate Market Code', async function validateValue(value) {
    //         if (mode === 'INSERT') {
    //             try {
    //                 // dispatch(checkDuplicateMarketsCode(value));

    //                 if (duplicateCode != null && duplicateCode.errorMessages.length != 0) {
    //                     return false;
    //                 } else {
    //                     return true;
    //                 }
    //             } catch (error) {}
    //         }
    //         return true;
    //     });
    // });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        address: yup.string().required('Required field'),
        // .checkDuplicateMarketCode('ggg'),
        email: yup.string().required('Required field'),
        contactNumber: yup.number().required('Required field'),
        name: yup.string().required('Required field')
    });
    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div>
            <Dialog
                maxWidth="100px"
                open={open}
                keepMounted
                onClose={handleClose}
                // maxWidth="sm"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            Customer Details
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <>
                    <DialogContent>
                        <div>
                            <div className="row">
                                <Grid container direction="row">
                                    <Grid item lg={12} md={12} xs={12}>
                                        <>
                                            <Formik
                                                // innerRef={ref}
                                                // enableReinitialize={true}
                                                initialValues={initialValues1}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                // onReset={handleReset}
                                                validationSchema={validationSchema}
                                            >
                                                {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => (
                                                    // return (
                                                    <Form>
                                                        <div style={{ marginTop: '6px', margin: '10px' }}>
                                                            <Grid gap="10px" display="flex">
                                                                <Grid item>
                                                                    <TextField
                                                                        label="Customer Name"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { sm: 200, md: 200 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        disabled={mode === 'VIEW_UPDATE' || mode === 'VIEW'}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        name="name"
                                                                        value={values.name}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.name && errors.name)}
                                                                        helperText={touched.name && errors.name ? errors.name : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 200 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        id="outlined-required"
                                                                        label="Address"
                                                                        name="address"
                                                                        disabled={mode === 'VIEW'}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.address}
                                                                        error={Boolean(touched.address && errors.address)}
                                                                        helperText={touched.address && errors.address ? errors.address : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 200 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        id="outlined-required"
                                                                        label="Email"
                                                                        type="email"
                                                                        name="email"
                                                                        disabled={mode === 'VIEW'}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.email}
                                                                        error={Boolean(touched.email && errors.email)}
                                                                        helperText={touched.email && errors.email ? errors.email : ''}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <br />

                                                            <Grid gap="10px" display="flex">
                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 200 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        id="outlined-required"
                                                                        label="Contact Number"
                                                                        type="text"
                                                                        name="contactNumber"
                                                                        disabled={mode === 'VIEW'}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.contactNumber}
                                                                        error={Boolean(touched.contactNumber && errors.contactNumber)}
                                                                        helperText={
                                                                            touched.contactNumber && errors.contactNumber
                                                                                ? errors.contactNumber
                                                                                : ''
                                                                        }
                                                                    />
                                                                </Grid>

                                                                <Grid>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 200 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        id="outlined-required"
                                                                        label="Created By"
                                                                        //   name="shortName"
                                                                        disabled
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        // value={
                                                                        //     values.manager && values.manager ? values.manager.shortName : ''
                                                                        // }
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <br />
                                                            <Grid gap="10px" display="flex">
                                                                <Grid item>
                                                                    <Typography variant="" component="p">
                                                                        Status
                                                                    </Typography>
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            // name="status"
                                                                            onChange={handleInputChange}
                                                                            // value={formValues.status}
                                                                            control={<Switch />}
                                                                            label="Status"
                                                                            // checked={formValues.status}
                                                                            disabled={mode === 'VIEW'}
                                                                        />
                                                                        {/* <FormControlLabel
                      disabled
                      control={<Switch />}
                      label="Disabled"
                    /> */}
                                                                    </FormGroup>
                                                                </Grid>
                                                            </Grid>
                                                        </div>

                                                        {/* <br /> */}
                                                        <Box>
                                                            {/* <Grid item>
                                                                    {mode === 'VIEW' ? (
                                                                        <CreatedUpdatedUserDetailsWithTableFormat formValues={values} />
                                                                    ) : null}
                                                                </Grid> */}
                                                        </Box>

                                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                            {mode !== 'VIEW' ? (
                                                                <Button
                                                                    variant="outlined"
                                                                    type="reset"
                                                                    style={{
                                                                        // backgroundColor: '#B22222',
                                                                        marginLeft: '10px'
                                                                    }}
                                                                    // onClick={handleCancel}
                                                                >
                                                                    Clear
                                                                </Button>
                                                            ) : (
                                                                ''
                                                            )}

                                                            {mode !== 'VIEW' ? (
                                                                <Button variant="contained" type="submit" className="btnSave">
                                                                    {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                                </Button>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </Box>
                                                    </Form>
                                                    // );
                                                )}
                                            </Formik>
                                        </>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
};

export default CustomerManage;
