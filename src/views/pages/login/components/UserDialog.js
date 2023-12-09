import React, { useState } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';

//assets
import WheelSpinner from './wheelSpinner/WheelSpinner';
import LoginIcon from '@mui/icons-material/Login';
//import CloseIcon from '@mui/icons-material/Close';

export default function UserDialog({ setOpenDialog, setName, input, title, open }) {
    const [spinning, setSpinning] = useState(false);

    return (
        <>
            <DialogTitle>ENTER YOUR {title}</DialogTitle>
            <DialogContent
                style={{
                    height: '600px',
                    overflow: 'hidden',
                    margin: '10px'
                }}
            >
                <TextField margin="dense" id="name" label={title} type="text" value={input} fullWidth variant="standard" />
                <WheelSpinner setInput={setName} input={input} spinning={spinning} setSpinning={setSpinning} open={open}/>
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
