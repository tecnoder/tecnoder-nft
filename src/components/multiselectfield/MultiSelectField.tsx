import React from 'react';
import Select from 'react-select';
import { isErrorExists } from '../../utils/Utils';


export const MultiSelectField: React.FC<{[key:string]: any}> = ({wrapperClass, name, options, label, errors, optionText, optionValue, ...rest}) => {

  const customStyles = {
    control: (styles:any) => ({ ...styles, backgroundColor: 'transparent', color: 'inherit', padding: 0, borderWidth: 0, minHeight: 10, boxShadow: 'none' }),
    placeholder: (styles:any) => ({ ...styles, color: 'inherit'}),
    menu: (provided:any, state:any) => ({
      ...provided,
      width: state.selectProps.width,
      backgroundColor: '#344258',
      padding: 5,
    }),
    option: (provided:any, state:any) => { return ({
      ...provided,
      color: state.isFocused? 'white' : 'inherit',
      backgroundColor: state.isFocused? 'dimgrey' : 'transparent',
      // width: 670,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
    })},
    /*menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      backgroundColor: '#101010',
      padding: 20,
    }),    
    control: () => ({
      // none of react-select's styles are passed to <Control />
      //width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }*/
  }

  return (
    <div className={`grid-row column ${wrapperClass}`}>
      <div className="mb-05">{label}</div>
      <Select
          isMulti
          name={name||"colors"}
          styles={customStyles}
          options={options}
          className={(isErrorExists(errors) && (name in errors) ? 'multi-select error-field' : 'multi-select')}          
          classNamePrefix="select"
          getOptionLabel={(option:any)=>option[optionText]}
          getOptionValue={(option:any)=>option[optionValue]}
          {...rest}
      />
      {isErrorExists(errors) && 
        <div className="error-field-desc">
            { name in errors && errors[name][0]}
        </div>
      }      
    </div>
  );
};

export default MultiSelectField;
