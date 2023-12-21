import React, { useState, useRef, useEffect } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, InputAdornment, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { isMobile } from 'react-device-detect';
//assets
import WheelSpinner from './wheelSpinner/WheelSpinner';
// import LoginIcon from '@mui/icons-material/Login';
//import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
export default function UserDialog({ setOpenDialog, setInput, input, title, open, setSpins, spins }) {
    const [spinning, setSpinning] = useState(false);
    const [animate, setAnimate] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (spinning) {
            if (inputRef.current) {
                const parent = inputRef.current.parentNode;
                // console.log(parent);
                parent.style.borderBottom = '1px solid #3f51b5';
            }
        } else {
            if (inputRef.current) {
                const parent = inputRef.current.parentNode;
                parent.style.borderBottom = 'inherit';
            }
        }
    }, [spinning]);
    const handleAnimate = () => {
        // Trigger animation when clicked is true
        setAnimate(true);

        // Reset animation after a short delay (adjust duration based on your preference)
        const timeoutId = setTimeout(() => {
            setAnimate(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    };

    return (
        <>
            <DialogTitle style={{ textAlign: 'center' }}>ENTER YOUR {title}</DialogTitle>
            {/* <DialogTitle>Spins Remaining {spins}</DialogTitle> */}
            <DialogContent
                style={{
                    height: isMobile ? '450px' : '600px',
                    overflow: 'hidden',
                    margin: '10px'
                }}
            >
                <Grid container direction={'row'} alignItems="flex-end" justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="h4" style={{ textAlign: 'right' }}>
                            Spins Remaining:
                        </Typography>
                    </Grid>
                    <Grid item ml={1}>
                        <Typography
                            variant="h4"
                            style={{
                                color: spins <= 3 ? 'red' : 'inherit',
                                textAlign: 'right',
                                transform: animate ? `translateY(50px)` : 'none',
                                opacity: animate ? 0 : 1,
                                transition: animate ? 'transform 1s ease-in-out, opacity 0.5s ease-out 0.5s' : 'opacity 1s'
                            }}
                        >
                            {spins}
                        </Typography>
                    </Grid>
                </Grid>
                <TextField
                    margin="dense"
                    id="name"
                    label={title}
                    type="text"
                    value={input}
                    fullWidth
                    variant="standard"
                    InputProps={{
                        style: {
                            pointerEvents: 'none'
                        },
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                {title == 'USERNAME' ? (
                                    <AccountCircle color={spinning ? 'primary' : 'inherit'} />
                                ) : (
                                    <LockRoundedIcon color={spinning ? 'primary' : 'inherit'} />
                                )}
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        style: {
                            color: spinning ? '#3f51b5' : 'inherit', // Change 'red' to the color you want when spinning is true
                            fontWeight: spinning ? 'bold' : 'inherit'
                        }
                    }}
                    inputRef={inputRef}
                />
                <WheelSpinner
                    setInput={setInput}
                    input={input}
                    spinning={spinning}
                    setSpinning={setSpinning}
                    open={open}
                    setSpins={setSpins}
                    spins={spins}
                    handleAnimate={handleAnimate}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                <Button size="large" disabled={spinning} variant="contained" fullWidth onClick={() => setOpenDialog(false)}>
                    Continue
                </Button>
            </DialogActions>
        </>
    );
}
