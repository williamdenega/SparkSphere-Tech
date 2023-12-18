import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';

const BinarySelect = ({ setPhoneNumber, activeStep, phoneNumber }) => {
    const [checkboxStates, setCheckboxStates] = useState({
        8: false,
        4: false,
        2: false,
        1: false
    });

    // Convert the current digit to binary checkboxes state
    useEffect(() => {
        const digit = phoneNumber[activeStep];
        setCheckboxStates({
            8: (digit & 8) === 8,
            4: (digit & 4) === 4,
            2: (digit & 2) === 2,
            1: (digit & 1) === 1
        });
    }, [activeStep]);

    // Calculate the binary sum
    const calculateTotal = () => {
        return Object.keys(checkboxStates).reduce((total, key) => {
            return total + (checkboxStates[key] ? parseInt(key) : 0);
        }, 0);
    };

    // Update the digit in phoneNumber when checkboxes change
    useEffect(() => {
        const newDigit = calculateTotal();
        const updatedPhoneNumber = [...phoneNumber];
        updatedPhoneNumber[activeStep] = newDigit;
        setPhoneNumber(updatedPhoneNumber);
    }, [checkboxStates]);

    const handleChange = (value) => {
        const newValue = parseInt(value);
        const newTotal = calculateTotal() + (checkboxStates[value] ? -newValue : newValue);

        if (newTotal <= 9) {
            setCheckboxStates((prev) => ({
                ...prev,
                [value]: !prev[value]
            }));
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormControl component="fieldset">
                <FormGroup row>
                    {[8, 4, 2, 1].map((value) => (
                        <FormControlLabel
                            sx={{ margin: '20px' }}
                            key={value}
                            control={
                                <Checkbox
                                    checked={checkboxStates[value]}
                                    onChange={() => handleChange(value.toString())}
                                    icon={<RadioButtonUncheckedRoundedIcon />}
                                    checkedIcon={<RadioButtonCheckedRoundedIcon />}
                                />
                            }
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default BinarySelect;
