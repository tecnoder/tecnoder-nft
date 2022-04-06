import React from 'react';
import "react-datepicker/dist/react-datepicker.css";

import { RegionDropdown } from 'react-country-region-selector';

export const States: React.FC<{[key:string]: any}> = ({value, errors, country, stateError, onChange, ...rest}) => {

    return (
        <>
            <div className="grid-row column">
                <RegionDropdown
                    classes="stateField"
                    defaultOptionLabel="Select state"
                    country={country}
                    value={value}
                    onChange={(val) => onChange(val)} 
                />
            </div>
            {
                stateError.length > 0 && 
                <div className="error-field-desc">
                    {stateError}
                </div>
            }
        </>
    )

};

export default States;