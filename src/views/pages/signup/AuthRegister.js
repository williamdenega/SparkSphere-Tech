import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    // IconButton,
    // InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    MenuItem,
    Select
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
// import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

const JWTLogin = () => {
    const usernameInputRef = useRef(null);
    const theme = useTheme();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false, phoneNumber: false });
    const [errors, setErrors] = useState({ phoneNumber: '', username: '', password: '', login: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleBlur = () => {
        // Validation logic can be added here if needed
    };

    useEffect(() => {
        if (phoneNumber.length === 10 && usernameInputRef.current) {
            usernameInputRef.current.focus();
        }
    }, [phoneNumber]);

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
            throw new Error('Failed to create Account (not set up yet)');
            // If successful, you can redirect or perform other actions
        } catch (err) {
            console.error(err);
            setErrors({ login: ` ${err.message}`, password: '', phoneNumber: '', username: '' });
            //setName('');
            setPassword('');
            setName('');
            setPhoneNumber('');
            //setSpins(10);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formattedNumber = (phoneNumber) => {
        return `${phoneNumber
            .toLocaleString('en-US', {
                minimumIntegerDigits: 10,
                useGrouping: false
            })
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}`;
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <FormControl
                required
                fullWidth
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                sx={{ ...theme.typography.customInput }}
            >
                <InputLabel htmlFor="outlined-adornment-email-login">Enter Phone Number</InputLabel>

                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="tel"
                    value={formattedNumber(phoneNumber)}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={<PhoneIphoneOutlinedIcon />}
                />
                {touched.phoneNumber && errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
            </FormControl>

            <FormControl required fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
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
                {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
            </FormControl>

            <FormControl
                required
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
                <InputLabel htmlFor="outlined-adornment-password-login">Select a Password</InputLabel>
                <Select
                    labelId="select-password-label"
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

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item></Grid>
                <Grid item>
                    <Typography variant="subtitle1" component={Link} to="/forgot" color="secondary" sx={{ textDecoration: 'none' }}>
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
        </form>
    );
};

export default JWTLogin;
