import { PresetNames } from './enums';
import './presets.scss';

function Presets({ handlePresetClicked }) {
    return (
        <div className='presets'>
            <span className='presets__title'>Presets</span>
            {Object.values(PresetNames).map((presetName) => (
                <button
                    className='presets__button'
                    key={presetName}
                    onClick={() => handlePresetClicked(presetName)}
                >
                    {presetName}
                </button>
            ))}
        </div>
    );
}

export default Presets;
