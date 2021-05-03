export type RGBValue = {
    r: number;
    g: number;
    b: number;
};

export type Preset = {
    baseColor: RGBValue;
    highlightColor: RGBValue;
    minSize: number;
    maxSize: number;
    numParticles: number;
};

export type PresetList = {
    [key: string]: Preset;
};

export type SliderEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;
