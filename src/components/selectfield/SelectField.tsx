import React from 'react';
import Select from 'react-select';
import { isErrorExists } from '../../utils/Utils';


export const SelectField: React.FC<{[key:string]: any}> = ({wrapperClass, name, options, label, optionText, optionValue, errors, ...rest}) => {

  return (
    <div className={`grid-row column ${wrapperClass}`}>
      <div className="mb-05">{label}</div>
      <Select
          name={name||"colors"}
          options={options}
          className={(isErrorExists(errors) && (name in errors) ? 'basic-multi-select error-field' : 'basic-multi-select')}
          classNamePrefix="select"
          // getOptionLabel={(option:any)=>option[optionText]}
          // getOptionValue={(option:any)=>option[optionValue]}
          {...rest}
      />
      {/* <div class="select__menu css-26l3qy-menu">
        <div class="select__menu-list css-4ljt47-MenuList">
          <div class="select__option css-yt9ioa-option" id="react-select-2-option-0" tabindex="-1"></div>
          <div class="select__option select__option--is-focused css-1n7v3ny-option" id="react-select-2-option-1" tabindex="-1"></div>
        </div>
      </div> */}
      {isErrorExists(errors) && 
        <div className="error-field-desc">
            { name in errors && errors[name][0]}
        </div>
      }
    </div>
  );
};

export default SelectField;
