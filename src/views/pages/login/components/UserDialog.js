import React, { useState, useRef, useEffect } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

//assets
import WheelSpinner from './wheelSpinner/WheelSpinner';
import LoginIcon from '@mui/icons-material/Login';
//import CloseIcon from '@mui/icons-material/Close';

export default function UserDialog({ setOpenDialog, setInput, input, title, open, setSpins, spins }) {
    const [spinning, setSpinning] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (spinning) {
            inputRef.current.focus();
            inputRef.current.select();
            return;
        }
        setTimeout(() => {
            inputRef.current.blur();
        }, 350);
    }, [spinning]);

    return (
        <>
            <DialogTitle>ENTER YOUR {title}</DialogTitle>
            {/* <DialogTitle>Spins Remaining {spins}</DialogTitle> */}
            <DialogContent
                style={{
                    height: '600px',
                    overflow: 'hidden',
                    margin: '10px'
                }}
            >
                <Typography variant="h4">Spins Remaining: {spins} </Typography>
                <TextField
                    margin="dense"
                    id="name"
                    label={title}
                    type="text"
                    value={input}
                    fullWidth
                    variant="standard"
                    InputProps={{ readOnly: true }}
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
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                <Button
                    size="large"
                    disabled={spinning}
                    variant="contained"
                    fullWidth
                    onClick={() => setOpenDialog(false)}
                    endIcon={<LoginIcon />}
                >
                    Continue
                </Button>
            </DialogActions>
        </>
    );
}
