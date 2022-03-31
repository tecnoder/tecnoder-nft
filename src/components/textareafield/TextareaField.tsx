import React from 'react';
import { isErrorExists } from '../../utils/Utils';

export const TextareaField: React.FC<{[key:string]: any}> = ({wrapperClass, name, label, errors, defaultValue, ...rest}) => {

    return (
        <div className={`grid-row column ${wrapperClass}`}>
            { label && <div className="mb-05">{label}</div>}
            <textarea name={name} rows={5} {...rest} className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && (name in errors) ? 'error-field' : '')}>
            </textarea>
            {isErrorExists(errors) && 
                <div className="error-field-desc">
                    { name in errors && errors[name][0]}
                </div>
            }
        </div>
    )

};

TextareaField.defaultProps = {
    defaultValue: ""
  }

export default TextareaField;