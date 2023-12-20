import React, { useState, useEffect } from 'react';
import { Box, Button, OutlinedInput, DialogActions, Dialog, DialogTitle, Typography, DialogContent } from '@mui/material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
const AuthForgotPassword = () => {
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        let timer;

        if (isTimerRunning) {
            // Increment time every 100 milliseconds
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1);
        }

        // Cleanup interval on component unmount or timer stop
        return () => {
            clearInterval(timer);
        };
    }, [isTimerRunning]);

    const handlePlayPauseClick = () => {
        // Toggle between play and pause
        setIsTimerRunning((prevState) => !prevState);
    };

    const handleSendText = () => {
        // Perform actions to send text (e.g., API call, etc.)
        // For illustration purposes, setting success to true immediately
        setSuccess(true);
    };
    const handleCloseDialog = () => {
        // Close the dialog
        setOpenDialog(false);
        setSuccess(false);
    };

    const handleCloseSuccess = () => {
        // Close the dialog
        setOpenDialog(false);
        setTimeout(() => {
            setSuccess(false);
        }, 200);
        handleResetClick();
    };

    const handleResetClick = () => {
        // Reset timer and stop it
        clearInterval(time);
        setTime(0);
        setIsTimerRunning(false);
    };

    const formattedNumber = `${time
        .toLocaleString('en-US', {
            minimumIntegerDigits: 10,
            useGrouping: false
        })
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}`;

    return (
        <>
            <OutlinedInput
                fullWidth
                id="outlined-adornment-email-login"
                type="tel"
                value={formattedNumber}
                name="username"
                disabled
                readOnly
                endAdornment={<PhoneIphoneOutlinedIcon />}
            />
            <Box sx={{ mt: 3 }}>
                <DialogActions mb={2} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button
                        size="large"
                        variant="outlined"
                        color="error"
                        disabled={time === 0}
                        onClick={handleResetClick}
                        startIcon={<DeleteOutlinedIcon />}
                    >
                        RESET
                    </Button>
                    <Button
                        size="large"
                        onClick={handlePlayPauseClick}
                        variant="outlined"
                        endIcon={isTimerRunning ? <PauseIcon fontSize="large" /> : <PlayCircleIcon fontSize="large" />}
                    >
                        {isTimerRunning ? 'Pause' : 'Play'}
                    </Button>
                </DialogActions>
            </Box>
            <Box sx={{ mt: 3 }}>
                <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button
                        size="large"
                        variant="contained"
                        fullWidth
                        onClick={() => setOpenDialog(true)}
                        disabled={isTimerRunning || !time}
                    >
                        {isTimerRunning ? 'Pause to continue' : 'Continue'}
                    </Button>
                </DialogActions>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog} isTimerRunning={isTimerRunning}>
                {success ? (
                    <>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            <Typography variant="h2">Success! </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4"> Check your phone within the next 3-7 days for a password reset link.</Typography>
                            <Typography variant="h3" mt={2}>
                                Need it sooner?
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Button size="large" variant="outlined" fullWidth onClick={handleCloseSuccess}>
                                $4.99 for an instant Text
                            </Button>
                        </DialogActions>
                        <DialogActions style={{ alignItems: 'center' }}>
                            <Button size="large" variant="contained" fullWidth onClick={handleCloseSuccess} startIcon={<CloseIcon />}>
                                Close
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitle align="center">Is This Your Number?</DialogTitle>
                        <Box sx={{ textAlign: 'center', m: 3 }}>
                            <Typography variant="h2">{formattedNumber}</Typography>
                        </Box>
                        <DialogActions mb={2} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Button
                                size="large"
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={handleCloseDialog}
                                startIcon={<ArrowBackOutlinedIcon />}
                            >
                                No, Go Back.
                            </Button>
                        </DialogActions>
                        <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Button size="large" variant="contained" startIcon={<CheckOutlinedIcon />} fullWidth onClick={handleSendText}>
                                Yes, Send Text!
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default AuthForgotPassword;
