import { DialogContent, DialogTitle, Typography, Button, DialogActions, Box } from '@mui/material';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import BinarySelect from './BinarySelect';
import { useTheme } from '@mui/material';

const PhoneDialog = ({ phoneNumber, setPhoneNumber, setPhoneDialog }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const [phoneNumber, setPhoneNumber] = useState([0, 2, 4, 0, 0, 0, 0, 0, 0, 0]);
    const handleNextStep = () => {
        if (activeStep === steps.length - 1) {
            setPhoneDialog(false);
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setPhoneNumber(phoneNumber);
    };

    return (
        <>
            <DialogTitle style={{ textAlign: 'center' }}>ENTER YOUR PHONE NUMBER USING BINARY</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} m={5}>
                    {phoneNumber.map((digit, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && (
                                <Typography variant="h2" component="span">
                                    (
                                </Typography>
                            )}
                            <Typography
                                variant="h2"
                                sx={{
                                    textDecoration: index === activeStep ? 'underline' : 'none',
                                    marginRight: '8px',
                                    color: index === activeStep ? theme.palette.primary.main : 'inherit'
                                }}
                            >
                                {digit}
                            </Typography>
                            {index === 2 && (
                                <Typography variant="h2" component="span">
                                    ) -&nbsp;
                                </Typography>
                            )}
                            {index === 5 && (
                                <Typography variant="h2" component="span">
                                    -&nbsp;
                                </Typography>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
                {activeStep == steps.length ? (
                    <>
                        <Typography>All steps competed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </>
                ) : (
                    <>
                        <BinarySelect
                            setPhoneNumber={setPhoneNumber}
                            digit={phoneNumber[activeStep]}
                            activeStep={activeStep}
                            phoneNumber={phoneNumber}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                <Button size="large" variant="contained" fullWidth disabled={activeStep == 0} onClick={handleBack}>
                    Back
                </Button>
                <Button size="large" variant="contained" fullWidth onClick={handleNextStep}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </DialogActions>
        </>
    );
};

export default PhoneDialog;
