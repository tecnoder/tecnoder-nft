import React, { useEffect, useState } from 'react';
import moment from "moment";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isErrorExists, useAppDispatch, useAppSelector } from '@sindric-lib-ui/commons';
import { ProfileFormData } from '@sindric-lib-ui/validator/lib/classes';
import { validate } from '@sindric-lib-ui/validator';
import { removeLoader, setLoader } from '@sindric-lib-ui/commons/lib/redux/slices/loader';
import { postData } from '@sindric-lib-ui/commons/lib/api/api';
import { searchByUserProfileUrl, updateUserDetailsUrl } from '@sindric-lib-ui/endpoints';
import Message from '../../Message';
import { Button } from '../../button';
import InputField from '../../InputField';

import DatePicker from 'react-date-picker';

export const AccountSettings: React.FC<{[key:string]: any}> = ({userData}) => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector((state) => state)

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [originalProfileName, setOriginalProfileName] = useState("");
    const [dob, setDob] = useState("");
    const [dobError, setDobError] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [discordHandle, setDiscordHandle] = useState("");
    const [countryError, setCountryError] = useState("");
    const [stateError, setStateError] = useState("");
    const [emailId, setEmailId] = useState("");

    const [dateState, setDateState] = useState(null);

    const [fileUrl, setFileUrl] = useState<any>(null);
    const [file, setFile] = useState<any>(null);

    const [userAttributeList, setUserAttributeList] = useState<any>([]);

    let [errors, setErrors] = useState([]);
    

    useEffect(() => {
        if(userData){
            setEmailId(userData.emailId);
            setProfileName(userData.profileName);
            setOriginalProfileName(userData.profileName);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setDob(moment(userData.dateOfBirth, "l").format("l"));
            let dobLocal = moment(userData.dateOfBirth, "MM-DD-YYYY")
            setDateState(new Date(dobLocal.year(), dobLocal.month(), dobLocal.date()));
            setCountry(userData.country);
            setState(userData.state);
            if(userData.profileImageFileUri){
                setFileUrl(userData.profileImageFileUri)
            }
            if(userData.userAttributeList && userData.userAttributeList.length > 0){
                let discordHandle = userData.userAttributeList.find((attribute) => {
                    return attribute.attributeName === "discordUrl"
                })
                if(discordHandle){
                    setDiscordHandle(discordHandle.attributeValue)
                }
            }
        }
    }, []);

    const removeProfilePhoto = async () => {
        setFileUrl('');
        setFile(null);
        updateUserDetails("Y");
    }

    const handleUpdateUser = async (evt: any) => {
        evt.preventDefault();
        updateUserDetails();
    }

    const updateUserDetails = async (canDeleteProfileImage: string = "N") => {
        let profileFormData = new ProfileFormData(profileName, firstName, lastName, country, state);
        console.log(dateState);

        let errorFromValidator = validate(profileFormData);
        console.log(errorFromValidator);
        setErrors(errorFromValidator);
        if(isErrorExists(errorFromValidator) || validateAge(dateState) || dateState === null){
            setErrors(errorFromValidator);
            if(validateAge(dateState)){
                setDobError("You should be 13 years or older.");
            }
            if(dateState === null){
                setDobError("Please select a date.");
            }
        }
        else{
            dispatch(setLoader("updateAccount"));
            let data = {
                "firstName": firstName.trim(),
                "lastName": lastName.trim(),
                "profileName": profileName.trim(),
                "dateOfBirth": moment(dateState, "MM-DD-YYYY").format("MM-DD-YYYY"),
                "country": country,
                "state": state, 
                "canDeleteProfileImage": canDeleteProfileImage,
                "userAttributeList": userAttributeList
            };
            let formData = new FormData();
            formData.append("profileImage", file);
            formData.append("user", JSON.stringify(data));

            let headers: any = {
                'Content-Type': 'multipart/form-data'
            }
            if(user){
                headers['OWASP_CSRFTOKEN'] = user.jwtId;
            }
            const response = await postData(updateUserDetailsUrl, formData, {headers: headers});
            dispatch(removeLoader("updateAccount"));
            if(response.status === "SUCCESS"){
                setSuccess("Profile has been updated successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            else{
                setError(response.errorDesc)
            }
        }
    }

    const openFileLoader = () =>{
        let fileLoader = document.getElementById("fileToLoad");
        if(fileLoader){
            fileLoader.click();
        }
    }

    const handleFileChange = (event: any) => {
        if(event.target && event.target.files && event.target.files.length){
            setFile(event.target.files[0]);
            setFileUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleProfileChange = async (value: string) => {
        setProfileName(value);
        const response = await postData(searchByUserProfileUrl(value))
        if(response.status === "SUCCESS"){
            if(response.data && response.data.length !=0 && originalProfileName!==value){
                let localError = [];
                localError['profileName'] = [];
                localError['profileName'].push("Profile name already exists");
                setErrors(localError);
            }
            else{
                setErrors([]);
            }
        }
        else{
            setError(response.errorDesc);
        }
    }

    const handleDob = (ev: any) => {
        const { value } = ev.target;
        var input = value;
        if (/\D\/$/.test(input)) {
            input = input.substr(0, input.length - 3);
        }
        var values = input.split('/').map(function (v) {
            return v.replace(/\D/g, '')
        });
        if (values[0]) values[0] = checkValue(values[0], 12);
        if (values[1]) values[1] = checkValue(values[1], 31);
        var output = values.map(function (v, i) {
            return v.length === 2 && i < 2 ? v + ' / ' : v;
        });
        var opt = output.join('').substr(0, 14);
        setDob(opt);
        if(validateAge(opt)){
            let localError = [];
            localError['dob'] = [];
            localError['dob'].push("You should be 13 years or older.");
            setErrors(localError);
        }
    }

    function checkValue(str: any, max: any) {
        if (str.charAt(0) !== '0' || str == '00') {
            var num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
        };
        return str;
    };

    const handleCountry = async (value: string) => {
        setCountryError('');
        setErrors([]);
        document.querySelector('.countryField').classList.remove('error-field');
        setCountry(value);
    }

    const handleState = async (value: string) => {
        setStateError('');
        setErrors([]);
        let stateField = document.querySelector('.stateField');
        if(stateField){
            stateField.classList.remove('error-field');
        }
        setState(value);
    }

    // const validateAge = (value: string) => {
    //     if(value.length === 14){
    //         let formattedDate = moment(value, "MM-DD-YYYY").format("MM-DD-YYYY");
    //         let age = moment().diff(formattedDate, 'years');
    //         if(age < 13){
    //             return true;
    //         }
    //         else{
    //             return false;
    //         }
    //     }
    // }

    const handleAttributeChange = async (type: string, value: string) => {
        let attributeList = userAttributeList.slice(0);
        let attributeFound = attributeList.findIndex(attr => attr.attributeName === type);
        if(attributeFound !== -1){
            attributeList[attributeFound].attributeValue = value;
        }
        else{
            attributeList.push({
                "attributeName": type,
                "attributeValue": value
            })
        }
        setUserAttributeList(attributeList);
    }

    const validateAge = (value: string) => {
        if(value === null){
            setDobError("Please select a date.");
        }
        else if(value.length === 10){
            let age = moment().diff(value, 'years');
            if(age < 13){
                return true;
            }
            else{
                return false;
            }
        }
    }

    const handleDate = (value: Date) => {
        setDateState(value);

        let formattedDate = moment(value, "MM-DD-YYYY").format("MM-DD-YYYY");
        if(validateAge(formattedDate)){
            setDobError("You should be 13 years or older.")
        }
        else{
            setDobError("");
        }
    }

    return (
        <>
        <h4 className="mb-2">Account Settings</h4>
        {success.length > 0 && <Message type="success" message={success}/>}
        {error.length > 0 && <Message type="error" message={error}/>}
        <div className={`profile_layout_container mt-2`}>
            <form onSubmit={handleUpdateUser}>
                <div className="mb-2">
                    <div className="mb-05">Profile picture</div>
                    <div className={`profile_picture_wrapper`}>
                        {fileUrl ? 
                            <div>
                                <div className={`profile_picture_file`} onClick={openFileLoader}>
                                    <img src={fileUrl}/> 
                                </div>
                            </div>
                        :
                        <div className={`profile_picture_image`} onClick={openFileLoader}>
                            {/* <MercuryLogoSVG/> */}
                        </div>
                        }
                        <div className={`profile_picture_info`}>
                            <div className={`profile_picture_label`}>We recommend an image of at least 400x400. Gifs work too.</div>
                            <div className={`upload_button upload-button mt-1`}>
                                <input type="file" id="fileToLoad" accept=".jpg, .jpeg, .png, .gif, .svg" className="hide" onChange={(e)=>handleFileChange(e)} />
                                <div className="flex">
                                    <div onClick={openFileLoader}>
                                        <Button buttonType="button" type="user">Upload new image</Button>
                                    </div>
                                    {userData.profileImageFileUri && <div className="flex ml-1 remove_profile_photo" onClick={removeProfilePhoto}>
                                        <FontAwesomeIcon icon="trash" />
                                        <div className="ml-1">Remove</div>
                                    </div>}
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <InputField disabled={true} wrapperClass="mb-2" type="text" name="emailId" label="Email" placeholder="Email" value={emailId} errors={errors}/>
                <InputField wrapperClass="mb-2" type="text" name="firstName" label="First Name" placeholder="First Name" value={firstName} errors={errors} onChange={(e:any)=>setFirstName(e.target.value)}/>
                <InputField wrapperClass="mb-2" type="text" name="lastName" label="Last Name" placeholder="Last Name" value={lastName} errors={errors} onChange={(e:any)=>setLastName(e.target.value)}/>
                <InputField wrapperClass="mb-2" type="text" name="profileName" label="Profile Name" placeholder="Profile Name" value={profileName} errors={errors} onChange={(e:any)=>handleProfileChange(e.target.value)}/>
                <InputField wrapperClass="mb-1 mt-1" type="text" name="discordHandle" label="Discord Handle" placeholder="Discord Handle" value={discordHandle} errors={errors} onBlur={(e:any)=>handleAttributeChange('discordUrl', e.target.value)} onChange={(e:any)=>setDiscordHandle(e.target.value)}/>
                <div className="grid-row column mb-1">
                    <div className="mb-05">Date of Birth</div>
                    <div className={`dob_field`}>
                    {/* <DatePicker className={`${dobError.length>0 ? "error-field" : ""}`} selected={dateState} onChange={(date) => handleDate(date)} dateFormat="MM-dd-yyyy"/> */}
                    <DatePicker className={`${dobError.length>0 ? "error-field" : ""}`} clearIcon={null} onChange={(date) => handleDate(date)} maxDate={new Date()} value={dateState} format="MM-dd-yyyy" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY"/>
                    {dobError.length > 0 && 
                        <div className="error-field-desc">
                            {dobError}
                        </div>
                    }
                    </div>
                </div>
                {/* <div>
                    <div className="mb-05">Date of Birth</div>
                    <InputField wrapperClass="mb-1" type="text" name="dob" placeholder="MM-DD-YYYY" value={dob} errors={errors} onChange={(e:any)=>handleDob(e)}/>
                </div> */}
                <div className="mt-2">
                    <div className="mb-05">Country</div>
                    <CountryDropdown
                        classes={(errors.includes('country') ? 'error-field' : 'countryField')}
                        defaultOptionLabel="Select country"
                        value={country}
                        onChange={(val) => handleCountry(val)}
                        blacklist={['AF', 'BY', 'CF', 'CD', 'CU', 'GW', 'IQ', 'IR', 'KP', 'LY', 'ML', 'MM', 'SO', 'SS', 'SD', 'SY', 'UA', 'VE', 'YE']}
                        priorityOptions={["US"]}
                    />
                    {countryError.length > 0 && 
                    <div className="error-field-desc">
                        {countryError}
                    </div>
                    }
                </div>
                <div className="mt-2">
                    <div className="mb-05">State</div>
                    <RegionDropdown
                        classes="mt-1 stateField"
                        defaultOptionLabel="Select state"
                        country={country}
                        value={state}
                        onChange={(val) => handleState(val)} 
                    />
                    {stateError.length > 0 && 
                        <div className="error-field-desc">
                            {stateError}
                        </div>
                    }
                    <div className={`submit_button submit-button mt-3`}>
                        <Button type="primary">Update</Button>
                    </div>
                </div>
            </form>
        </div>
        </>
    );

};

export default AccountSettings;
