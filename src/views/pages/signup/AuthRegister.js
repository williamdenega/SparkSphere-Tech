import React, { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    // Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    // Typography,
    MenuItem,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
    // Typography,
    // Link
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
// import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

import PhoneDialog from './components/PhoneDialog';

const JWTLogin = () => {
    const usernameInputRef = useRef(null);
    const theme = useTheme();
    const [phoneNumberArr, setPhoneNumberArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneDialog, setPhoneDialog] = useState(false);
    const [userDialog, setUserDialog] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false, phoneNumber: false });
    const [errors, setErrors] = useState({ phoneNumber: '', username: '', password: '', login: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleBlur = () => {
        // console.log('PLEASE TELL THIS THIS WORKS!!!!!!');
        if (!name) {
            return;
        }
        setErrors({ username: 'UserName alreadt exits.' });
    };

    useEffect(() => {
        setPhoneNumber(phoneNumberArr.join(''));
    }, [phoneNumberArr]);

    useEffect(() => {
        setPhoneNumber('');
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ username: '', password: '', login: '' });
        if (!touched[name]) {
            setTouched({ ...touched, [name]: true });
        }
        if (name === 'username') {
            setName(value);
        } else if (name === 'password') {
            setPassword(value);
            setErrors({ ...errors, password: '' });
        } else if (name === 'phoneNumber') {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add your validation logic here if needed
        if (!name || !password || !phoneNumber) {
            setErrors({
                phoneNumber: !phoneNumber ? 'Phone Number is required' : '',
                username: !name ? 'Username is required' : '',
                password: !password ? 'Password is required' : ''
            });
            setTouched({ username: true, password: true, phoneNumber: true });
            return;
        }

        try {
            setIsSubmitting(true);
            // Add your login logic here
            // await login(name, password);
            throw new Error('Failed to create Account (WEAK PASSWORD)');
            // If successful, you can redirect or perform other actions
        } catch (err) {
            console.error(err);
            setErrors({ login: ` ${err.message}`, password: '', phoneNumber: '', username: '' });
            //setName('');
            setPhoneNumberArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setPassword('');
            setName('');
            setPhoneNumber('');
            //setSpins(10);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePhoneDialog = () => {
        setPhoneDialog(true);
    };

    const formattedNumber = (num) => {
        return `${num
            .toLocaleString('en-US', {
                minimumIntegerDigits: 10,
                useGrouping: false
            })
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}`;
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-phoneNumber-login">Press Phone to enter Number -&gt;</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-phoneNumber-login"
                    type="tel"
                    value={formattedNumber(phoneNumber)}
                    name="phoneNumber"
                    disabled
                    onBlur={handleBlur}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password dialog"
                                onClick={handlePhoneDialog}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                            >
                                <PhoneIphoneOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {touched.phoneNumber && errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Enter UserName</InputLabel>

                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    inputRef={usernameInputRef}
                    value={name}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endIcon={<PersonIcon />}
                    endAdornment={<PersonIcon />}
                />
                {touched.username && errors.username && (
                    <>
                        <FormHelperText error>{errors.username}</FormHelperText>
                        <FormHelperText error>
                            Want to steal the username?
                            <Button size="small" color="error" onClick={() => setUserDialog(true)}>
                                $4.99
                            </Button>
                        </FormHelperText>
                    </>
                )}
            </FormControl>
            <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{
                    marginTop: 2,
                    marginBottom: 1,
                    '& > label': {
                        top: 10,
                        left: 0,
                        color: theme.palette.grey[500],
                        '&[data-shrink="false"]': {
                            top: 0
                        }
                    },
                    '& > div > div > select': {
                        padding: '20.5px 14px 11.5px !important',
                        border: '1px solid ' + theme.palette.grey[500],
                        borderRadius: '4px',
                        outline: 'none',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        '&:hover': {
                            borderColor: theme.palette.primary.main
                        },
                        '&:focus': {
                            borderColor: theme.palette.primary.main
                        }
                    },
                    '& legend': {
                        display: 'none'
                    },
                    '& fieldset': {
                        top: -10
                    }
                }}
            >
                <InputLabel id="demo-simple-select-label">Select a Password</InputLabel>
                <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={password}
                    name="password"
                    label="password"
                    onChange={handleChange}
                >
                    <MenuItem value="biggusdickusfan">BiggusDickusFan</MenuItem>
                    <MenuItem value="blessedarethecheesemakers">BlessedAreTheCheesemakers</MenuItem>
                    <MenuItem value="PeoplesFrontOfJudea">PeoplesFrontOfJudea</MenuItem>
                    <MenuItem value="AlwaysLookOnTheBrightSide">AlwaysLookOnTheBrightSide</MenuItem>
                </Select>
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                {errors.login && (
                    <FormHelperText mt={2} error>
                        {errors.login}
                    </FormHelperText>
                )}
            </FormControl>

            {/* <Grid container alignItems="center" justifyContent="space-between">
                <Grid item></Grid>
                <Grid item>
                    <Typography variant="subtitle1" component={Link} to="/forgot" color="secondary" sx={{ textDecoration: 'none' }}>
                        Forgot Password?
                    </Typography>
                </Grid>
            </Grid> */}

            {errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
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
                    Create Account
                </Button>
            </Box>
            <Dialog open={phoneDialog} onClose={() => setPhoneDialog(false)}>
                <PhoneDialog phoneNumber={phoneNumberArr} setPhoneNumber={setPhoneNumberArr} setPhoneDialog={setPhoneDialog} />
            </Dialog>
            <Dialog open={userDialog} onClose={() => setUserDialog(false)}>
                <DialogTitle>Steal Username {name}?</DialogTitle>
                <DialogContent>
                    <DialogContentText>For just $4.99, you can steal the username you&apos;ve entered!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUserDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => setUserDialog(false)} color="primary" autoFocus>
                        Pay $4.99
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default JWTLogin;
