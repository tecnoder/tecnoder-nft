import { postData } from '@sindric-lib-ui/commons/lib/api/api';
import { validateTotpUrl } from '@sindric-lib-ui/endpoints';
import React, { useState } from 'react';
import { Button } from '../button';
import InputField from '../InputField';
import Message from '../Message';



export const VerifyTotp: React.FC<{[key:string]: any}> = ({onSuccess, onError}) => {

    const default_button_text = "Verify Code";
    const [retry, setRetry] = useState<number>(0);

    const [verifyCode, setVerifyCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    //const [isVerified, setIsVerified] = useState(false);
    const [buttonText, setButtonText] = useState(default_button_text);
    const [error, setError] = useState("");

    const [errors, setErrors] = useState([]);

    const verifyTotp = async (event: any) => {
        event.preventDefault();
        setError("");

        let localError:any = {};
        if(!verifyCode||verifyCode.trim().length===0|| isNaN(Number(verifyCode)) ){
            localError["verifyCode"] = ["Enter valid OTP code"];
        }
        setErrors(localError);
        if(localError.verifyCode){
            return;
        }

        if(4 === retry+1){
            onError('OTP validation failed');
            return;
        }
        setRetry(retry+1);
        setIsVerifying(true);
        setButtonText("Verifying");
        //if(type==="validate"){
        const response  = await postData(validateTotpUrl, {
            "totpCode": verifyCode
        })
        if(response.status === "SUCCESS"){
            onSuccess(verifyCode);
            //if(sendAcknowledge){
            //    setIsVerifiedState(true);
            //}
            //else{
                setIsVerifying(false);
            //    setIsVerified(true);
                setButtonText(default_button_text);
                // setUserData(data);
            //    getUserDetails();
            //}
        }
        else{
            setError(response && response.errorDesc? response.errorDesc : 'OTP validation failed')
            setIsVerifying(false);
            setButtonText(default_button_text);
        }
    }

  return (
    <>
    <div className='mb-1 normal-fs'>Enter Two Factor Authentication code</div>
    {error.length > 0 && <div className="mb-2"><Message type="error" message={error}/></div>}
    <form className={`${`verify_code_form`} w-100 verifyCodeWrapper`} onSubmit={verifyTotp}>
        <div className={`verify_code_field`}>
            <InputField wrapperClass="mb-1" type="text" name="verifyCode" placeholder="Two factor authentication code" value={verifyCode} errors={errors} onChange={(e:any)=>setVerifyCode(e.target.value)}/>
        </div>
        <div className={`verify_code_button`} onClick={(ev) => verifyTotp(ev)}>
            <Button type="Primary"></Button>
        </div>
    </form>
    </>
  );
};

export default VerifyTotp;
