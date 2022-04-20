import React, { useState, useEffect, useCallback } from "react";

// import { Button, Footer } from "components/scss";

// import { ApiService } from "helper/api/api";
import {Link, useHistory} from "react-router-dom";
// import { createAthleteUrl, updateAthleteUrl, getAthleteRolesUrl, getAthleteByIdUrl } from "helper/api/api-endpoints";
// import CheckboxField from "components/scss/elements/checkboxfield/CheckboxField";
// import { useAppSelector, useAppDispatch } from "redux/store";
// import { CreateAthleteData } from "./CreateAthleteData";
// import { validate } from "helper/validation/validator";
// import InputField from "components/scss/elements/inputfield/InputField";
// import DateTimeField from "components/scss/elements/inputfield/InputField";
// import SelectField from "components/scss/elements/selectfield/SelectField";
// import TextareaField from "components/scss/elements/textareafield/TextareaField";
// import FileInputField from "components/scss/elements/fileinputfield";
// import { isErrorExists, validUrlRegex } from "helper/utility";

// import Layout2 from "../../layout-2";
// import { Country, State, City }  from 'country-state-city';
import moment from 'moment';
import { isErrorExists, useAppDispatch, useAppSelector } from "@sindric-lib-ui/commons";
import { PublicService } from "@sindric-lib-ui/commons/lib/api/service";
import { removeLoader, setLoader } from "@sindric-lib-ui/commons/lib/redux/slices/loader";
import { postData } from "@sindric-lib-ui/commons/lib/api/api";
import { createAthleteUrl, getAthleteRolesUrl, updateAthleteUrl } from "@sindric-lib-ui/endpoints";
import { CreateAthleteData } from "@sindric-lib-ui/validator/lib/classes";
import { validate } from "@sindric-lib-ui/validator";
import FileInputField from "../fileinputfield";
import InputField from "../InputField";
import { DateTimeField, SelectField } from "../components";
import { Button } from "../button";
// import { setLoader, removeLoader } from "redux/slices/loader";
// import UserWrapper from "../user-wrapper";
// import Layout3 from "pages/layout-3";
// import PublicService from "helper/api/service/public/public.api";


interface Attribute{
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    maxlength?: number;
    max?: string;
    min?: string;
    type?: string;
    unit?: string;
    showTimeInput?:boolean;
    shouldCloseOnSelect?:boolean;
    selected?: any;
}


const CreateAthelete: React.FC<{[key:string]: any}> = () => {

    const dispatch = useAppDispatch();

    const [athleteId, setAthleteId] = useState<number>(0);
    const [athleteName, setAthleteName] = useState("");

    const [location, setLocation] = useState(""); 
    const [city, setCity] = useState<any>(); 
    const [district, setDistrict] = useState<any>(); 
    const [country, setCountry] = useState<any>(); 

    const [role, setRole] = useState<any>();
    //const [biograph, setBiograph] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [profileImage, setProfileImage] = useState<any>("");
    const [profileThumbnailImageUrl, setProfileThumbnailImageUrl] = useState("");
    const [profileThumbnailImage, setProfileThumbnailImage] = useState<any>("");
    const [bannerImageUrl, setBannerImageUrl] = useState("");
    const [bannerImage, setBannerImage] = useState<any>("");
    
    const [toUpdate, setToUpdate] = useState<boolean>(false);
    /*const [isVerified, setIsVerified] = useState<boolean>(false);

    const [socialMediaUrl, setSocialMediaUrl] = useState("");
    const [spotifyUrl, setSpotifyUrl] = useState("");
    const [appleMusicUrl, setAppleMusicUrl] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");

    const [twitterHandle, setTwitterHandle] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [instagramHandle, setInstagramHandle] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");*/

    const attributeList: Attribute[] = [{
        name: 'class',
        label: "Class",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200
    },{
        name: 'jerseyName',
        label: "Jersey Name",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200
    },{
        name: 'jerseyNumber',
        label: "Jersey Number",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200,
    },{
        name: 'position',
        label: "Position",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200,
    },{
        name: 'height',
        label: "Height",
        type: 'text',
        required: false,
        disabled: false,
        maxlength: 200,
        unit: "FT"
    }/*
    ,{
        name: 'height',
        label: "Height",
        required: false,
        disabled: false,
        children: [
            {
                name: 'feet',
                type: 'select',
                options: [1,2,3,4,5,6,7,8,9,10],
                unit: "FT"
            },
            {
                name: 'inch',
                type: 'select',
                options: [1,2,3,4,5,6,7,8,9,10,11,12],
                unit: "INCH"
            }            
        ]
    }    
    */,{
        name: 'weight',
        label: "Weight",
        type: 'text',
        required: false,
        disabled: false,
        maxlength: 200,
        unit: "LBS"
    },{
        name: 'birthday',
        label: "Birthday",
        type: 'date',
        required: false,
        disabled: false,
        showTimeInput: false,
        maxlength: 200,
    },{
        name: 'hometown',
        label: "Hometown",
        type: 'text',
        required: false,
        disabled: false,
        maxlength: 200,
    },{
        name: 'preferenceNo',
        label: "Preference No.",
        type: 'text',
        required: false,
        disabled: false,
        maxlength: 200,
    }];

    const [athleteAttributeList, setAthleteAttributeList] = useState<Attribute[]>(attributeList.slice(0));

    /*const [jerseyName, setJerseyName] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [position, setPosition] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [birthday, setBirthday] = useState("");
    const [hometown, setHometown] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");*/

    const [allRoles, setAllRoles] = useState<any[]>([]);
    const [allCountries, setAllCountries] = useState<any[]>([]);
    const [countryStates, setCountryStates] = useState<any[]>([]);

    const [saving, setSaving] = useState(false);
    const [resp, setResp] = useState<boolean>(false);
    const [isAthleteLoaded, setIsAthleteLoaded] = useState<boolean>(false);

    const [errors, setErrors] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const history = useHistory();
    
    const {user} = useAppSelector((state) => state)


    useEffect(() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramId = urlParams.get('update')

        getAthleteRoles();

        if(paramId){
          setToUpdate(true);
          getAthleteById(paramId);
        }
        else{
          setToUpdate(false);
        }

    }, []);

    async function getAthleteById(id){
        dispatch(setLoader("loadingAthlete"))

        const response:any = await PublicService.getAthleteById(id);

        dispatch(removeLoader("loadingAthlete"))

        if (response){
          if(response.status === 'SUCCESS') {
            let respData = response.data;
            setProfileImageUrl(respData.profileImageUri);
            setProfileImage(respData.profileImageUri);
            setProfileThumbnailImage(respData.profileThumbnailUri);
            setProfileThumbnailImageUrl(respData.profileThumbnailUri);
            setBannerImage(respData.bannerImageUri);
            setBannerImageUrl(respData.bannerImageUri);
            setAthleteName(respData.athleteName);
            setAthleteId(respData.athleteId);

            const responseRoles:any = await postData(getAthleteRolesUrl, null);

            if(responseRoles){
                if(responseRoles.status === 'SUCCESS'){
                    responseRoles.data.Sports.map(item=>{
                        if(item.roleId === respData.roleId){
                            setRole({label: item.subCategory, value: item.roleId})
                        }
                    });
                }
                else{
                    setErrors([responseRoles.errorDesc]);
                }
            }
            
            let responseAthleteAttributeList: any[] = respData.athleteAttributeList;
            responseAthleteAttributeList.map((attribute) => {
                let index = attributeList.findIndex((item) => item.name === attribute.attributeName);
                if(index !== -1){
                    attributeList[index].value = attribute.attributeValue;
                    setAthleteAttributeList(attributeList);
                }
            })

            //setBiograph(respData.biograph);
            //setWebsiteUrl(respData.websiteUrl);
            //setLocation(respData.location);
            //if(respData.location){
            //    const arr = respData.location.split(",")
            //    setCity(arr[1]);
            //    setDistrict({isoCode: arr[0]});
            //    setCountry({isoCode: arr[2]});
            //}
            //setCity(respData.city);
            //setDistrict({isoCode: respData.state, name: respData.state});
            //setCountry({isoCode:respData.country, name: respData.country});
            //setIsVerified(respData.isVerified==="Y");
            //setTwitterUrl(respData.twitterUrl);
            //setTwitterHandle(respData.twitterHandle);
            //setInstagramUrl(respData.instagramUrl);
            //setInstagramHandle(respData.instagramHandle);

            //if(respData.country){
                //setCountryStates(State.getStatesOfCountry(respData.country));
            //}

          } else {
            setErrors([response.errorDesc]);
          }
        }
        else{
           setErrors(["Error occurred while getting Athlete details"]); 
        }
        setIsAthleteLoaded(true);
    }

    async function getAthleteRoles(){
        const response:any = await postData(getAthleteRolesUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllRoles(response.data.Sports.map(item=>{
                    return {label: item.subCategory, value: item.roleId}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting athlete roles"]);            
        }
    }

/*    const handleTwitterUrl = (val:any)=>{
        if(validUrlRegex.test(val) && (val.indexOf('http://')!== -1 || val.indexOf('https://')!== -1)){
          const url = new URL(val);
          setTwitterHandle(url.pathname.substring(1));
        }
        setTwitterUrl(val);
    }

    const handleInstagramUrl = (val:any)=>{
        if(validUrlRegex.test(val) && (val.indexOf('http://')!== -1 || val.indexOf('https://')!== -1)){
          const url = new URL(val);
          setInstagramHandle(url.pathname.substring(1));
        }
        setInstagramUrl(val);
    }

    const handleCountryChange = (pCountry:any)=>{
        setCountry(pCountry);
        const states = State.getStatesOfCountry(pCountry.isoCode);
        setCountryStates(states);
        if( district && !states.find(s=>s.isoCode===district.isoCode) ){
          setDistrict(null);
        }
    }*/

    async function handleSubmit (event:any) {
        event.preventDefault();

        console.log(role);

        let data = new CreateAthleteData(
            toUpdate===true? athleteId : 0,
            athleteName,
            role.value,
            //biograph,
            profileImage,
            profileThumbnailImage,
            bannerImage,
            athleteAttributeList.map(item=>{
                return {
                    attributeName: item.name,
                    attributeValue: item.value
                }
            }),
            /*district.isoCode,
            city,
            country.isoCode,
            district.name+","+city+","+country.name,
            isVerified===true? "Y" : "N",
            socialMediaUrl,
            spotifyUrl,
            appleMusicUrl,
            websiteUrl,
            twitterUrl,
            instagramUrl,
            twitterHandle,
            instagramHandle*/
        );

        let errorFromValidator = validate(data);
        setErrors(errorFromValidator);

        if(isErrorExists(errorFromValidator)){
            setErrors(errorFromValidator);
        }
        else{
            dispatch(setLoader("loadingAthlete"))
            setSaving(true);
            let formData = new FormData();
            formData.append("athlete", JSON.stringify(data.getPayload()));
            formData.append("profileImage", profileImage);
            formData.append("profileThumbnailImage", profileThumbnailImage);
            if(bannerImage){
              formData.append("bannerImage", bannerImage);
            }

            let headers: any = {
              'Content-Type': 'multipart/form-data'
            }

            let apiUrl;

            if(toUpdate){
              apiUrl = updateAthleteUrl;
            }
            else{
              apiUrl = createAthleteUrl;
            }


            let response = await postData(apiUrl, formData, {headers:headers});

            setSaving(false);
            dispatch(removeLoader("loadingAthlete"))

            if(response){
                if(response.status === "SUCCESS"){
                    //setShowSuccessMessage(true);\
                    let stateData = {};
                    if(toUpdate){
                        stateData = {
                            status: true,
                            message1: null,
                            message2: `Athlete Update Successful`,
                            btnUrl1: `/player/${athleteId}`,
                            btnText1: `Go to athlete`,
                            btnUrl2: '/',
                            btnText2: `Home`
                        };
                    }
                    else{
                        stateData = {
                            status: true,
                            message1: null,
                            message2: `Athlete Creation Successful`,
                            btnUrl1: '/user/create-athlete',
                            btnText1: `Create Athlete`,
                            btnUrl2: '/',
                            btnText2: `Home`
                        };
                    }

                  history.push({
                      pathname: '/req/status',
                      state: {
                          data: stateData
                      }
                  });                    
                }
                else{
                    setErrors([response.errorDesc]);
                }
            }
            else{
                setErrors(["Error occurred while saving Athlete details"]);
            }
        }
    }


    const gotoCreateAthlete = (e:any)=>{
        history.push('/account');
    }


    const handleProfileImage = (e:any) =>{
        setProfileImage(e);
    }

    //const handleBannerImage = (e:any) =>{
        //setBannerImage(e);
    //}

    const handleAttributeChange = (val:any, attr: Attribute, index:number)=>{

        if(attr.type==="date"){
            attr.selected = val;
            //let dt = moment(val, "MM/DD/YYYY").format("MM/DD/YYYY");
            //if(dt!=="Invalid date"){
            //    attr.value = dt;
            //}
            attr.value = val;
        }
        else{
            attr.value = val;
        }
        let newList = athleteAttributeList.slice(0);
        newList[index] = attr;
        setAthleteAttributeList(newList);
    }

    const content = (
        <div className={`${`form_wrapper_2`} form_wrapper`}>
            <h1 className="form_heading">Create Athlete</h1>
            <div className={`form_container mt-3`}>
                <form onSubmit={handleSubmit}>

                        <FileInputField 
                            wrapperClass="mb-2" 
                            type="text" 
                            name="profileImage"
                            label="Profile Picture"
                            placeholder="Select image" 
                            value={profileImage} 
                            errors={errors} 
                            onChange={(e:any)=>setProfileImage(e)} />

                        <FileInputField 
                            wrapperClass="" 
                            type="text" 
                            name="profileThumbnailImage"
                            label="Thumbnail Picture"
                            placeholder="Select thumbnail" 
                            value={profileThumbnailImage} 
                            errors={errors} 
                            onChange={(e:any)=>setProfileThumbnailImage(e)} />
                        <div className="text-gray ">Upload thumbnail of size 50x50 or 60x60</div>

                        <FileInputField 
                            wrapperClass="mb-2 mt-2" 
                            type="text" 
                            name="bannerImage"
                            label="Banner Picture"
                            placeholder="Select image" 
                            value={bannerImage} 
                            errors={errors} 
                            onChange={(e:any)=>setBannerImage(e)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="athleteName"
                        label="Athlete Name"
                        placeholder="Enter text here" 
                        value={athleteName} 
                        errors={errors} 
                        onChange={(e:any)=>setAthleteName(e.target.value)} />

                    {/*<TextareaField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="biograph"
                        label="Biograph"
                        placeholder="Enter text here" 
                        value={biograph} 
                        errors={errors} 
                        onChange={(e:any)=>setBiograph(e.target.value)} />*/}

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="roleId"
                        label="Role"
                        value={allRoles && role? allRoles.find(cs=>cs.value===role.value) : null} 
                        errors={errors}
                        options={allRoles} 
                        optionText="subCategory"
                        optionValue="roleId"
                        onChange={(e:any)=>{setRole(e);}} />

                    {
                        athleteAttributeList.map((attr:Attribute,index:number)=>{
                            return attr.type==='text'?
                                <InputField 
                                    wrapperClass="mb-2" 
                                    type="text" 
                                    name={attr.name}
                                    label={attr.label}
                                    placeholder="Enter text here" 
                                    value={attr.value} 
                                    errors={errors} 
                                    onChange={(e:any)=>handleAttributeChange(e.target.value, attr, index)} />
                                :
                                attr.type==='number'?
                                    <InputField 
                                        wrapperClass="mb-2" 
                                        type="number"
                                        maxlength={attr.maxlength}
                                        min={attr.min} 
                                        name={attr.name}
                                        label={attr.label}
                                        placeholder="Enter value" 
                                        value={attr.value} 
                                        errors={errors} 
                                        onChange={(e:any)=>handleAttributeChange(e.target.value, attr, index)} />
                                    :
                                    attr.type==='date'?
                                        <DateTimeField 
                                            wrapperClass="mb-2" 
                                            name={attr.name}
                                            label={attr.label}
                                            placeholder={attr.placeholder||"MM/DD/YYYY"} 
                                            value={attr.value} 
                                            selected={attr.selected} 
                                            errors={errors}
                                            timeInputLabel="Time:" 
                                            dateFormat={'MM/dd/yyyy h:mm aa'} 
                                            required={attr.required} 
                                            minDate={attr.min} 
                                            monthsShown={1} 
                                            showTimeInput={attr.showTimeInput} 
                                            shouldCloseOnSelect={!attr.showTimeInput}
                                            onChange={(e:any)=>handleAttributeChange(e.target.value, attr, index)} />
                                        :
                                        <></>
                        })
                    }

                    {/*<SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="country"
                        label="Country"
                        placeholder="Enter text here" 
                        value={allCountries && country? allCountries.find(cs=>cs.isoCode===country.isoCode) : null} 
                        errors={errors} 
                        options={allCountries}
                        optionText="name"
                        optionValue="isoCode"
                        onChange={(e:any)=>handleCountryChange(e)} />

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="district"
                        label="State or Province"
                        value={countryStates && district? countryStates.find(cs=>cs.isoCode===district.isoCode) : null} 
                        errors={errors} 
                        options={countryStates}
                        optionText="name"
                        optionValue="isoCode"
                        onChange={(e:any)=>setDistrict(e)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="city"
                        label="City"
                        placeholder="Enter city here" 
                        value={city} 
                        errors={errors} 
                        onChange={(e:any)=>setCity(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="socialMediaUrl"
                        label="Social Media"
                        placeholder="Enter Url" 
                        value={socialMediaUrl} 
                        errors={errors} 
                        onChange={(e:any)=>setSocialMediaUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="spotifyUrl"
                        label="Spotify"
                        placeholder="Enter Url" 
                        value={spotifyUrl} 
                        errors={errors} 
                        onChange={(e:any)=>setSpotifyUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="appleMusicUrl"
                        label="Apple Music"
                        placeholder="Enter Url" 
                        value={appleMusicUrl} 
                        errors={errors} 
                        onChange={(e:any)=>setAppleMusicUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="websiteUrl"
                        label="Website"
                        placeholder="Enter Url" 
                        value={websiteUrl} 
                        errors={errors} 
                        onChange={(e:any)=>setWebsiteUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="twitterUrl"
                        label="Twitter"
                        placeholder="Enter Url" 
                        value={twitterUrl} 
                        errors={errors} 
                        onChange={(e:any)=>handleTwitterUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="twitterHandle"
                        label="Twitter Handle"
                        placeholder="@" 
                        value={twitterHandle} 
                        errors={errors} 
                        disabled={true} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="instagramUrl"
                        label="Instagram"
                        placeholder="Enter Url" 
                        value={instagramUrl} 
                        errors={errors} 
                        onChange={(e:any)=>handleInstagramUrl(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="instagramHandle"
                        label="Instagram Handle"
                        placeholder="@" 
                        value={instagramHandle} 
                        errors={errors} 
                        disabled={true} />*/}

                    <div className={`submit-button mt-2`}>
                        <Button type="primary" aria-disabled>{toUpdate ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );

    if(toUpdate && isAthleteLoaded){
        return (
            content
        );
    }
    else if(!toUpdate){
        return (
            content
        ); 
    }
    else{
        return (
            <></>
        );
    }
};

export default CreateAthelete;
