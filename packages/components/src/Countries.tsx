import React from 'react';
import "react-datepicker/dist/react-datepicker.css";

import { CountryDropdown } from 'react-country-region-selector';

export const Countries: React.FC<{[key:string]: any}> = ({value, errors, countryError, onChange, ...rest}) => {

    return (
        <>
            <CountryDropdown
                classes={(errors.includes('country') ? 'error-field' : 'countryField')}
                defaultOptionLabel="Select country"
                value={value}
                onChange={(val) => onChange(val)}
                priorityOptions={["US"]}
                blacklist={['AF', 'BY', 'CF', 'CD', 'CU', 'GW', 'IQ', 'IR', 'KP', 'LY', 'ML', 'MM', 'SO', 'SS', 'SD', 'SY', 'UA', 'VE', 'YE']}
            />
            {countryError.length > 0 && 
                <div className="error-field-desc">
                    {countryError}
                </div>
            }
        </>
    )

};

export default Countries;