import { PresetList } from './types';

export enum PresetNames {
    Fog = 'Fog',
    Bubblegum = 'Bubblegum',
    Slime = 'Slime',
    BubbleBath = 'Bubble Bath',
    PartiallyCloudy = 'Partially Cloudy',
    Explosion = 'Explosion',
    SnowFlurries = 'Snow Flurries',
}

const presetOptions: PresetList = {
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
        maxSize: 35,
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
        maxSize: 100,
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
        maxSize: 100,
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
        maxSize: 50,
        numParticles: 1000,
    },
    [PresetNames.SnowFlurries]: {
        baseColor: {
            r: 225,
            g: 240,
            b: 255,
        },
        highlightColor: {
            r: 217,
            g: 217,
            b: 255,
        },
        minSize: 2,
        maxSize: 5,
        numParticles: 3000,
    },
};

export const defaultPreset = PresetNames.Fog;

export default presetOptions;
