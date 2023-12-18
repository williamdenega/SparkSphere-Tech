import React, { useEffect, useState } from 'react';
import './WheelSpinner.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { gridSpacing } from 'store/constant';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PropTypes from 'prop-types';
let totalRotation = -6.923076923;
let currentIndex = 0;
export default function RealWheel({ setInput, input, spinning, setSpinning, open, setSpins, spins, handleAnimate }) {
    const letters = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ];
    // const segColors1 = [
    //     '#EE4040',
    //     '#F0CF50',
    //     '#815CD1',
    //     '#3DA5E0',
    //     '#34A24F',
    //     '#F9AA1F',
    //     '#EC3F3F',
    //     '#FF9000',
    //     '#EE4040',
    //     '#F0CF50',
    //     '#815CD1',
    //     '#3DA5E0',
    //     '#34A24F',
    //     '#F9AA1F',
    //     '#EC3F3F',
    //     '#FF9000',
    //     '#EE4040',
    //     '#F0CF50',
    //     '#815CD1',
    //     '#3DA5E0',
    //     '#34A24F',
    //     '#F9AA1F',
    //     '#EC3F3F',
    //     '#FF9000',
    //     '#EE4040',
    //     '#815CD1'
    // ];
    // primary[200]
    //primary[light]

    //#eeedfd
    //#b9b3f7
    // const segColors = [
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8',
    //     '#7267ef',
    //     '#554ae8'
    // ];

    const segColors = [
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6',
        '#9fa8da',
        '#e8eaf6'
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        const element = document.querySelector('.circle');
        element.style.transition = '';
        element.style.transform = `rotate(${totalRotation}deg)`;
    }, []);
    useEffect(() => {
        if (spins == 0 && spinning == false) {
            // Run your code when spins is 0
            //console.log('Spins is 0!');
            // Open the dialog
            setTimeout(() => {
                setIsDialogOpen(true);
            }, 200);
        }
    }, [spins, spinning]);
    console.log();
    const startRotation = () => {
        const randomCount = Math.floor(Math.random() * (55 - 20 + 1)) + 20;
        setSpinning(true);
        console.log('THERE ');
        //console.log('TEST HERER');
        // setClicked(false);
        setTimeout(() => {
            setSpins((prevSpins) => prevSpins - 1);
        }, 1000);

        //console.log();
        for (let i = 0; i <= randomCount; i++) {
            //console.log(randomCount);
            setTimeout(
                (index) => {
                    // console.log(randomCount - index);
                    //let number = index + currentIndex;

                    //console.log(currentIndex);

                    const letterIndex = letters.length - ((index + (letters.length - currentIndex)) % letters.length) - 1;
                    //                  26      -     15    -             15     //

                    //console.log(letterIndex )
                    //const letter = letters[letterIndex];
                    //setChar(letter);
                    rotateOnClick();
                    setInput(() => input + letters[letterIndex]);
                    // setName(letter);
                    //console.log(letter);
                    // console.log(letter);
                    //console.log(letter + ' letter 1');
                    //console.log(char + ' letter 2');
                    // Resolve the promise after the last rotation
                    if (randomCount - index === 0) {
                        currentIndex = letterIndex;
                        //console.log(currentIndex);
                        // resolve();
                        setSpinning(false);
                    }
                },
                i * 60,
                i
            ); // Pass the value of i as an argument to the setTimeout callback
        }
    };

    const handleClick = () => {
        if (spins === 0) {
            // Show the dialog if there are no spins left
            setIsDialogOpen(true);
            return;
        }
        //console.log('clicked once');
        startRotation();
        handleAnimate();
        console.log('HERE ');
    };

    function handleBack() {
        //console.log(char);
        //console.log(name);
        //console.log(name.slice(0, -1) + 'DELETED NAME');
        setInput(input.slice(0, -1));
    }

    function rotateOnClick() {
        if (!open) {
            return;
        }

        const element = document.querySelector('.circle');

        if (element) {
            totalRotation += 180 / 13; // Increase the rotation angle by 90 degrees on each click
            element.style.transform = `rotate(${totalRotation}deg)`;
            element.style.transition = 'transform .4s ease';
        } else {
            console.error('Element with class "circle" not found.');
            totalRotation += 180 / 13;
            return;
        }
    }

    const handleRickRoll = () => {
        // Redirect to the Rick Roll video
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        // Close the dialog
        setIsDialogOpen(false);
    };
    const rotationDegree = 360 / letters.length;
    // each letter is about 13.846

    return (
        <>
            <div className="circleContainer">
                <div className="overlappingDiv"></div>
                <div className="colorChecker"></div>
                <div className="circleDiv">
                    <ul className="circle">
                        {letters.map((letter, index) => (
                            <li
                                key={index}
                                style={{
                                    backgroundColor: segColors[index],
                                    transform: `rotate(${rotationDegree * index}deg) skewY(-76deg)`
                                }}
                            >
                                <div className="text" style={{ transform: `skewY(76deg)` }}>
                                    {letter}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    disabled={spinning || input.length == 0}
                    startIcon={<BackspaceIcon />}
                    onClick={handleBack}
                >
                    BACK
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    disabled={spinning}
                    color={spins === 0 ? 'primary' : 'primary'}
                    endIcon={<CasinoIcon />}
                    value={50}
                    onClick={handleClick}
                    style={{
                        opacity: spins === 0 && spinning == false ? 0.3 : 1 // Adjust opacity based on spins
                    }}
                >
                    SPIN
                </Button>
            </DialogActions>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle style={{ textAlign: 'center' }}>
                    <Typography variant="h2">No Spins Left!</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText marginBottom={2} style={{ textAlign: 'center' }}>
                        <Typography variant="h4">You have used all your spins.</Typography>
                    </DialogContentText> */}
                    <DialogContentText style={{ textAlign: 'center' }}>
                        <Typography variant="h4">Get unlimited spins for only $1.99!</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-evenly', alignItems: 'center', spacing: { gridSpacing } }}>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRickRoll} color="primary">
                        $1.99
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

RealWheel.propTypes = {
    setInput: PropTypes.func.isRequired,
    input: PropTypes.string.isRequired,
    spinning: PropTypes.bool.isRequired,
    setSpinning: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setSpins: PropTypes.func.isRequired,
    spins: PropTypes.number.isRequired,
    handleAnimate: PropTypes.func.isRequired
};
