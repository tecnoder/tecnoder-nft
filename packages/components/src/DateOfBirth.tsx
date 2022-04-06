import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addDays } from 'date-fns';

export const DateOfBirth: React.FC<{[key:string]: any}> = ({value, error, onChange, ...rest}) => {

    return (
        <>
        <DatePicker 
            className={(error.length > 0 ? 'error-field' : 'red-border')}
            placeholderText="Enter Date of Birth"
            closeOnScroll={true}
            selected={value}
            maxDate={addDays(new Date(), 0)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            onChange={(date) => onChange(date)} 
        />
        {<div className="error-field-desc">{error}</div>}
</>
    )

};

export default DateOfBirth;