import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Switch,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthService from 'services/auth.service';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // setFormValues({
        //     ...formValues,
        //     [name]: value
        // });
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    {/* <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box> */}
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    username: '',
                    companyEmail: '',
                    contactNumber: '',
                    activeState: true,
                    nic: '',
                    mName: '',
                    image: '',
                    companyId: 1,
                    plantId: 1,
                    departmentId: 3,
                    roles: null

                    // submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('User Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    companyEmail: Yup.string().email('Must be a valid email').max(255).required('Company Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    roles: Yup.object().typeError('Required field')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // navigate('/dashboard/lockhood', { replace: true });
                        await AuthService.register(values);
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Your registration has been successfully completed.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );

                            setTimeout(() => {
                                navigate('/login', { replace: true });
                            }, 1500);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{
                                        width: { sm: 200, md: 200 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    select
                                    name="departmentId"
                                    label="Department"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.departmentId}
                                    error={Boolean(touched.departmentId && errors.departmentId)}
                                    helperText={touched.departmentId && errors.departmentId ? errors.departmentId : ''}
                                >
                                    <MenuItem dense="true" value="3">
                                        Sales & Marketing
                                    </MenuItem>
                                    <MenuItem dense="true" value="4">
                                        Purchasing
                                    </MenuItem>
                                    <MenuItem dense="true" value="5">
                                        Finance
                                    </MenuItem>
                                    <MenuItem dense="true" value="6">
                                        IT
                                    </MenuItem>
                                    <MenuItem dense="true" value="7">
                                        HR
                                    </MenuItem>
                                    <MenuItem dense="true" value="8">
                                        R&D
                                    </MenuItem>
                                    <MenuItem dense="true" value="9">
                                        Engineering Design
                                    </MenuItem>
                                    <MenuItem dense="true" value="10">
                                        Engineering and Factory Management
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{
                                        width: { sm: 200, md: 200 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    select
                                    name="roles"
                                    label="User Role"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.roles}
                                    error={Boolean(touched.roles && errors.roles)}
                                    helperText={touched.roles && errors.roles ? errors.roles : ''}
                                >
                                    <MenuItem dense="true" value="ROLE_ADMIN">
                                        ADMIN
                                    </MenuItem>
                                    <MenuItem dense="true" value="ROLE_SUPERVISOR">
                                        SUPERVISOR
                                    </MenuItem>
                                    <MenuItem dense="true" value="5">
                                        ADMIN_ENGINEERING_DEP
                                    </MenuItem>
                                    <MenuItem dense="true" value="6">
                                        ADMIN_PURCHASE_OFFICE
                                    </MenuItem>
                                    <MenuItem dense="true" value="7">
                                        USER
                                    </MenuItem>
                                    <MenuItem dense="true" value="8">
                                        CUSTOMER
                                    </MenuItem>
                                    {/* <MenuItem dense="true" value="9">
                                        Engineering Design
                                    </MenuItem>
                                    <MenuItem dense="true" value="10">
                                        Engineering and Factory Management
                                    </MenuItem> */}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.firstName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.lastName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Middle Name"
                                    margin="normal"
                                    name="mName"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.mName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    margin="normal"
                                    name="address"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.address}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    margin="normal"
                                    name="username"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    error={Boolean(touched.username && errors.username)}
                                    helperText={touched.username && errors.username ? errors.username : ''}
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.username}
                                    onBlur={handleBlur}
                                    onChange={handleChange}

                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    margin="normal"
                                    name="contactNumber"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.contactNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    variant="outlined"
                                    // sx={{
                                    //     // width: { sm: 200, md: 300 },
                                    //     '& .MuiInputBase-root': {
                                    //         height: 40
                                    //     }
                                    // }}
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.companyEmail && errors.companyEmail)}
                                    // sx={{
                                    //     // width: { sm: 200, md: 300 },
                                    //     '& .MuiInputBase-root': {
                                    //         height: 40
                                    //     }
                                    // }}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Company Email Address </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        variant="outlined"
                                        // InputLabelProps={{
                                        //     shrink: true
                                        // }}
                                        value={values.companyEmail}
                                        name="companyEmail"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.companyEmail && errors.companyEmail && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.companyEmail}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="NIC"
                                    margin="normal"
                                    name="nic"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={values.nic}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="DOB"
                                    margin="normal"
                                    name="image"
                                    type="text"
                                    sx={{
                                        // width: { sm: 200, md: 300 },
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    // InputLabelProps={{
                                    //     shrink: true
                                    // }}
                                    value={values.image}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="" component="p">
                                    Status
                                </Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        name="activeState"
                                        onChange={handleChange}
                                        value={values.activeState}
                                        control={<Switch color="success" />}
                                        // label="Status"
                                        checked={values.activeState}
                                        // disabled={mode == 'VIEW'}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
