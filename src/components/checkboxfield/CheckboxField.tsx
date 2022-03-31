import React from 'react';

export const CheckboxField: React.FC<{[key:string]: any}> = ({id, type, name, ...rest}) => {

    return (
        <div className={`round`}>
            <input id={id} type="checkbox" name={name} {...rest}/>
            <label htmlFor={id}></label>
        </div>
    )

};


export default CheckboxField;