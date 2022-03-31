import React from 'react';
import CreatableSelect from 'react-select/creatable';

export const CreatableSelectField: React.FC<{[key:string]: any}> = ({wrapperClass, options, onChange, isMulti, ...rest}) => {

  const customStyles = {
    control: (styles:any) => ({ ...styles, backgroundColor: 'transparent', color: 'inherit', padding: 0, borderWidth: 0, minHeight: 10, boxShadow: 'none' }),
    placeholder: (styles:any) => ({ ...styles, color: 'inherit'}),
    menu: (provided:any, state:any) => ({
      ...provided,
      width: state.selectProps.width,
      backgroundColor: '#344258',
      padding: 5,
    }),
    option: (provided:any, state:any) => {return ({
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

  const handleChange = (newValue: any) => {
    if(onChange){
    	onChange(newValue);
    }
  };
  
  const handleInputChange = (_inputValue: any) => {
  };  

  return (
    <CreatableSelect
      // aria-describedby={'validationTooltip'+name+'Prepend'}
      styles={customStyles}
      isClearable={true}
      onChange={(nv:any, _act:any)=>handleChange(nv)}
      onInputChange={(iv:any, _act:any)=>handleInputChange(iv)}
      options={options}
      isMulti={isMulti}
      className="basic-multi-select"
      classNamePrefix="select"
      {...rest}
    />
  );
};

export default CreatableSelectField;
