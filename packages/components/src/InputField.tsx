import React from 'react';
import { isErrorExists } from './utility';

export const InputField: React.FC<{[key:string]: any}> = ({wrapperClass, type, name, label, errors, ...rest}) => {

    return (
        <div className={`grid-row row-grid column ${wrapperClass}`}>
            { label && <div className="mb-05">{label}</div>}
            <input type={type} name={name} {...rest} className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : '')}/>
            {isErrorExists(errors) && 
                <div className="error-field-desc">
                    { name in errors && errors[name][0]}
                </div>
            }
        </div>
    )

};

InputField.defaultProps = {
    type: "text"
  }

export default InputField;