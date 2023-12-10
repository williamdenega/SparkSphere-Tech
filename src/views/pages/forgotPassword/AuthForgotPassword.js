import React, { useState, useEffect } from 'react';
import { Box, Button, OutlinedInput, DialogActions, Dialog, DialogTitle, Typography } from '@mui/material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'; // import Input from 'react-phone-number-input/input';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
const AuthForgotPassword = () => {
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
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

    let handleNum = time
        .toLocaleString('en-US', {
            style: 'decimal',
            minimumIntegerDigits: 10, // Assuming you want a 10-digit phone number
            useGrouping: true
        })
        .replace(/,/g, '-');
    const handleCloseDialog = () => {
        // Close the dialog
        setOpenDialog(false);
    };
    const handleResetClick = () => {
        // Reset timer and stop it
        clearInterval(time);
        setTime(0);
        setIsTimerRunning(false);
    };

    return (
        <>
            <OutlinedInput
                fullWidth
                id="outlined-adornment-email-login"
                type="tel"
                value={handleNum}
                name="username"
                disabled
                readOnly
                endAdornment={<PhoneIphoneOutlinedIcon />}
            />
            <Box sx={{ mt: 3 }}>
                <DialogActions mb={2} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    {/* Reset button */}
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
                    {/* Play/Pause button */}
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
                {/* Continue button */}
                <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Button size="large" variant="contained" fullWidth onClick={() => setOpenDialog(true)}>
                        Continue
                    </Button>
                </DialogActions>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                {/* Content of the dialog */}
                <DialogTitle>Is This Your Phone Number?</DialogTitle>
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h2">
                        +
                        {time
                            .toLocaleString('en-US', {
                                style: 'decimal',
                                minimumIntegerDigits: 10, // Assuming you want a 10-digit phone number
                                useGrouping: true
                            })
                            .replace(/,/g, '-')}
                    </Typography>
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
                    {/* Actions or buttons for the dialog */}
                    <Button size="large" variant="contained" startIcon={<CheckOutlinedIcon />} fullWidth onClick={handleCloseDialog}>
                        Yes. Send Text!
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AuthForgotPassword;
