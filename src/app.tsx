import React, { useState, useCallback, useMemo } from 'react';
import Controls from './controls';
import Canvas from './canvas';
import Presets from './presets';
import { RGBValue,PresetList } from './types';
import { Colors, ColorFields, Shape, PresetNames } from './enums';
import './app.css';

const presets: PresetList = {
    [PresetNames.Fog]: {
        baseColor: {
            r: 23,
            g: 32,
            b: 56,
        },
        highlightColor: {
            r: 164,
            g: 221,
            b: 219,
        },
        minSize: 0,
        maxSize:35,
        numParticles: 1000,
    },
     [PresetNames.Bubblegum]: {
        baseColor: {
            r: 255,
            g: 255,
            b: 255,
        },
        highlightColor: {
            r: 255,
            g: 202,
            b: 223,
        },
        minSize: 0,
        maxSize: 60,
        numParticles: 500,
    },
    [PresetNames.BubbleBath]: {
       baseColor: {
           r: 176,
           g: 222,
           b: 255,
       },
       highlightColor: {
           r: 248,
           g: 248,
           b: 255,
       },
       minSize: 0,
       maxSize: 40,
       numParticles: 1000,
   },
   [PresetNames.Slime]: {
       baseColor: {
           r: 71,
           g: 255,
           b: 58,
       },
       highlightColor: {
           r: 21,
           g: 57,
           b: 35,
       },
       minSize: 0,
       maxSize:100,
       numParticles: 3000,
   },
   [PresetNames.PartiallyCloudy]: {
       baseColor: {
           r: 255,
           g: 255,
           b: 255,
       },
       highlightColor: {
           r: 255,
           g: 222,
           b: 79,
       },
       minSize: 50,
       maxSize:100,
       numParticles: 500,
   },
   [PresetNames.Explosion]: {
       baseColor: {
           r: 255,
           g: 0,
           b: 87,
       },
       highlightColor: {
           r: 255,
           g: 255,
           b: 0,
       },
       minSize: 0,
       maxSize:50,
       numParticles: 1000,
   },
};

function App() {
    const [mouseRadius, setMouseRadius] = useState(80);
    const handleMouseRadiusChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMouseRadius(parseInt(e.target.value));
    };

    const [showMouseRadius, setShowMouseRadius] = useState(false);
    const handleShowMouseRadiusChecked = () => {
        setShowMouseRadius(!showMouseRadius);
    };

    const [baseColor, setColor1] = useState<RGBValue>(presets[PresetNames.Fog].baseColor);

    const [highlightColor, setColor2] = useState<RGBValue>(presets[PresetNames.Fog].highlightColor);

    const handleColorChanged = (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        colorField: ColorFields
    ) => {
        if (color === Colors.BaseColor) {
            setColor1({
                ...baseColor,
                [colorField]: parseInt(e.target.value),
            });
        } else if (color === Colors.HighlightColor) {
            setColor2({
                ...highlightColor,
                [colorField]: parseInt(e.target.value),
            });
        }
    };

    const [minSize, setMinSize] = useState(presets[PresetNames.Fog].minSize);
    const [maxSize, setMaxSize] = useState(presets[PresetNames.Fog].maxSize);
    const handleMinSizeChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setMinSize(parseInt(e.target.value));
    };
    const handleMaxSizeChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setMaxSize(parseInt(e.target.value));
    };

    const [numParticles, setNumParticles] = useState(presets[PresetNames.Fog].numParticles);
    const handleNumParticlesChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNumParticles(parseInt(e.target.value));
    };

    const handlePresetClicked = (presetName: string) => {
        const preset = presets[presetName];
        setColor1(preset.baseColor);
        setColor2(preset.highlightColor);
        setMinSize(preset.minSize);
        setMaxSize(preset.maxSize);
        setNumParticles(preset.numParticles);
    };

    return (
        <div className='app'>
            <Controls
                mouseRadius={mouseRadius}
                handleMouseRadiusChanged={handleMouseRadiusChanged}
                showMouseRadius={showMouseRadius}
                handleShowMouseRadiusChecked={handleShowMouseRadiusChecked}
                baseColor={baseColor}
                highlightColor={highlightColor}
                handleColorChanged={handleColorChanged}
                minSize={minSize}
                maxSize={maxSize}
                handleMinSizeChanged={handleMinSizeChanged}
                handleMaxSizeChanged={handleMaxSizeChanged}
                numParticles={numParticles}
                handleNumParticlesChanged={handleNumParticlesChanged}
            />
            <Canvas
                mouseRadius={mouseRadius}
                showMouseRadius={showMouseRadius}
                baseColor={baseColor}
                highlightColor={highlightColor}
                minSize={minSize}
                maxSize={maxSize}
                numParticles={numParticles}
            />
            <Presets handlePresetClicked={handlePresetClicked} />
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
