import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export const Message: React.FC<{[key:string]: any}> = ({type, message}) => {

    return (
        <div className={`${`mcr_message`} ${type}`}>
            {type==="error" && <span className="mr-05"><FontAwesomeIcon icon={faExclamationTriangle}/></span>}<span>{message}</span>
        </div>
    )

};


export default Message;