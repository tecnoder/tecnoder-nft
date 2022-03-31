import React from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { isErrorExists } from '../../utils/Utils';


export const FileInputField: React.FC<{[key:string]: any}> = ({wrapperClass, id, name, type, label, errors, value, onChange, fileType, ...rest}) => {

    return (
        <div className={`${wrapperClass}`}>
        <div className={`grid-row column ${`custom_input`} ${isErrorExists(errors) && (name in errors) ? 'error-field' : ''}`}>
            {
                value
                    ? <>
                        {
                            fileType === 'VIDEO' ? (
                                <video title={label} width="100%" height="100%"
                                    poster={URL.createObjectURL(value)} controls
                                    controlsList="nodownload">
                                    <source src={URL.createObjectURL(value)}
                                        type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>)
                                :
                                (fileType === 'AUDIO' ? (
                                    <audio title={label} controls
                                        controlsList="nodownload">
                                        <source src={URL.createObjectURL(value)}
                                            type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>)
                                    :
                                    ((typeof value === 'string') ? 
                                    <img alt={label} src={value}/> : 
                                    <img alt={label} src={URL.createObjectURL(value)} />
                                    )
                                )
                        }

                        <button
                            type="button"
                            className={`btn ${`btn_close`}`}
                            onClick={() => {
                                onChange(null)
                            }}
                        >
                            <IoCloseCircleSharp />
                        </button>
                    </>
                    : <>
                        <input
                            id={name||id}
                            type="file"
                            name={name}
                            className={`file_input`}
                            value={value}
                            {...rest}
                            onChange={(e)=>{
                                    const {files } = e.target;
                                    onChange(files && files[0])
                                }
                            }
                        />
                        <label htmlFor={name} className={`grid-row column ${label}`}>
                            <span className={`text_center`}>
                                <span className="d-block mr-1"><BsFillPlusCircleFill /></span>
                                Select {label.toLowerCase()}
                            </span>
                        </label>
                    </>
            }
        </div>
        {isErrorExists(errors) && 
            <div className="error-field-desc">
                { name in errors && errors[name][0]}
            </div>
        }
        </div>
    )

};

FileInputField.defaultProps = {
    name: "file"
}

export default FileInputField;