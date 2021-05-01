import React, { useCallback } from 'react';
import { Color } from './types';
import { Colors, ColorFields } from './enums';
import './controls.scss';

interface Props {
    mouseRadius: number;
    color1: Color;
    color2: Color;
    handleMouseRadiusChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;
}

function Controls({
    mouseRadius,
    color1,
    color2,
    handleMouseRadiusChanged,
    handleColorChanged,
}: Props) {
    return (
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
            </div>

            <div className='controls__item'>
                <ColorControl
                    colorValue={color1}
                    color={Colors.Color1}
                    handleColorChanged={handleColorChanged}
                />
            </div>
            <div className='controls__item'>
                <ColorControl
                    colorValue={color2}
                    color={Colors.Color2}
                    handleColorChanged={handleColorChanged}
                />
            </div>

            {/* <div className='controls__item'>
                <div className='controls__color-control'>
                    Color 2
                    <ColorFieldControl
                        colorValue={color2}
                        color={Colors.Color2}
                        colorField={ColorFields.red}
                        handleColorChanged={handleColorChanged}
                    />
                    <ColorFieldControl
                        colorValue={color2}
                        color={Colors.Color2}
                        colorField={ColorFields.green}
                        handleColorChanged={handleColorChanged}
                    />
                    <ColorFieldControl
                        colorValue={color2}
                        color={Colors.Color2}
                        colorField={ColorFields.blue}
                        handleColorChanged={handleColorChanged}
                    />
                </div>
            </div> */}
        </div>
    );
}

function ColorControl(props: {
    colorValue: Color;
    color: Colors;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;
}) {
    return (
        <div className='color-control'>
            <span className='color-control__name'>{props.color}</span>
            {Object.values(ColorFields).map((colorField) => (
                <ColorFieldControl
                    colorValue={props.colorValue}
                    color={props.color}
                    colorField={colorField}
                    handleColorChanged={props.handleColorChanged}
                />
            ))}
        </div>
    );
}

function ColorFieldControl(props: {
    colorValue: Color;
    color: Colors;
    colorField: ColorFields;
    handleColorChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        color: Colors,
        field: ColorFields
    ) => void;
}) {
    const fieldValue = props.colorValue[props.colorField];
    return (
        <div className='color-field-control'>
            <label className='color-field-control__label'>{props.colorField}: {fieldValue}</label>
            <input
                type='range'
                min='0'
                max='255'
                value={fieldValue}
                className='color-1-red-slider'
                onChange={(e) =>
                    props.handleColorChanged(e, props.color, props.colorField)
                }
            />
        </div>
    );
}

export default Controls;
