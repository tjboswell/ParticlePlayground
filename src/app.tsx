import React, { useState, useCallback } from 'react';
import Controls from './controls';
import Canvas from './canvas';
import { Color } from './types';
import { Colors, ColorFields } from './enums';
import './app.css';

function App() {
    const [mouseRadius, setMouseRadius] = useState(80);
    const handleMouseRadiusChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setMouseRadius(parseInt(e.target.value));
    };

    const [color1, setColor1] = useState<Color>({
        r: 23,
        g: 32,
        b: 56,
    });

    const [color2, setColor2] = useState<Color>({
        r: 164,
        g: 221,
        b: 219,
    });

    const handleColorChanged = (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        colorField: ColorFields
    ) => {
        if (color === Colors.Color1) {
            setColor1({
                ...color1,
                [colorField]: parseInt(e.target.value),
            });
        }

        else if (color === Colors.Color2) {
            setColor2({
                ...color2,
                [colorField]: parseInt(e.target.value),
            });
        }
    };

    return (
        <div className='app'>
            <Controls
                mouseRadius={mouseRadius}
                handleMouseRadiusChanged={handleMouseRadiusChanged}
                color1={color1}
                color2={color2}
                handleColorChanged={handleColorChanged}
            />
            <Canvas mouseRadius={mouseRadius} color1={color1} color2={color2} />
        </div>
    );
}

export default App;

const colors = [
    '#172038',
    '#253a5e',
    '#3c5e8b',
    '#4f8fba',
    '#73bed3',
    '#a4dddb',
    '#19332d',
    '#25562e',
    '#468232',
    '#75a743',
    '#a8ca58',
    '#d0da91',
    '#4d2b32',
    '#7a4841',
    '#ad7757',
    '#c09473',
    '#d7b594',
    '#e7d5b3',
    '#341c27',
    '#602c2c',
    '#884b2b',
    '#be772b',
    '#de9e41',
    '#e8c170',
    '#241527',
    '#411d31',
    '#752438',
    '#a53030',
    '#cf573c',
    '#da863e',
    '#1e1d39',
    '#402751',
    '#7a367b',
    '#a23e8c',
    '#c65197',
    '#df84a5',
    '#090a14',
    '#10141f',
    '#151d28',
    '#202e37',
    '#394a50',
    '#577277',
    '#819796',
    '#a8b5b2',
    '#c7cfcc',
    '#ebede9',
];
const blues = [
    '#172038',
    '#253a5e',
    '#3c5e8b',
    '#4f8fba',
    '#73bed3',
    '#a4dddb',
];
