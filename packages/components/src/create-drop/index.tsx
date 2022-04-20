import React, { useState, useEffect } from "react";

import {Link, useHistory} from "react-router-dom";
import moment from 'moment';
import { alphaNumSpecialRegex, decimalRegex, integerRegex, isErrorExists, useAppDispatch, useAppSelector } from "@sindric-lib-ui/commons";
import { removeLoader, setLoader } from "@sindric-lib-ui/commons/lib/redux/slices/loader";
import { postData, cancelTokenSource } from "@sindric-lib-ui/commons/lib/api/api";
import { createDropUrl, getAllAthletesUrl, getDropTypesUrl, getNftPlatformTypeUrl } from "@sindric-lib-ui/endpoints";
import { PublicService, UserService } from "@sindric-lib-ui/commons/lib/api/service";
import { YMD_TIME_FMT } from "../utility";
import FileInputField from "../fileinputfield";
import InputField from "../InputField";
import { DateTimeField, MultiSelectField, SelectField, TextareaField } from "../components";
import { Button } from "../button";
// import UserWrapper from "../user-wrapper";
// import Layout3 from "pages/layout-3";

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

const CreateDrop: React.FC = () => {

    const dispatch = useAppDispatch();

    const [dropId, setDropId] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [startTime, setStartTime] = useState<any>(new Date()); 
    const [endTime, setEndTime] = useState<any>(new Date());

    const [athleteIdList, setAthleteIdList] = useState<any[]>([]); 
    const [noOfCopies, setNoOfCopies] = useState<any>();

    const [nftPlatformType, setNftPlatformType] = useState<string>();
    const [dropTypeId, setDropTypeId] = useState<any>();
    const [accessId, setAccessId] = useState<string>("0");
    const [royaltyCategory, setRoyaltyCategory] = useState<any>();
    const [tier, setTier] = useState<any>({});

    const [assetFileUrl, setAssetFileUrl] = useState("");
    const [assetFile, setAssetFile] = useState<any>("");
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState<any>("");
    const [assetBannerImageUrl, setAssetBannerImageUrl] = useState("");
    const [assetBannerImage, setAssetBannerImage] = useState<any>("");

    const [isPackDrop, setIsPackDrop] = useState<boolean>(false);
    const [isRewardDrop, setIsRewardDrop] = useState<boolean>(false);
    const [isResellNFT, setIsResellNFT] = useState<boolean>(true);

    const [hasBuyItNow, setHasBuyItNow] = useState<boolean>(false);
    const [isEntitlement, setIsEntitlement] = useState<boolean>(false);

    const [buyItNowPrice, setBuyItNowPrice] = useState<string>("");
    const [minimumPrice, setMinimumPrice] = useState<string>("");
    const [minimumBidIncrement, setMinimumBidIncrement] = useState<string>("");

    const [toUpdate, setToUpdate] = useState<boolean>(false);

    const attributeList: Attribute[] = [{
        name: 'upi',
        label: "UPI",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200
    },{
        name: 'licenseCode',
        label: "License Code",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200
    },{
        name: 'institutionShortCode',
        label: "Institution Short Code",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200,
    },{
        name: 'categorySubCategoryCode',
        label: "Category SubCategory Code",
        required: false,
        disabled: false,
        type: 'text',
        maxlength: 200,
    }];

    const [dropAttributeList, setDropAttributeList] = useState<Attribute[]>(attributeList.slice(0));    

    const [allTiers, setAllTiers] = useState<any[]>([]);
    const [allDropTypes, setAllDropTypes] = useState<any[]>([]);
    const [allAthletes, setAllAthletes] = useState<any[]>([]);
    const [allNftPlatformTypes, setAllNftPlatformTypes] = useState<any[]>([]);
    const [allAccessTypes, setAllAccessTypes] = useState<any[]>([]);
    const [royaltyCategories, setRoyaltyCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [resp, setResp] = useState<boolean>(false);


    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const history = useHistory();
    
    const {user} = useAppSelector((state) => state)


    useEffect(() => {

        const cancelTokenSrc = cancelTokenSource();
        let conf: any = {
          cancelToken: cancelTokenSrc.token
        }
        dispatch(setLoader("loadingDrop"))
        Promise.all([
            getAllDropTypes(),
            getAllNftPlatformTypes(),
            getAllAthletes(),
            getAllTiers(),
            getAccessTypes(),
            getRoyaltyCategories(),
        ])
        .then(()=>{
            setLoading(false);
            dispatch(removeLoader("loadingDrop"))
        },
        (err)=>{
            setLoading(false);
            dispatch(removeLoader("loadingDrop"))
        });

        return () => cancelTokenSrc.cancel();

    }, []);


/*    async function getDropById(id){
        const response:any = await postData(getDropByIdUrl(parseInt(id)));

        if (response){
          if(response.status === 'SUCCESS' && response.data && response.data.length>0) {
            let respData = response.data[0];
            setAssetFileUrl(respData.assetFileUrl)
            setThumbnailImageUrl(respData.thumbnailUrl)
            setBannerImageUrl(respData.bannerFile);
            setTitle(respData.title);
            setDropId(respData.dropId);
            setDropType({dropTypeId: respData.dropTypeId.toString()});
            setDescription(respData.description);
            setStartTime(moment.utc(respData.startTime, YMD_TIME_FMT).local());
            setEndTime(moment.utc(respData.endTime, YMD_TIME_FMT).local());
            setAthleteIdList(respData.athleteIdList.split(",").map(id=>{return{athleteId:id}}));
            setNoOfCopies(respData.noOfCopies);
            setIsPackDrop(respData.isPackDrop==='Y');
            setBuyItNowPrice(respData.buyItNowPrice);
            setMinimumPrice(respData.minimumPrice);
            setMinimumBidIncrement(respData.minimumBidIncrement);
          } else {
            setErrors([response.errorDesc]);
          }
        }
        else{
           setErrors(["Error occurred while getting Drop details"]); 
        }
    }*/

    async function getAllAthletes(){
        const response:any = await postData(getAllAthletesUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllAthletes(response.data.map(item=>{
                    return {value:item.athleteId, label: item.athleteName}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting all athletes"]);            
        }
    }

    async function getAccessTypes(){
        const response:any = await UserService.getAccessTypes();

        if(response){
            if(response.status === 'SUCCESS'){
                setAllAccessTypes(response.data.map(item=>{
                    return {value:item.accessId+"", label: item.accessName}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting access types"]);            
        }
    }

    async function getAllDropTypes(){
        const response:any = await postData(getDropTypesUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllDropTypes(response.data.map(item=>{
                    return {value:item.dropTypeId, label: item.dropTypeName}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting drop types"]);            
        }
    }

    async function getRoyaltyCategories(){
        const response:any = await PublicService.getDropRoyaltiCategory();

        if(response){
            if(response.status === 'SUCCESS'){
                setRoyaltyCategories(response.data.map(item=>{
                    return {value:item.royaltyCategoryId, label: item.royaltyCategoryName, isAthleteMandatory: item.isAthleteMandatory}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting drop royalty types"]);            
        }
    }

    async function getAllTiers(){
        const response:any = await PublicService.getAllTiers();

        if(response){
            if(response.status === 'SUCCESS'){
                const list = response.data.map(item=>{
                    return {value:item.tierId, label: item.tierName}
                });
                setAllTiers(list);

                setTier(list.find(t=>t.label==='REGULAR'))
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting tier types"]);            
        }
    }

    async function getAllNftPlatformTypes(){
        const response:any = await postData(getNftPlatformTypeUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllNftPlatformTypes(response.data.map(item=>{
                    return {value:item.nftPlatformType, label: item.nftPlatformType}
                }));
            }
            else{
                setErrors([response.errorDesc]);
            }
        }
        else{
            setErrors(["Error occurred while getting NFT platform types"]);            
        }
    }

    const handleDropType = (e: any) => {
        const val = e.value;
        const valStr = val+'';
        const date = moment().add(5,'year');
        setDropTypeId(val);

        if(valStr === "1"){ //Auction 1 Qty scenario with start and end time
          //Auction
          setNoOfCopies("1");
          setHasBuyItNow(false);
          setBuyItNowPrice("");
          setMinimumPrice("");
          setMinimumBidIncrement("");
          setStartTime(new Date());
          setEndTime(new Date());
          setIsPackDrop(false);
          setIsRewardDrop(false);
        }
        else if(valStr === "2"){ //Fixed buy it now Qty scenario with start and no end time
          //Fixed
          setNoOfCopies("");
          setHasBuyItNow(false);
          setBuyItNowPrice("");
          setMinimumPrice("");
          setMinimumBidIncrement("");
          setStartTime(new Date());
          setEndTime(date.toDate());
        }
        else if(valStr === "3"){ //Infinite Qty Time window with start and end time
          //TimeWindow
          setNoOfCopies("-1");
          setHasBuyItNow(false);
          setBuyItNowPrice("");
          setMinimumPrice("");
          setMinimumBidIncrement("");
          setStartTime(new Date());
          setEndTime(new Date());
        }
        setErrors([]);
    }


    const validateForm = (event?:any) =>{
        let result:{[key:string]: any} = {}, now = new Date();
    
        if(!title || title.trim().length===0){
          result.title = ["Please enter Drop Title"];
        }
        else if(title && !alphaNumSpecialRegex.test(title)){
            result.title = ["Please enter valid Drop Title"];
        }

        if(!dropTypeId || dropTypeId==="-1" || !integerRegex.test(dropTypeId+'')){
          result.dropTypeId = ["Please select a Drop Type."];
        }
        //if(!tier || tier.value==="-1" || !integerRegex.test(tier.value+'')){
        //  result.tier = ["Please select a Drop Tier."];
        //}
        if(!description || description.trim().length===0){
          result.description = ["Please enter valid Description."];
        }

        if(!royaltyCategory || !royaltyCategory.value){
          result.royaltyCategory = ["Please select valid Royalty Category"];
        }

        //if( (!royaltyCategory || !royaltyCategory.value || royaltyCategory.isAthleteMandatory==='Y')
        //    && (!athleteIdList || athleteIdList.length===0)){ //If royalty is not set or royalty athlete is mandatory
        //  result.athleteIdList = ["Please select an Athlete."];
        //}

        if(!nftPlatformType|| nftPlatformType.trim().length===0){
          result.nftPlatformType = ["Please enter valid NFT Type."];
        }

        if(!accessId || accessId==="-1" || accessId.trim().length===0){
          result.accessId = ["Please select valid access type."];
        }

        if(dropTypeId && dropTypeId===1){
          if(!noOfCopies || parseInt(noOfCopies) != 1 ){
            result.noOfCopies = ["Please enter valid number of copies. For Auction only 1 drop is allowed"];
          }

          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Drop Start Time."];
          }
          if(!endTime|| (startTime && endTime.getTime() <= startTime.getTime())){
            result.endTime = ["Please select valid Auction End Time."];
          }

          if(hasBuyItNow===true && (!buyItNowPrice || parseFloat(buyItNowPrice)<0 || !decimalRegex.test(buyItNowPrice+'') )){
            result.buyItNowPrice = ["Please enter valid Buy it Now Price."];
          }

          if(!minimumPrice || parseFloat(minimumPrice)<0.0 || !decimalRegex.test(minimumPrice+'') ){
            result.minimumPrice = ["Please enter valid Minimum Bid Price."];
          }

          if(!minimumBidIncrement || parseFloat(minimumBidIncrement)<0.0 || !decimalRegex.test(minimumBidIncrement+'') ){
            result.minimumBidIncrement = ["Please enter valid Minimum Bid Increment."];
          }
          else if(minimumBidIncrement && minimumPrice && parseInt(minimumBidIncrement) > parseInt(minimumPrice)){
            result.minimumBidIncrement = ["Minimum Bid Increment cannot be greater than Minimum Bid Price."];
          }
        }

        if(dropTypeId && dropTypeId===2){
          if(isPackDrop===false && isRewardDrop===false && (!buyItNowPrice || parseFloat(buyItNowPrice)<0 || !decimalRegex.test(buyItNowPrice+'')) ){
            result.buyItNowPrice = ["Please enter valid Buy it Now Price."];
          }
          if(!noOfCopies || parseInt(noOfCopies)<1 || !integerRegex.test(noOfCopies+'') ){
            result.noOfCopies = ["Please enter valid number of copies."];
          }
          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Drop Start Time."];
          }
        }

        if(dropTypeId && dropTypeId===3){
          if(isPackDrop===false && isRewardDrop===false && (!buyItNowPrice || parseFloat(buyItNowPrice)<0 || !decimalRegex.test(buyItNowPrice+'')) ){
            result.buyItNowPrice = ["Please enter valid Buy it Now Price."];
          }
          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Drop Start Time."];
          }
          if(!endTime|| (startTime && endTime.getTime() <= startTime.getTime())){
            result.endTime = ["Please select valid Drop End Time."];
          }
        }

        if(!assetFile){
          result.assetFile = ["Please select the drop asset."];
        }
        if(!thumbnailImage){
          result.thumbnailImage = ["Please upload a drop thumbnail image."];
        }

        setErrors(result);
        return Object.keys(result).length === 0;
    }


    async function handleSubmit (event:any) {
        event.preventDefault();
        if(validateForm(event)===false){
            return;
        }

        let data = {
            //dropId : 0,
            title : title,
            dropTypeId : dropTypeId,
            accessId : accessId,
            tier: tier? tier.label : null,
            description : description,
            isPackDrop : isPackDrop===true? 'Y' : 'N',
            isRewardDrop : isRewardDrop===true? 'Y' : 'N',
            resellNFT : isResellNFT===true? 'Y' : 'N',
            isEntitlement : accessId && accessId!=="-1" && accessId!=="0" && isEntitlement===true? 'Y' : 'N',
            noOfCopies : Number(noOfCopies),
            nftPlatformType : nftPlatformType,
            athleteIdList : athleteIdList? athleteIdList.map(a=>a.value) : [],
            buyItNowPrice : Number(buyItNowPrice),
            minimumPrice : Number(minimumPrice),
            minimumBidIncrement : Number(minimumBidIncrement),
            startTime : moment(startTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
            endTime : moment(endTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
            royaltyCategoryId: royaltyCategory&&royaltyCategory.value? royaltyCategory.value : null,
            dropAttributeList: dropAttributeList.map(item=>{
                return {
                    attributeName: item.name,
                    attributeValue: item.value
                }
            }),            
        };

        setSaving(true);
        dispatch(setLoader("loadingDrop"))

        let formData = new FormData();
        formData.append("drop", JSON.stringify(data));
        formData.append("assetFile", assetFile);
        formData.append("thumbnailImage", thumbnailImage);
        if(assetBannerImage){
          formData.append("assetBannerImage", assetBannerImage);
        }

        let response = await postData(createDropUrl, formData, {headers:{'Content-Type': 'multipart/form-data'}});

        setSaving(false);
        dispatch(removeLoader("loadingDrop"))
        
        if(response){
            if(response.status === "SUCCESS"){
              const stateData: any = {
                    status: true,
                    message1: null,
                    message2: `Drop Creation Successful`,
                    btnUrl1: '/user/create-drop',
                    btnText1: `Create Another Drop`,
                    btnUrl2: '/',
                    btnText2: `Home`
                };

              history.push({
                  pathname: '/req/status',
                  state: {
                      data: stateData
                  }
              });                    
            }
            else{
                setErrors({common: [response.errorDesc]});
            }
        }
        else{
            setErrors({common:["Error occurred while saving Drop details"]});
        }
    }

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
        let newList = dropAttributeList.slice(0);
        newList[index] = attr;
        setDropAttributeList(newList);
    }

    const gotoCreateDrop = (e:any)=>{
        history.push('/user/create-drop');
    }


    const handleAssetFile = (e:any) =>{
        setAssetFile(e);
    }

    const handleAssetBannerImage = (e:any) =>{
        setAssetBannerImage(e);
    }

    const handleThumbnailImage = (e:any) =>{
        setThumbnailImage(e);
    }

    const handleIsRewardDrop = (e:boolean) =>{
        setIsRewardDrop(e);
        setBuyItNowPrice('0');
        handleDropType(allDropTypes.find(dt=>dt.value===2));
    }

    const handleIsPackDrop = (e:boolean) =>{
        setIsPackDrop(e);
        setBuyItNowPrice('0');
        handleDropType(allDropTypes.find(dt=>dt.value===2));
    }

    const content = (
        <div className={`${`form_wrapper_2`} ${`create_drop_form`} form_wrapper`}>
            <h1 className="form_heading">Create Drop</h1>
            <div className={`form_container mt-3`}>
                <form onSubmit={handleSubmit}>

                    <FileInputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="assetFile"
                        label="Asset File"
                        placeholder="Select asset" 
                        value={assetFile} 
                        errors={errors} 
                        onChange={(e:any)=>setAssetFile(e)} />

                    <FileInputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="thumbnailImage"
                        label="Thumbnail Picture"
                        placeholder="Select thumbnail image" 
                        value={thumbnailImage} 
                        errors={errors} 
                        onChange={(e:any)=>setThumbnailImage(e)} />

                    <FileInputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="assetBannerImage"
                        label="Asset Banner Picture"
                        placeholder="Select banner image" 
                        value={assetBannerImage} 
                        errors={errors} 
                        onChange={(e:any)=>setAssetBannerImage(e)} />

                    <InputField
                        wrapperClass="mb-2" 
                        type="text" 
                        name="title"
                        label="Drop Name"
                        placeholder="Enter text here" 
                        value={title} 
                        errors={errors} 
                        onChange={(e:any)=>setTitle(e.target.value)} />

                    <TextareaField
                        wrapperClass="mb-2" 
                        type="text" 
                        name="description"
                        label="Description"
                        placeholder="Enter text here" 
                        value={description} 
                        errors={errors} 
                        onChange={(e:any)=>setDescription(e.target.value)} />

                    <div className={`mb-2 ${`checkboxfield`}`}>
                        <input id="isPackDrop" 
                            type="checkbox" 
                            name="isPackDrop" 
                            checked={isPackDrop}
                            onChange={(e:any)=>handleIsPackDrop(!isPackDrop)} 
                            className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && ('isPackDrop' in errors) ? 'error-field' : '')}/>
                        <label htmlFor="isPackDrop">Is Pack Drop</label>
                        {isErrorExists(errors) && 
                            <div className="error-field-desc">
                                { 'isPackDrop' in errors && errors['isPackDrop'][0]}
                            </div>
                        }
                    </div>

                    <div className={`mb-2 ${`checkboxfield`}`}>
                        <input id="isRewardDrop" 
                            type="checkbox" 
                            name="isRewardDrop" 
                            checked={isRewardDrop}
                            onChange={(e:any)=>handleIsRewardDrop(!isRewardDrop)} 
                            className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && ('isRewardDrop' in errors) ? 'error-field' : '')}/>
                        <label htmlFor="isRewardDrop">Is Reward Drop</label>
                        {isErrorExists(errors) && 
                            <div className="error-field-desc">
                                { 'isRewardDrop' in errors && errors['isRewardDrop'][0]}
                            </div>
                        }
                    </div>

                    <div className={`mb-2 ${`checkboxfield`}`}>
                        <input id="isResellNFT" 
                            type="checkbox" 
                            name="isResellNFT" 
                            checked={isResellNFT}
                            onChange={(e:any)=>setIsResellNFT(!isResellNFT)} 
                            className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && ('isResellNFT' in errors) ? 'error-field' : '')}/>
                        <label htmlFor="isResellNFT">Allow Resell NFT</label>
                        {isErrorExists(errors) && 
                            <div className="error-field-desc">
                                { 'isResellNFT' in errors && errors['isResellNFT'][0]}
                            </div>
                        }
                    </div>

                    <SelectField
                        wrapperClass="mb-2" 
                        type="text" 
                        name="dropTypeId"
                        label="DropType"
                        value={allDropTypes? allDropTypes.find(cs=>cs.value===dropTypeId) : null} 
                        errors={errors}
                        options={allDropTypes} 
                        onChange={(e:any)=>handleDropType(e)} />

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="nftPlatformType"
                        label="NFT Platform Type"
                        value={allNftPlatformTypes? allNftPlatformTypes.find(cs=>cs.value===nftPlatformType) : null} 
                        errors={errors} 
                        options={allNftPlatformTypes}
                        onChange={(e:any)=>setNftPlatformType(e.value)} />

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="tier"
                        label="Tier"
                        value={allTiers && tier? allTiers.find(cs=>cs.value===tier.value) : null} 
                        errors={errors}
                        options={allTiers} 
                        onChange={(e:any)=>setTier(e)} />

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="royaltyCategory"
                        label="Royalty Category"
                        value={royaltyCategory} 
                        errors={errors}
                        options={royaltyCategories} 
                        onChange={(e:any)=>setRoyaltyCategory(e)} />

                    <MultiSelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="athleteIdList"
                        label="Athlete(s)"
                        value={athleteIdList} 
                        errors={errors} 
                        options={allAthletes}
                        optionText="label"
                        optionValue="value"
                        onChange={(e:any)=>setAthleteIdList(e)} />

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="accessId"
                        label="Access Type"
                        value={allAccessTypes? allAccessTypes.find(cs=>cs.value===accessId) : null} 
                        errors={errors}
                        options={allAccessTypes} 
                        onChange={(e:any)=>setAccessId(e.value)} />


                    {
                        accessId && accessId!=="-1" && accessId!=="0" && 
                        (<div className={`mb-2 ${`checkboxfield`}`}>
                            <input id="isEntitlement" 
                                type="checkbox" 
                                name="isEntitlement" 
                                onChange={(e:any)=>setIsEntitlement(!isEntitlement)} 
                                className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && ('isEntitlement' in errors) ? 'error-field' : '')}/>
                                {isErrorExists(errors) && 
                                    <div className="error-field-desc">
                                        { 'isEntitlement' in errors && errors['isEntitlement'][0]}
                                    </div>
                                }
                            <label htmlFor="isEntitlement">Is Entitlement</label>
                        </div>)                      
                    }
                    
                    {
                        dropTypeId===1||dropTypeId===2?
                            <InputField 
                                wrapperClass="mb-2" 
                                type="text" 
                                name="noOfCopies"
                                label="No. of copies"
                                placeholder="# of copies" 
                                value={noOfCopies} 
                                errors={errors} 
                                disabled={dropTypeId===1}
                                onChange={(e:any)=>setNoOfCopies(e.target.value)} />
                            :
                            <></>
                    }

                    {
                        dropTypeId===1 && 
                        (<div className={`mb-2 ${`checkboxfield`}`}>
                            <input id="hasBuyItNow" 
                                type="checkbox" 
                                name="hasBuyItNow" 
                                onChange={(e:any)=>setHasBuyItNow(!hasBuyItNow)} 
                                className={(errors!=undefined && errors!=null && Object.keys(errors).length > 0 && ('hasBuyItNow' in errors) ? 'error-field' : '')}/>
                                {isErrorExists(errors) && 
                                    <div className="error-field-desc">
                                        { 'hasBuyItNow' in errors && errors['hasBuyItNow'][0]}
                                    </div>
                                }
                            <label htmlFor="hasBuyItNow">Has Buy It Now</label>
                        </div>)                      
                    }

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="buyItNowPrice"
                        label="Buy It Now Price ($)"
                        placeholder="Enter amount" 
                        disabled={!dropTypeId || (dropTypeId===1 && hasBuyItNow===false)||isRewardDrop===true||isPackDrop===true}
                        value={buyItNowPrice} 
                        errors={errors} 
                        onChange={(e:any)=>setBuyItNowPrice(e.target.value)} />

                    {
                        dropTypeId && dropTypeId===1?
                        <>
                            <InputField 
                                wrapperClass="mb-2" 
                                type="text" 
                                name="minimumPrice"
                                label="Minimum Bid Price ($)"
                                placeholder="Enter amount" 
                                value={minimumPrice} 
                                errors={errors} 
                                onChange={(e:any)=>setMinimumPrice(e.target.value)} />

                            <InputField 
                                wrapperClass="mb-2" 
                                type="text" 
                                name="minimumBidIncrement"
                                label="Minimum Bid Increment Amount ($)"
                                placeholder="Enter amount" 
                                value={minimumBidIncrement} 
                                errors={errors} 
                                onChange={(e:any)=>setMinimumBidIncrement(e.target.value)} />
                        </>
                        :
                        <></>
                    }

                    <DateTimeField 
                        wrapperClass="mb-2" 
                        name="startTime"
                        label={dropTypeId && (dropTypeId===1||dropTypeId===3)? "Auction Start Time" : "Drop Start Time"}
                        placeholder="Select start time" 
                        selected={startTime} 
                        errors={errors}
                        timeInputLabel="Time:" 
                        dateFormat={'MM/dd/yyyy h:mm aa'} 
                        required={true} 
                        minDate={new Date()} 
                        monthsShown={1} 
                        showTimeInput={true} 
                        shouldCloseOnSelect={false}
                        onChange={(e:any)=>setStartTime(e)} />

                    {
                        dropTypeId && (dropTypeId===1||dropTypeId===3)?
                            <DateTimeField 
                                wrapperClass="mb-2" 
                                name="endTime"
                                label={dropTypeId && (dropTypeId===1||dropTypeId===3)? "Auction End Time" : "Drop End Time"}
                                placeholder="Select end time" 
                                selected={endTime} 
                                errors={errors} 
                                timeInputLabel="Time:" 
                                dateFormat={'MM/dd/yyyy h:mm aa'} 
                                required={true} 
                                minDate={new Date()} 
                                monthsShown={1} 
                                showTimeInput={true} 
                                shouldCloseOnSelect={false}
                                onChange={(e:any)=>setEndTime(e)} />
                        :
                        <></>
                    }

                    {
                        dropAttributeList.map((attr:Attribute,index:number)=>{
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
                    <div className={`submit-button mt-2`}>
                        <Button type="primary" aria-disabled>Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        content
    );
};

export default CreateDrop;
