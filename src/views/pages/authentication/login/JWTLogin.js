import PropTypes from 'prop-types';
import { React, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthService from 'services/auth.service';
import { useDispatch } from 'react-redux';
import accountReducer from 'store/accountReducer';
import { LOGIN } from 'store/actions';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const scriptedRef = useScriptRef();

    const [checked, setChecked] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const initialState = {
        isLoggedIn: false,
        isInitialized: false,
        user: null
    };
    const [state, dispatch1] = useReducer(accountReducer, initialState);
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                // navigate('/dashboard/lockhood', { replace: true });
                try {
                    AuthService.login(values.username, values.password).then(
                        (response) => {
                            if (scriptedRef.current) {
                                // console.log(response.data);
                                setStatus({ success: true });
                                // setErrors({ submit: err.message });
                                setSubmitting(false);

                                dispatch1({
                                    type: LOGIN,
                                    payload: {
                                        isLoggedIn: true
                                        // user
                                    }
                                });
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: 'Your login has been successfully completed.',
                                        variant: 'alert',
                                        alert: {
                                            color: 'success'
                                        },
                                        close: true
                                    })
                                );
                                navigate('/dashboard/lockhood', { replace: true });

                                // window.location.reload();

                                // setTimeout(() => {
                                //     navigate('/dashboard/lockhood', { replace: true });
                                // }, 500);
                            }
                            // }
                        },
                        (error) => {
                            console.log('erroe');
                            const resMessage =
                                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                            setStatus({ success: false });
                            setErrors({ submit: error.message });
                            setSubmitting(false);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Please Try Again.Login Details are wrong.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'error'
                                    },
                                    close: false
                                })
                            );

                            //   setLoading(false);
                            //   setMessage(resMessage);
                        }
                    );
                } catch (err) {
                    console.error(err);
                    console.log('erroe2');
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
                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login"> Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            value={values.username}
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label=" Username"
                            inputProps={{}}
                        />
                        {touched.username && errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            label="Password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                label="Keep me logged in"
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={loginProp ? `/pages/forgot-password/forgot-password${loginProp}` : '/pages/forgot-password'}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Sign In
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
