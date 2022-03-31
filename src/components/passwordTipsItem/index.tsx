import React from 'react';

export const PasswordTipsItem: React.FC<{[key:string]: any}> = ({label, meetsReq}) => {

    // returns string of classes based on props aliased meetsReq
    const setClass = () => {
        const classArr = ["tips-text"]
        if (meetsReq) classArr.push('works-out')
        return classArr.join(' ')
    }

    return (
        <div className="tips-item">
            <li className={setClass()}>{label}</li>
        </div>
    )

};


export default PasswordTipsItem;