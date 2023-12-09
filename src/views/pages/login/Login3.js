import { Link } from 'react-router-dom';
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
// import WheelSpinner from './wheelSpinner/WheelSpinner';

// assets
// import LoginIcon from '@mui/icons-material/Login';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const [spins, setSpins] = useState(10);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={1} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 2 }}>
                                        <Link to="#" aria-label="theme-logo">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        
                                                        variant="overline"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction={'row'} alignItems="flex-end" justifyContent="flex-end">
                                                    <Grid item>
                                                        <Typography variant="caption" fontSize="14px" style={{ textAlign: 'right' }}>
                                                            Spins Remaining:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item ml={1}>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="14px"
                                                            style={{ color: spins <= 3 ? 'red' : 'inherit', textAlign: 'right' }}
                                                        >
                                                            {spins}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        variant="overline"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Spins Remaining: {spins}
                                                    </Typography>
                                                    <Typography
                                                        variant="overline"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        {spins}
                                                    </Typography>
                                                </Stack>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 2 }}>
                                        <AuthLogin setSpins={setSpins} spins={spins} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ mb: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
