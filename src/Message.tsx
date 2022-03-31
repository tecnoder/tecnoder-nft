import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Message: React.FC<{[key:string]: any}> = ({type, message}) => {

    return (
        <div className={`${`mcr_message`} ${type}`}>
            {type==="error" && <span className="mr-05"><FontAwesomeIcon icon="exclamation-triangle" /></span>}<span>{message}</span>
        </div>
    )

};


export default Message;