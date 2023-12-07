import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    //DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';

// assets
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WheelSpinner from './wheelSpinner/WheelSpinner';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
//import CasinoIcon from '@mui/icons-material/Casino';
// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp }) => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [name, setName] = useState('');
    //const [password, setPassword] = useState('');
    const [char, setChar] = useState('');
    const { login } = useAuth();
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);
    //const [showPassword, setShowPassword] = React.useState(false);

    const handleClickUserName = () => {
        setOpenDialog(true);
    };
    const handleClickPassword = () => {
        setOpenPassword(true);
    };

    // const handlePasswordCancel = () => {
    //     setOpenPassword(false)
    //     setPassword('')
    // }

    const handleUserCancel = () => {
        setOpenDialog(false)
        setName('')
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    // email: 'info@codedthemes.com',
                    password: '',
                    submit: null,
                    openDialog: false,
                    openPassword: false
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await login(values.email, values.password);

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {/* Email input */}
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Click on the Person to Enter UserName --&gt;</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={name}
                                disabled
                                name="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle username dialog"
                                            onClick={handleClickUserName}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            <PersonIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Click on the Lock to Enter Password --&gt;</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type="password"
                                value={name}
                                disabled
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password dialog"
                                            onClick={handleClickPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            <LockIcon />
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
                                    to={
                                        loginProp
                                            ? `/pages/forgot-password/forgot-password${loginProp}`
                                            : '/pages/forgot-password/forgot-password3'
                                    }
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
                        <Dialog
                            open={openDialog}
                            onClose={() => setOpenDialog(false)}
                            setName={setName}
                            name={name}
                            char={char}
                            setChar={setChar}
                        >
                            <DialogTitle>ENTER YOUR USERNAME</DialogTitle>
                            <DialogContent
                                style={{
                                    height: '600px',
                                    overflow: 'hidden',
                                    margin: '10px'
                                }}
                            >
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="USERNAME"
                                    type="text"
                                    value={name}
                                    fullWidth
                                    variant="standard"
                                />
                                <WheelSpinner setName={setName} name={name} char={char} setChar={setChar} />
                            </DialogContent>
                            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                                <Button size="large" variant="contained" onClick={handleUserCancel} endIcon={<CloseIcon />}>
                                    Cancel
                                </Button>
                                <Button size="large" variant="contained" onClick={() => setOpenDialog(false)} endIcon={<LoginIcon />}>
                                    Continue
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={openPassword}
                            onClose={() => setOpenPassword(false)}
                            setName={setName}
                            name={name}
                            char={char}
                            setChar={setChar}
                        >
                            <DialogTitle>ENTER YOUR PASSWORD</DialogTitle>
                            <DialogContent
                                style={{
                                    height: '600px',
                                    overflow: 'hidden',
                                    margin: '10px'
                                }}
                            >
                                <TextField
                                    margin="dense"
                                    id="password"
                                    label="PASSWORD"
                                    type="text"
                                    value={name}
                                    fullWidth
                                    variant="standard"
                                />
                                <WheelSpinner setName={setName} name={name} char={char} setChar={setChar} />
                            </DialogContent>
                            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                                <Button size="large" variant="contained" onClick={() => setOpenPassword(false)} endIcon={<CloseIcon />}>
                                    Cancel
                                </Button>
                                <Button size="large" variant="contained" onClick={() => setOpenPassword(false)} endIcon={<LoginIcon />}>
                                    Continue
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </Formik>
        </>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
