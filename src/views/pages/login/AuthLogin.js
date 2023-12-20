import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    Dialog,
    FormControlLabel,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import UserDialog from './components/UserDialog';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import MaterialUISwitch from './components/MaterialUISwitch';

const JWTLogin = ({ setSpins, spins }) => {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false });
    const [errors, setErrors] = useState({ username: '', password: '', login: '' });
    const [buyBackDialog, setBuyBackDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const handleBlur = () => {
        // Validation logic can be added here if needed
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ username: '', password: '', login: '' });
        if (!touched[name]) {
            setTouched({ ...touched, [name]: true });
        }
        if (name === 'username') {
            setName(value);
            setErrors({ ...errors, username: '' });
        } else if (name === 'password') {
            setPassword(value);
            setErrors({ ...errors, password: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add your validation logic here if needed
        if (!name || !password) {
            setErrors({
                username: !name ? 'Username is required' : '',
                password: !password ? 'Password is required' : ''
            });
            setTouched({ username: true, password: true });
            return;
        }

        try {
            setIsSubmitting(true);
            // Add your login logic here
            // await login(name, password);
            setBuyBackDialog(true);
            throw new Error('Login  Failed');
            // If successful, you can redirect or perform other actions
        } catch (err) {
            console.error(err);
            setErrors({ login: `${err.message}`, password: '', username: 'Username Stolen' });
            setPassword('');
            //setSpins(10);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSwitchNavType = () => {
        // Toggle between 'light' and 'dark'
        // Add your logic here to update the navigation type
    };

    const handleRickRoll = () => {
        // Redirect to the Rick Roll video
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        setBuyBackDialog(false);
    };

    const handleClickUserName = () => {
        setOpenDialog(true);
        setErrors({ ...errors, username: '', login: '' });
    };

    const handleClickPassword = () => {
        setOpenPassword(true);
        setErrors({ ...errors, password: '', login: '' });
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <FormControl
                fullWidth
                error={Boolean(touched.username && errors.username)}
                sx={{
                    ...theme.typography.customInput,
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                        '& fieldset': {
                            borderColor: errors.username ? 'red' : 'inherit' // Set the color you want for the error state
                        }
                    }
                }}
            >
                <InputLabel htmlFor="outlined-adornment-email-login">Press Icon to Enter UserName -&gt;</InputLabel>

                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={name}
                    name="username"
                    disabled
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
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
                {touched.username && errors.username && (
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.username}</FormHelperText>
                        </Grid>
                        {errors.login && (
                            <>
                                <Grid item>
                                    <FormHelperText error>Steal the username back?</FormHelperText>
                                </Grid>
                                <Grid item>
                                    <Button size="small" color="error" variant="outlined" onClick={() => setBuyBackDialog(true)}>
                                        $4.99
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                )}
                {/* {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>} */}
            </FormControl>

            <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{
                    ...theme.typography.customInput,
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                        '& fieldset': {
                            borderColor: errors.password ? 'red' : 'inherit' // Set the color you want for the error state
                        }
                    }
                }}
            >
                <InputLabel htmlFor="outlined-adornment-password-login">Press Lock to Enter Password -&gt;</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-login"
                    type="password"
                    value={password}
                    name="password"
                    disabled
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
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
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} onChange={handleSwitchNavType} checked={false} />} />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component={Link} to="/forgot" color="secondary" sx={{ textDecoration: 'none' }}>
                        Forgot Password?
                    </Typography>
                </Grid>
            </Grid>

            {/* {errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}  */}
            {errors.login && (
                <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="error" align="center">
                            {errors.login}
                        </Typography>
                    </Grid>
                </Grid>
            )}

            <Box sx={{ mt: 2 }}>
                <Button
                    color="secondary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    endIcon={<LoginIcon />}
                >
                    Sign In
                </Button>
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <UserDialog
                    setOpenDialog={setOpenDialog}
                    setInput={setName}
                    input={name}
                    title={'USERNAME'}
                    open={openDialog}
                    setSpins={setSpins}
                    spins={spins}
                />
            </Dialog>
            <Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
                <UserDialog
                    setOpenDialog={setOpenPassword}
                    setInput={setPassword}
                    input={password}
                    title={'PASSWORD'}
                    open={openPassword}
                    setSpins={setSpins}
                    spins={spins}
                />
            </Dialog>
            <Dialog open={buyBackDialog} onClose={() => setBuyBackDialog(false)}>
                <DialogTitle align="center">Username Stolen!</DialogTitle>
                <DialogContent align="center">
                    <DialogContentText>
                        Oops! It seems like your username has been stolen. But dont worry, you can steal it back right now for $4.99.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button size="large" variant="outlined" onClick={() => setBuyBackDialog(false)}>
                        Cancel
                    </Button>
                    <Button size="large" variant="contained" onClick={handleRickRoll}>
                        $4.99
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default JWTLogin;
