import React, { useState } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';

//assets
import WheelSpinner from './wheelSpinner/WheelSpinner';
import LoginIcon from '@mui/icons-material/Login';
//import CloseIcon from '@mui/icons-material/Close';

export default function UserDialog({ setOpenDialog, setName, input }) {
    const [spinning, setSpinning] = useState(false);

    return (
        <>
            <DialogTitle>ENTER YOUR USERNAME</DialogTitle>
            <DialogContent
                style={{
                    height: '600px',
                    overflow: 'hidden',
                    margin: '10px'
                }}
            >
                <TextField margin="dense" id="name" label="USERNAME" type="text" value={input} fullWidth variant="standard" />
                <WheelSpinner setInput={setName} input={input} spinning={spinning} setSpinning={setSpinning} />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                {/* <Button size="large" disabled={spinning} variant="contained" onClick={handleUserCancel} endIcon={<CloseIcon />}>
                    Delete Input
                </Button> */}
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
