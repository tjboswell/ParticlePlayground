import React, { useState } from 'react';
import Controls from './controls';
import Canvas from './canvas';
import Presets from './presets';
import { RGBValue } from './types';
import { Colors, ColorFields } from './enums';
import presetOptions, { defaultPreset } from './preset-options';
import './app.scss';

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

    const [baseColor, setBaseColor] = useState<RGBValue>(
        presetOptions[defaultPreset].baseColor
    );

    const [highlightColor, setHighlightColor] = useState<RGBValue>(
        presetOptions[defaultPreset].highlightColor
    );

    const handleColorChanged = (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        colorField: ColorFields
    ) => {
        console.log(color === Colors.BaseColor);
        if (color === Colors.BaseColor) {
            setBaseColor({
                ...baseColor,
                [colorField]: parseInt(e.target.value),
            });
        } else if (color === Colors.HighlightColor) {
            setHighlightColor({
                ...highlightColor,
                [colorField]: parseInt(e.target.value),
            });
        }
    };

    const [minSize, setMinSize] = useState(
        presetOptions[defaultPreset].minSize
    );
    const [maxSize, setMaxSize] = useState(
        presetOptions[defaultPreset].maxSize
    );
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

    const [numParticles, setNumParticles] = useState(
        presetOptions[defaultPreset].numParticles
    );
    const handleNumParticlesChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNumParticles(parseInt(e.target.value));
    };

    const handlePresetClicked = (presetName: string) => {
        const preset = presetOptions[presetName];
        setBaseColor(preset.baseColor);
        setHighlightColor(preset.highlightColor);
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
