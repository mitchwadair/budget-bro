import React from 'react';
import settings from '../../settings';

import './textinput.scss';

const {prefix} = settings;

export default function TextInput({label, onChange, id}) {
    const updateFormState = (data) => {
        onChange(data, id)
    }
    
    return (
        <div className={`${prefix}-text-input-container`}>
            <div className={`${prefix}-text-input-label`}>{label}</div>
            <input type={"text"} className={`${prefix}-text-input`} onChange={(event => updateFormState(event.target.value))}/>
        </div>
    );
}