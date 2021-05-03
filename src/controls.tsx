import React from 'react';
import { RGBValue, SliderEvent } from './types';
import { Colors, ColorFields } from './enums';
import './controls.scss';

type ControlsProps = {
    mouseRadius: number;
    handleMouseRadiusChanged: SliderEvent;

    showMouseRadius: boolean;
    handleShowMouseRadiusChecked: SliderEvent;

    baseColor: RGBValue;
    highlightColor: RGBValue;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;

    minSize: number;
    maxSize: number;
    handleMinSizeChanged: SliderEvent;
    handleMaxSizeChanged: SliderEvent;

    numParticles: number;
    handleNumParticlesChanged: SliderEvent;
};

function Controls({
    mouseRadius,
    baseColor,
    highlightColor,
    handleMouseRadiusChanged,
    showMouseRadius,
    handleShowMouseRadiusChecked,
    handleColorChanged,
    minSize,
    maxSize,
    handleMinSizeChanged,
    handleMaxSizeChanged,
    numParticles,
    handleNumParticlesChanged,
}: ControlsProps) {
    return (
        <div className='controls__wrapper'>
            <div className='controls'>
                <div className='controls__item'>
                    <label>Mouse Radius ({mouseRadius}px)</label>
                    <input
                        type='range'
                        min='20'
                        max='200'
                        value={mouseRadius}
                        className='mouse-radius-slider'
                        onChange={handleMouseRadiusChanged}
                    />
                    <label>Show Mouse Radius</label>
                    <input
                        type='checkbox'
                        checked={showMouseRadius}
                        onChange={handleShowMouseRadiusChecked}
                    />
                </div>

                <div className='controls__item'>
                    <ColorControl
                        rgbValue={baseColor}
                        color={Colors.BaseColor}
                        handleColorChanged={handleColorChanged}
                    />
                </div>
                <div className='controls__item'>
                    <ColorControl
                        rgbValue={highlightColor}
                        color={Colors.HighlightColor}
                        handleColorChanged={handleColorChanged}
                    />
                </div>

                <div className='controls__item'>
                    <label>Min Size ({minSize}px)</label>
                    <input
                        type='range'
                        min='0'
                        max={maxSize - 1}
                        value={minSize}
                        className='min-size-slider'
                        onChange={handleMinSizeChanged}
                    />
                </div>

                <div className='controls__item'>
                    <label>Max Size ({maxSize}px)</label>
                    <input
                        type='range'
                        min={minSize + 1}
                        max={100}
                        value={maxSize}
                        className='max-size-slider'
                        onChange={handleMaxSizeChanged}
                    />
                </div>

                <div className='controls__item'>
                    <label>Number of Particles ({numParticles})</label>
                    <input
                        type='range'
                        min={1}
                        max={10000}
                        value={numParticles}
                        className='num-particles-slider'
                        onChange={handleNumParticlesChanged}
                    />
                </div>
            </div>
        </div>
    );
}

type ColorControlProps = {
    rgbValue: RGBValue;
    color: Colors;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;
};

function ColorControl({
    rgbValue,
    color,
    handleColorChanged,
}: ColorControlProps) {
    return (
        <div className='color-control'>
            <div className='color-control__header'>
                <span className='color-control__name'>{color}</span>{' '}
                <div
                    className='color-control__sample'
                    style={{
                        backgroundColor: `rgb(${rgbValue.r},${rgbValue.g},${rgbValue.b})`,
                    }}
                />
            </div>
            {Object.values(ColorFields).map((colorField) => (
                <ColorFieldControl
                    colorValue={rgbValue}
                    color={color}
                    colorField={colorField}
                    handleColorChanged={handleColorChanged}
                    key={`${color}--${colorField}`}
                />
            ))}
        </div>
    );
}

type ColorFieldControlProps = {
    colorValue: RGBValue;
    color: Colors;
    colorField: ColorFields;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;
};

function ColorFieldControl({
    colorValue,
    color,
    colorField,
    handleColorChanged,
}: ColorFieldControlProps) {
    const fieldValue = colorValue[colorField];
    return (
        <div className='color-field-control'>
            <label className='color-field-control__label'>
                {colorField.toUpperCase()}: {fieldValue}
            </label>
            <input
                type='range'
                min='0'
                max='255'
                value={fieldValue}
                className='color-field-control__slider'
                onChange={(e) => handleColorChanged(e, color, colorField)}
            />
        </div>
    );
}

export default Controls;
