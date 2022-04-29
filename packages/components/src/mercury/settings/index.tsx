import { isErrorExists, useAppDispatch, useAppSelector } from '@sindric-lib-ui/commons';
import { postData } from '@sindric-lib-ui/commons/lib/api/api';
import { UserService } from '@sindric-lib-ui/commons/lib/api/service';
import { getUserSession } from '@sindric-lib-ui/commons/lib/redux/slices/user';
import { changeTwoFactorAuthenticationUrl, logoutUrl } from '@sindric-lib-ui/endpoints';
import { validate } from '@sindric-lib-ui/validator';
import { SecurityFormData } from '@sindric-lib-ui/validator/lib/classes';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import Switch from "react-switch";
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../button';
import InputField from '../../InputField';
import Message from '../../Message';
import PasswordTipsItem from '../../passwordTipsItem';
import { ScanQR } from '../../ScanQR';
import VerifyTotp from '../../verify-totp';


export const SecuritySettings: React.FC<{[key:string]: any}> = ({showQRScanSectionProps, isTwoFactorProps}) => {

    const history = useHistory();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {user} = useAppSelector((state) => state)

    const [isDisabled, setIsDisabled] = useState(true);

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("defaultPassword");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [containsUL, setContainsUL] = useState(false) // uppercase letter
    const [containsLL, setContainsLL] = useState(false) // lowercase letter
    const [containsN, setContainsN] = useState(false) // number
    const [containsSC, setContainsSC] = useState(false) // special character
    const [contains8C, setContains8C] = useState(false) // min 8 characters
    const [passwordMatch, setPasswordMatch] = useState(false) // passwords match

    const [allValid, setAllValid] = useState(false)

    const [isTwoFactor, setIsTwoFactor] = useState(isTwoFactorProps);
    const [newTwoFactor, setNewTwoFactor] = useState(isTwoFactorProps);
    const [showVerifyForm, setShowVerifyForm] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [showVerifyFormForPassword, setShowVerifyFormForPassword] = useState(false);
    const [showQRScanSection, setShowQRScanSection] = useState(showQRScanSectionProps);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsTwoFactor(isTwoFactorProps);
    }, []);

    const mustContainData = [
        ["An uppercase letter (A-Z)", containsUL],
        ["A lowercase letter (a-z)", containsLL],
        ["A number (0-9)", containsN],
        ["A special character (!@#$)", containsSC],
        ["At least 8 characters", contains8C],
    ]

    const handleOldPassword = async (value: string) =>{
        setOldPassword(value);
        // checkPasswordWithOldPassword();
    }

    const checkPasswordWithOldPassword = async () =>{
        if(password === oldPassword && (password.length > 0 && oldPassword.length > 0)){
            let localError = [];
            localError['password'] = [];
            localError['password'].push("New password cannot be same as old password");
            setErrors(localError);
        }
    }

    const handlePassword = async (value: string) => {
        setPassword(value);
        // checkPasswordWithOldPassword();

        // has uppercase letter
        const hasUL:boolean = value.toLowerCase() !== value;

        // has lowercase letter
        const hasLL: boolean = value.toUpperCase() !== value;

        // has number
        const hasN: boolean = /\d/.test(value);

        // has special character
        const hasSC: boolean = /[!#$@]/g.test(value);

        // has 8 characters
        const has8C: boolean = value.length >= 8;

        // passwords match
        // if (value !== "" && value === passwordTwo) setPasswordMatch(true)
        // else setPasswordMatch(false)

        setContainsUL(hasUL)
        setContainsLL(hasLL)
        setContainsN(hasN)
        setContainsSC(hasSC)
        setContains8C(has8C)

        // all validations passed
        if (hasUL && hasLL && hasN && hasSC && has8C) setAllValid(true)
        else setAllValid(false)
    }

    const changePassword = async () => {
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
        setIsDisabled(false);
    }

    const handleConfirmPassword = async (value: string) => {
        setConfirmPassword(value);
        if(password.length > 0){
            if(!(value.length>0 && value === password)){
                let localError = [];
                localError['confirmPassword'] = [];
                localError['confirmPassword'].push("Password does not match");
                setErrors(localError);
            }
            else{
                setErrors([]);
            }
        }
    }


    const handleChange = async () => {
        //setIsTwoFactor(!isTwoFactor);
        setNewTwoFactor(!isTwoFactor);
        if(!isTwoFactor){
            setShowVerifyForm(false);
            setShowQRScanSection(true);
        }
        else{
            setShowVerifyForm(true);
            setShowQRScanSection(false);
        }
    }

    const handleResetPasswordSubmit = async (evt: any) => {
        evt.preventDefault();

        let securityFormData = new SecurityFormData(password, confirmPassword);

        let errorFromValidator = validate(securityFormData);
        setErrors(errorFromValidator);
        if(isErrorExists(errorFromValidator) || !allValid || password!=confirmPassword || errors.length > 0 || !oldPassword){
            if(!allValid && password.length > 0){
                console.log("in if");
                // errorFromValidator['oldPassword'] = ["Old password is required"];
                errorFromValidator['password'] = [];
                errorFromValidator['password'].push("Password is invalid")
                console.log(errorFromValidator);
                setErrors(errorFromValidator);
            }
            if(password!==confirmPassword && confirmPassword.length > 0){
                let localError = [];
                localError['confirmPassword'] = [];
                localError['confirmPassword'].push("Password does not match");
                setErrors(localError);
            }
            if(!oldPassword){
                errorFromValidator['oldPassword'] = ["Old password is required"];
                setErrors(errorFromValidator);
            }
        }
        else{
            if(user.isTwoFactor === "Y"){
                setShowVerifyFormForPassword(true);
            }
            else{
                resetPassword();
            }
        }
    }

    useEffect(() => {
        if(isVerified){
            resetPassword();
        }
    }, [isVerified]);

    const resetPassword = async () => {
        /*const response = await postData(resetPasswordUrl, {
            "emailId": user.emailId,
            "oldPswd": oldPassword,
            "pswd": password,
            "rePswd": confirmPassword,
        })*/
        let data = {
            "emailId": user.emailId,
            "oldPswd": oldPassword,
            "pswd": password,
            "rePswd": confirmPassword,
        };

        let formData = new FormData();
        formData.append("user", JSON.stringify(data));

        let headers: any = {
          'Content-Type': 'multipart/form-data'
        }

        const response = await UserService.updateUserDetails(formData, headers);

        if(response.status === "SUCCESS"){
            setError("");
            setSuccess("Password changed successfully");

            // history.push('/req/status', {
            //     data: {
            //     message1: `Password has been changed successfully`,
            //     btnText1: "Login",
            //     btnUrl1: "/login"
            //     }
            // })
            //headers = {};
            //headers['OWASP_CSRFTOKEN'] = response.data.jwtId;
            const logoutResponse = await postData(logoutUrl, null)
            if(logoutResponse){
                dispatch(getUserSession()).then(()=>{
                    history.push('/req/status', {
                        data: {
                        message1: `Password has been changed successfully`,
                        btnText1: "Login",
                        btnUrl1: "/login"
                        }
                    })
                });  
            }
        }
        else{
            setError(response.errorDesc);
            setSuccess("");
        }
    }

    const setupTwoFactor = (verifyCode)=>{
        postData(changeTwoFactorAuthenticationUrl, {
            "isTwoFactor": newTwoFactor===true? "Y" : "N",
            "totpCode": verifyCode
        })
        .then(response=>{
            if(response && response.status === "SUCCESS"){
                dispatch(getUserSession()).then(()=>{
                    history.push('/req/status', {
                        data: {
                            message1: `Two Factor authentication ${newTwoFactor===true? 'enabled' : 'disabled'} successfully`,
                            btnText1: "Login",
                            btnUrl1: "/login"
                        }
                    });
                },err=>{
                    setError(`Failed to ${newTwoFactor===true? 'enabled' : 'disabled'} Two factor authentication`);
                });
            }
            else{
                setError(`Failed to ${newTwoFactor===true? 'enabled' : 'disabled'} Two factor authentication`);
            }
        });
    }

    const getVerifyForm = async () => {
        setShowVerifyForm(true);
        setShowQRScanSection(false);
    }

    const qrSection = (
        <>
            <ScanQR event={getVerifyForm} gaSecret={user.gaSecret} />
        </>
    );

  return (
    <>
            <h4 className="mb-2">Security Settings</h4>
            {success.length > 0 && <Message type="success" message={success}/>}
            {error.length > 0 && <Message type="error" message={error}/>}
            <div className={`profile_layout_container mt-2`}>
                { showVerifyFormForPassword ?
                    <div className="mt-2">
                        <VerifyTotp onSuccess={(totp:string)=>{
                            setIsVerified(true)
                        }}/>
                    </div>
                :
                <form onSubmit={handleResetPasswordSubmit}>
                {!isDisabled && <InputField disabled={isDisabled} wrapperClass="mb-2" type="password" name="oldPassword" label="Old Password" placeholder="Old Password" value={oldPassword} errors={errors} onChange={(e:any)=>handleOldPassword(e.target.value)}/>}                
                <div className='password_field' data-tip data-for="passwordTips">
                <InputField disabled={isDisabled} wrapperClass="mb-2" type="password" name="password" label="Password" placeholder="Password" value={password} errors={errors} onChange={(e:any)=>handlePassword(e.target.value)}/>
                {!isDisabled && <ReactTooltip id="passwordTips" effect="solid" place="right">
                    <div className={`password_tip`}>
                        <div>Password Tips:</div>
                        <div className="tips-container cfb">
                        {mustContainData.map(data=> <PasswordTipsItem label={data[0]} meetsReq={data[1]}/>)}
                        </div>
                    </div>
                </ReactTooltip> 
                }
                </div>
                {!isDisabled ? 
                    <>
                    <InputField wrapperClass="mb-2" type="password" name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" value={confirmPassword} errors={errors} onChange={(e:any)=>handleConfirmPassword(e.target.value)}/>
                    <div className={`submit_button submit-button mt-3`}>
                        <Button type="primary">Change Password</Button>
                    </div>
                    </> : 
                    <div className="mt-05 underline cursor-pointer" onClick={changePassword}>Change Password</div>
                }
                </form>
                }
            </div>

            <div className={`profile_layout_container mt-2`}>
                {!showVerifyForm && !showQRScanSection &&
                <>
                    <div className={`profile_layout_container_heading`}>2-step authentication</div>
                    <div className="light-intro small mt-1">We recommend setting up Two Factor Authentication for an additional layer of security to your account in case your password is compromised.</div>
                    
                    <div className="mt-2 flex-vertical-center">
                        <Switch
                            checked={isTwoFactor}
                            onChange={handleChange}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                        />
                        <div className="ml-05">{!isTwoFactor ? 'Enable' : 'Disable'} Two Factor Authentication</div>
                    </div>
                </>
                }
                { showVerifyForm &&
                    <div className="mt-2">
                        <VerifyTotp 
                            onSuccess={(totp)=>setupTwoFactor(totp)} 
                            onError={(msg)=>{
                                setError(msg);
                                setShowVerifyForm(false);
                                setShowQRScanSection(false);
                            }} />
                    </div>
                }
                {
                    showQRScanSection && qrSection
                }
            </div>
        </>
  );
};