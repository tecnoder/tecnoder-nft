import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isErrorExists } from "../../utils/Utils";


export const DateTimeField: React.FC<{[key:string]: any}> = ({wrapperClass, onChange, name, errors, label, ...rest}) => {

    const handleChange = (date:any) =>{
        if(date){
          onChange(date);
        }
      };

    return (
        <div className={`grid-row column ${wrapperClass}`}>
            <div className="mb-05">{label}</div>
            <DatePicker
                className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : '')}
                onChange={date => handleChange(date)}
                {...rest}
            />
            {isErrorExists(errors) && 
                <div className="error-field-desc">
                    { name in errors && errors[name][0]}
                </div>
            }
        </div>
    )

};

export default DateTimeField;