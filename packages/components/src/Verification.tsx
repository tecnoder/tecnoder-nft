import React, { useMemo, useRef, useState } from 'react';

import ReactCodeInput from 'react-code-input';

import { postData } from '@sindric-lib-ui/commons/lib/api/api';

import Countdown from "react-countdown";
import { reSendRegistrationEmailUrl, verifyResetPasswordUrl, verifyUserUrl } from '@sindric-lib-ui/endpoints';
import { useAppDispatch } from '@sindric-lib-ui/commons/lib/redux/store';
import { removeLoader, setLoader } from '@sindric-lib-ui/commons/lib/redux/slices/loader';
import Message from './Message';
import { Button } from './button';

const codeProps: any = {
    inputStyle: {
      fontFamily: 'monospace',
      padding: '0',
      margin:  '4px',
      MozAppearance: 'textfield',
      textTransform: 'uppercase',
      width: '40px',
      borderRadius: '3px',
      fontSize: '2rem',
      height: '40px',
      paddingLeft: '7px',
      backgroundColor: 'white',
    //   color: 'lightskyblue',
      border: '1px solid #bfbfbf'
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      padding: '0',
      margin:  '4px',
      MozAppearance: 'textfield',
      textTransform: 'uppercase',
      width: '40px',
      borderRadius: '3px',
      fontSize: '2rem',
      height: '40px',
      paddingLeft: '7px',
      backgroundColor: 'black',
      color: 'red',
      border: '1px solid red'
    }
  }


export const Verification: React.FC<{[key:string]: any}> = ({wrapperClass, emailId, type = 'normal', name, label, errors, goToPage, parentCallback, ...rest}) => {

    const [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    const [vid, setVid] = useState("");
    const [countDownKey, setCountDownKey] = useState(Math.random());
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [resendCode, setResendCode] = useState(false);

    const dispatch = useAppDispatch();

    async function verifyUser(verificationCode: string) {
        if(verificationCode.length > 0){
            dispatch(setLoader("verifying"));
            let response;
            if(type === 'resetPassword'){
                response = await postData(verifyResetPasswordUrl(verificationCode));
            }
            else{
                response = await postData(verifyUserUrl(verificationCode));
            }
            if(response.status === "SUCCESS"){
                parentCallback("verified");
                setVerifying(false);
                if(type !== 'resetPassword'){
                    setVerified(true);
                }
                setError("");
            }
            else{
                setError(response.errorDesc);
                setSuccess("");
            }
            dispatch(removeLoader("verifying"));
        }
        else{
            //toBeAdded
            setError("Enter Error");
            setSuccess("");
        }
    }

    async function handleVid(e: string){
        setVid(e);
        //convert string to uppercase
        if(e.length === 7){
            const upperVid = e.toUpperCase();
            verifyUser(upperVid);
        }
    }

    const refContainer = useRef(Date.now() + 15 * 60000);

    const resendVerificationEmail = async (event?: any) => {
        event && event.preventDefault();
        const response = await postData(reSendRegistrationEmailUrl(emailId));
        if(response.status === "SUCCESS"){
            refContainer.current = Date.now() + 15 * 60000;
            setTimeout(() => {
                setCountDownKey(Math.random());
                setSuccess("Email has been sent");
                setError("");
            }, 0);
            // setTimeout(() => {
            //     setSuccess("");
            // }, 5000);
            return true;
        }
        else if(response.status === "ERROR"){
            setError(response.errorDesc);
            setSuccess("")
            return false;
        }
    }

    const resendCodeTemplate = (
        <div><a className={`pointer`} onClick={resendVerificationEmail}>Resend Verification Code</a></div>
    );

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          
          return resendCodeTemplate;
        } else {
          // Render a countdown
          return <div className='mb-1 reverseCountdownTimer'><span>{minutes}:{seconds}</span></div>;
        }
      };

    return (
        <>
        {!verified ?
        <>
            {success && <div className="form_description_2 normal-font mt-2 mb-1">
                    <Message type="success" message={success}/>
                </div>
            }

            {error && <div className="form_description_2 normal-font mt-2 mb-1">
                    <Message type="error" message={error}/>
                </div>
            }
            <div className="mt-3 signup-success-text">We have sent an email with 7 digit verification code. <br/> Please enter below</div>
            <ReactCodeInput className={`mt-2 mb-2 ${wrapperClass}`} onChange={(e) => handleVid(e)} name='code-input' type='text' fields={7} {...codeProps}/>
            <Countdown key={countDownKey} date={refContainer.current} renderer={renderer} />
            {resendCodeTemplate}
        </> : 
        <>
            <p className="mt-2">
                Account has been verified{" "}
                <div onClick={goToPage}>
                    <Button type="primary" aria-disabled>SIGN IN</Button>
                </div>
            </p>
        </>
        }
        </>
    )

};

export default Verification;