import { alphaNumSpecialRegex, integerRegex, useAppDispatch, useAppSelector } from "@sindric-lib-ui/commons";
import { cancelTokenSource, postData } from "@sindric-lib-ui/commons/lib/api/api";
import { PublicService } from "@sindric-lib-ui/commons/lib/api/service";
import { removeLoader, setLoader } from "@sindric-lib-ui/commons/lib/redux/slices/loader";
import { createPackUrl, getAvailablePackDropsUrl, getDropTypesUrl } from "@sindric-lib-ui/endpoints";
import moment from "moment";
import React, { useState, useEffect } from "react";

// import { Button, Footer } from "components/scss";

// import { ApiService, cancelTokenSource } from "helper/api/api";
// import { PublicService } from "helper/api/service/public/public.api";
import {Link, useHistory} from "react-router-dom";
import { Button } from "../button";
import { DateTimeField, MultiSelectField, SelectField, TextareaField } from "../components";
import FileInputField from "../fileinputfield";
import InputField from "../InputField";
import UserWrapper from "../user-wrapper";
import { YMD_TIME_FMT } from "../utility";
// import { createPackUrl, getDropTypesUrl, getAvailablePackDropsUrl, getNftPlatformTypeUrl } from "helper/api/api-endpoints";
// import CheckboxField from "components/scss/elements/checkboxfield/CheckboxField";
// import { useAppSelector, useAppDispatch } from "redux/store";
// //import { CreateDropData } from "./CreateDropData";
// import { validate } from "helper/validation/validator";
// import InputField from "components/scss/elements/inputfield/InputField";
// import SelectField from "components/scss/elements/selectfield/SelectField";
// import MultiSelectField from "components/scss/elements/multiselectfield/MultiSelectField";
// import DateTimeField from "components/scss/elements/datetimefield/DateTimeField";
// import TextareaField from "components/scss/elements/textareafield/TextareaField";
// import FileInputField from "components/scss/elements/fileinputfield";
// import { isErrorExists, YMD_TIME_FMT, integerRegex, decimalRegex, alphaNumSpecialRegex} from "helper/utility";

// import Layout2 from "../../layout-2";
// import { Country, State, City }  from 'country-state-city';
// import moment from 'moment';
// import { setLoader, removeLoader } from "redux/slices/loader";
// import UserWrapper from "../user-wrapper";
// import Layout3 from "pages/layout-3";


const CreatePack: React.FC = () => {

    const dispatch = useAppDispatch();

    const [packId, setPackId] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [startTime, setStartTime] = useState<any>(new Date()); 
    const [endTime, setEndTime] = useState<any>(new Date());

    const [dropIdList, setDropIdList] = useState<any[]>([]); 
    const [noOfQuantity, setNoOfQuantity] = useState<number>(0);
    const [noOfCopies, setNoOfCopies] = useState<number>(0);
    const [buyItNowPrice, setBuyItNowPrice] = useState<number>(0);

    //const [nftPlatformType, setNftPlatformType] = useState<string>("");
    const [dropTypeId, setDropTypeId] = useState<number>(-1);
    const [royaltyCategory, setRoyaltyCategory] = useState<any>();

    const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState<any>("");
    const [assetBannerImageUrl, setAssetBannerImageUrl] = useState("");
    const [assetBannerImage, setAssetBannerImage] = useState<any>("");

    const [toUpdate, setToUpdate] = useState<boolean>(false);

    const [allDropTypes, setAllDropTypes] = useState<any[]>([]);
    const [allPackDrops, setAllPackDrops] = useState<any[]>([]);
    //const [allNftPlatformTypes, setAllNftPlatformTypes] = useState<any[]>([]);
    const [royaltyCategories, setRoyaltyCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const history = useHistory();
    
    const {user} = useAppSelector((state) => state)


    useEffect(() => {

        const cancelTokenSrc = cancelTokenSource();
        let conf: any = {
          cancelToken: cancelTokenSrc.token
        }

        dispatch(setLoader("loadingPack"))

        Promise.all([
            getAllDropTypes(),
            //getAllNftPlatformTypes(),
            getAllPackDrops(),
            getRoyaltyCategories(),
        ])
        .then(()=>{
            setLoading(false)
            dispatch(removeLoader("loadingPack"))
        },
        (err)=>{
            setLoading(false)
            dispatch(removeLoader("loadingPack"))
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
            setPackId(respData.packId);
            setDropType({dropTypeId: respData.dropTypeId.toString()});
            setDescription(respData.description);
            setStartTime(moment.utc(respData.startTime, YMD_TIME_FMT).local());
            setEndTime(moment.utc(respData.endTime, YMD_TIME_FMT).local());
            setDropIdList(respData.dropIdList.split(",").map(id=>{return{athleteId:id}}));
            setNoOfQuantity(respData.noOfQuantity);
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

    async function getAllPackDrops(){
        const response:any = await postData(getAvailablePackDropsUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllPackDrops(response.data.map(item=>{
                    return {value: item.dropId, label: item.title}
                }));
            }
            else{
                setErrors({common:[response.errorDesc]});
            }
        }
        else{
            setErrors({common:["Error occurred while getting all pack drops"]});
        }
    }

    async function getAllDropTypes(){
        const response:any = await postData(getDropTypesUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllDropTypes(response.data.filter(dt=>dt.dropTypeId!==1).map(item=>{
                    return {value: item.dropTypeId, label: item.dropTypeName}
                }));
            }
            else{
                setErrors({common:[response.errorDesc]});
            }
        }
        else{
            setErrors({common:["Error occurred while getting drop types"]});
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

    /*async function getAllNftPlatformTypes(){
        const response:any = await postData(getNftPlatformTypeUrl, null);

        if(response){
            if(response.status === 'SUCCESS'){
                setAllNftPlatformTypes(response.data.map(item=>{
                    return {value: item.nftPlatformType, label: item.nftPlatformType}
                }));
            }
            else{
                setErrors({common:[response.errorDesc]});
            }
        }
        else{
            setErrors({common:["Error occurred while getting NFT platform types"]});
        }
    }*/

    const handleDropType = (e: any) => {
        const val = e.value;
        const valStr = val+'';
        const date = moment().add(5,'year');
        setDropTypeId(val);

        /*if(valStr === "1"){ //Auction 1 Qty scenario with start and end time
          //Auction
          setNoOfQuantity("1");
          setStartTime(new Date());
          setEndTime(new Date());
        }
        else */
        if(valStr === "2"){ //Fixed buy it now Qty scenario with start and no end time
          //Fixed
          setNoOfQuantity(0);
          setNoOfCopies(0);
          setStartTime(new Date());
          setEndTime(date.toDate());
        }
        else if(valStr === "3"){ //Infinite Qty Time window with start and end time
          //TimeWindow
          setNoOfQuantity(0);
          setNoOfCopies(0);
          setStartTime(new Date());
          setEndTime(new Date());
        }
        setErrors({});
    }


    const validateForm = (event?:any) =>{
        let result:{[key:string]: any} = {}, now = new Date();

        if(!title || title.trim().length===0){
          result.title = ["Please enter Pack Title"];
        }
        else if(title && !alphaNumSpecialRegex.test(title)){
            result.title = ["Please enter valid Pack Title"];
        }

        if(!dropTypeId || dropTypeId===-1 || !integerRegex.test(dropTypeId+'')){
          result.dropTypeId = ["Please select a Pack Type."];
        }
        if(!description || description.trim().length===0){
          result.description = ["Please enter valid Description."];
        }

        if(!royaltyCategory || !royaltyCategory.value){
          result.royaltyCategory = ["Please select valid Royalty Category"];
        }

        if(!dropIdList || dropIdList.length===0){
          result.dropIdList = ["Please select a drop."];
        }
        if(!buyItNowPrice || Number(buyItNowPrice) <=0 ){
            result.buyItNowPrice = ["Please enter valid buy now price"];
        }
        //if(!nftPlatformType){
        //  result.nftPlatformType = ["Please enter valid NFT Type."];
        //}

        /*if(dropTypeId && dropTypeId===1){
          if(!noOfQuantity || parseInt(noOfQuantity) != 1 ){
            result.noOfQuantity = ["Please enter valid quantity. For Auction only 1 quantity is allowed"];
          }
          if(!noOfCopies || parseInt(noOfCopies) != 1 ){
            result.noOfCopies = ["Please enter valid number of copies. For Auction only 1 copy is allowed"];
          }

          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Auction Start Time."];
          }
          if(!endTime|| (startTime && endTime.getTime() <= startTime.getTime())){
            result.endTime = ["Please select valid Auction End Time."];
          }
        }*/

        if(dropTypeId && dropTypeId===2){
          if(!noOfCopies || Number(noOfCopies)<1 ){
            result.noOfCopies = ["Please enter valid No. of copies."];
          }
          if(!noOfQuantity || Number(noOfQuantity)<1){
            result.noOfQuantity = ["Please enter valid number of NFTs."];
          }
          else if(dropIdList && dropIdList.length< Number(noOfQuantity)){
            result.noOfQuantity = ["Number of NFTs should be less than or equal to # of drops selected"];
          }
          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Pack Start Time."];
          }
        }

        if(dropTypeId && dropTypeId===3){
          if(!startTime){ //|| startTime.getTime() <= now.getTime()){
            result.startTime = ["Please select valid Pack Start Time."];
          }
          if(!endTime|| (startTime && endTime.getTime() <= startTime.getTime())){
            result.endTime = ["Please select valid Pack End Time."];
          }
        }

        if(!thumbnailImage){
          result.thumbnailImage = ["Please upload a pack thumbnail image."];
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
            //packId : 0,
            title : title,
            dropTypeId : dropTypeId,
            description : description,
            noOfQuantity : Number(noOfQuantity)>0? Number(noOfQuantity) : null,
            noOfCopies : Number(noOfCopies)>0? Number(noOfCopies) : null,
            //nftPlatformType : nftPlatformType,
            dropIdList : dropIdList? dropIdList.map(a=>a.value) : [],
            startTime : moment(startTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
            endTime : moment(endTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
            buyItNowPrice: buyItNowPrice,
            royaltyCategoryId: royaltyCategory&&royaltyCategory.value? royaltyCategory.value : null,            
        };

        setSaving(true);
        dispatch(setLoader("loadingPack"))
        let formData = new FormData();
        formData.append("pack", JSON.stringify(data));
        formData.append("thumbnailImage", thumbnailImage);
        if(assetBannerImage){
          formData.append("assetBannerImage", assetBannerImage);
        }

        let response = await postData(createPackUrl, formData, {headers:{'Content-Type': 'multipart/form-data'}});

        dispatch(removeLoader("loadingPack"))
        setSaving(false);
        if(response){
            if(response.status === "SUCCESS"){
              const stateData: any = {
                    status: true,
                    message1: null,
                    message2: `Pack Creation Successful`,
                    btnUrl1: '/user/create-pack',
                    btnText1: `Create Another Pack`,
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


    const content = (
        <div className={`${`form_wrapper_2`} ${`create_drop_form`} form_wrapper`}>
            <h1 className="form_heading">Create Pack</h1>
            <div className={`form_container mt-3`}>
                <form onSubmit={handleSubmit} noValidate>

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
                        label="Pack Title"
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

                    <SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="dropTypeId"
                        label="Pack Type"
                        value={allDropTypes? allDropTypes.find(cs=>cs.dropTypeId===dropTypeId) : null} 
                        errors={errors}
                        options={allDropTypes} 
                        optionText="dropTypeName"
                        optionValue="dropTypeId"
                        onChange={(e:any)=>handleDropType(e)} />

                    {/*<SelectField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="nftType"
                        label="NFT Platform Type"
                        value={allNftPlatformTypes? allNftPlatformTypes.find(cs=>cs.nftPlatformType===nftPlatformType) : null} 
                        errors={errors} 
                        options={allNftPlatformTypes}
                        optionText="nftPlatformType"
                        optionValue="nftPlatformType"
                        onChange={(e:any)=>setNftPlatformType(e.value)} />*/}

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
                        name="dropIdList"
                        label="Select Drops(s)"
                        value={dropIdList} 
                        errors={errors} 
                        options={allPackDrops}
                        optionText="label"
                        optionValue="value"
                        onChange={(e:any)=>setDropIdList(e)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="number" 
                        min="1" 
                        step="0.01" 
                        name="buyItNowPrice"
                        label="Buy It Now Price ($)"
                        placeholder="Enter price"
                        required={true} 
                        disabled={false}
                        value={buyItNowPrice} 
                        errors={errors} 
                        onChange={(e:any)=>setBuyItNowPrice(e.target.value)} />

                    <InputField 
                        wrapperClass="mb-2" 
                        type="text" 
                        name="noOfQuantity"
                        label="NFTs Per Pack"
                        placeholder=""
                        required={true} 
                        value={noOfQuantity} 
                        errors={errors} 
                        onChange={(e:any)=>setNoOfQuantity(e.target.value)} />

                    {
                        dropTypeId===2?
                            <InputField 
                                wrapperClass="mb-2" 
                                type="text" 
                                name="noOfCopies"
                                label="No. of copies"
                                placeholder="# of copies" 
                                value={noOfCopies}
                                required={true} 
                                errors={errors} 
                                onChange={(e:any)=>setNoOfCopies(e.target.value)} />
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

                    <div className={`submit-button mt-2`}>
                        <Button type="primary" aria-disabled>Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );

    return content;
};

export default CreatePack;
