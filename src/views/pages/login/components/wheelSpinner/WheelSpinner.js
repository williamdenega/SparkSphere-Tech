import React from 'react';
import './WheelSpinner.css';
import { Button, DialogActions } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { gridSpacing } from 'store/constant';
import BackspaceIcon from '@mui/icons-material/Backspace';
let totalRotation = -6.923076923;
let currentIndex = 0;
export default function RealWheel({ setInput, input, spinning, setSpinning, open }) {
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
    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000',
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000',
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000',
        '#EE4040',
        '#815CD1'
    ];

    //const [name, setName] = useState("circle");
    //const [current, setCurrent] = useState('');
    //let totalRotation = -6.923076923;
    //const [rotating, setRotating] = useState(false);
    // const startRotation = async () => {
    //     const randomCount = Math.floor(Math.random() * (55 - 20 + 1)) + 20;
    //     // setRotating(true);
    //     setSpinning(true);

    //     // Create a promise that resolves after the rotations are done
    //     const rotationsPromise = () =>
    //         new Promise((resolve) => {
    //             const performRotation = async (index) => {
    //                 console.log(randomCount);
    //                 await new Promise((innerResolve) => setTimeout(innerResolve, index * 70));

    //                 const letterIndex = letters.length - (index % letters.length) - 1;
    //                 rotateOnClick();
    //                 setInput((prevInput) => prevInput + letters[letterIndex]);

    //                 // Resolve the promise after the last rotation
    //                 if (randomCount - index === 0) {
    //                     resolve();
    //                 }
    //             };

    //             // Perform rotations asynchronously
    //             for (let i = 0; i <= randomCount; i++) {

    //                 performRotation(i);
    //             }
    //         });

    //     // Wait for the promise to resolve before continuing
    //     await rotationsPromise();

    //     // setRotating(false);
    //     setSpinning(false);
    //     // setName((prevName) => prevName + char);
    //     // console.log(char + 'HEREERE');
    //     // console.log(name + 'current name');
    // };
    // const startRotation = () => {
    //     const randomCount = Math.floor(Math.random() * (55 - 20 + 1)) + 20;
    //     setSpinning(true);
    //     for (let i = 0; i <= randomCount; i++) {
    //         console.log(randomCount);
    //         setTimeout(
    //             (index) => {
    //                 const letterIndex = letters.length - (index % letters.length) - 1;
    //                 rotateOnClick();
    //                 setInput(() => input + letters[letterIndex]);

    //                 if (randomCount - index === 0) {
    //                     setSpinning(false);
    //                 }
    //             },
    //             i * 70,
    //             i
    //         );
    //     }
    // };

    const startRotation = async () => {
        const randomCount = Math.floor(Math.random() * (55 - 20 + 1)) + 20;
        //setRotating(true);
        setSpinning(true);
        // Create a promise that resolves after the rotations are done
        const rotationsPromise = () =>
            new Promise((resolve) => {
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
                                console.log(currentIndex);
                                resolve();
                                setSpinning(false);
                            }
                        },
                        i * 60,
                        i
                    ); // Pass the value of i as an argument to the setTimeout callback
                }
            });

        // Wait for the promise to resolve before logging 'hello'
        await rotationsPromise();
        //setRotating(false);

        //setName((prevName) => prevName + char);
        //console.log(char + 'HEREERE');
        //console.log(name + 'current name');
    };

    function handleBack() {
        //console.log(char);
        //console.log(name);
        //console.log(name.slice(0, -1) + 'DELETED NAME');
        setInput(input.slice(0, -1));
    }

    function rotateOnClick() {
        if (!open) {
            //totalRotation += 180 / 13; // Increase the rotation angle by 90 degrees on each click
            //element.style.transform = `rotate(${-6.923076923}deg)`;
            return;
        }
        var element = document.querySelector('.circle');

        totalRotation += 180 / 13; // Increase the rotation angle by 90 degrees on each click
        element.style.transform = `rotate(${totalRotation}deg)`;
    }

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
                    endIcon={<BackspaceIcon />}
                    onClick={handleBack}
                >
                    BACK
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    disabled={spinning}
                    color="primary"
                    endIcon={<CasinoIcon />}
                    value={50}
                    onClick={startRotation}
                >
                    SPIN
                </Button>
            </DialogActions>
        </>
    );
}
