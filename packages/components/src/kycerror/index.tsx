import React, {useEffect, useState} from "react";
// import {isLoggedIn, isKycIdVerified, isKycDocVerified, isKycIdPending, 
// 	isKycDocPending, isKycIdFailed, isKycDocFailed, KycStatus, KycType, gotoIdentityApp} from "helper/utility";

// import { Button } from "components/scss";
import { useParams, useHistory, useLocation, useRouteMatch } from "react-router-dom";

// import { useAppSelector, useAppDispatch } from "redux/store";

// import { UserService } from "helper/api/service/user/user.api";
// import { setLoader, removeLoader } from "redux/slices/loader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "@sindric-lib-ui/commons";
import { removeLoader, setLoader } from "@sindric-lib-ui/commons/lib/redux/slices/loader";
import { UserService } from "@sindric-lib-ui/commons/lib/api/service";
import { getUserDetails } from "@sindric-lib-ui/commons/lib/redux/slices/user";
import { gotoIdentityApp, isKycDocFailed, isKycDocPending, isKycDocVerified } from "../utility";
import { Button } from "../button";
// import { verifyKycStatus } from "redux/slices/kycstatus";
// import { getUserDetails } from "redux/slices/user";


type KycErrorProps = {
  verifyType: string;
  errorCode?: number;
  errorDesc?: string;
  show?: boolean;
};


const KycError: React.FC<KycErrorProps> = ({verifyType, errorCode, errorDesc, show}) => {

    const {user, kycStatus} = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const { url } = useRouteMatch();

    /*useEffect(() => {
        if (props.location.search.includes("error=5101") || props.location.pathname.includes("error=5101")) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    }, [props.location.search, props.location.pathname])*/

    const checkKycDocVerificationStatus = async (e:any)=>{
    	dispatch(setLoader("checkkyc"))
        const response = await UserService.checkDocVerificationStatus();
        if(response && response.status==='SUCCESS'){
            if(response.data==='nomatch'||response.data==='match'){
            	dispatch(getUserDetails());
            }
        }
        dispatch(removeLoader("checkkyc"))
    }

    const gotoKyc = async (e:any)=>{
        e.preventDefault();
        dispatch(setLoader("gotokyc"))
        gotoIdentityApp(
        	url, 
        	{
        		verifyType: verifyType
        	},
        	user
    	)
        .then(resp=>{
            //DO Nothing
            if(resp && resp.status !== 'SUCCESS'){
                dispatch(removeLoader("gotokyc"));
                //setErrors({common: [resp? resp.errorDesc : "Error occured while getting token"]});
            }
        }, err=>{
            dispatch(removeLoader("gotokyc"));
            //setError(err && err.message? err.message : "Error occured while getting token");
        })
    }

    //useEffect(()=>{
    	//if(isLoggedIn(user) && kycStatus.status==='LOADING'){
    	//	dispatch(verifyKycStatus());
    	//}
    //}, [user, kycStatus])

	/*return !user||isKycIdVerified(user) && verifyType== KycType.ID || isKycDocVerified(user) && verifyType== KycType.DOC?
		<></>
		:
		(
			<div className={"mb-3 " + `drop_detail_wrapper` +" "+ `text_center`}>
		        <div>
		            <FontAwesomeIcon className="mr-1" icon={["fas", "exclamation-triangle"]} /> 
		            {verifyType===KycType.ID?
		            	(isKycIdPending(user)? 
		                `Your KYC identity verification is still pending. If you have any queries please contact us at ${process.env.REACT_APP_WELCOME_EMAIL}.`
		                	: 'Federal require to get KYC Identity verification done before bid or buy any drop or add fund.')
		                : isKycDocPending(user)? `Your KYC document verification is still pending. If you have any queries please contact us at ${process.env.REACT_APP_WELCOME_EMAIL}.`
		                    	: 'Federal require to get KYC document verification done before any withdrawl of fund.'}
		        </div>
		        {
		        	!isKycIdPending(user) && !isKycDocPending(user)?
			        	<div className={`${`drop_detail_button`} mt-1 mb-5`}>
			            	<Button type="primary" className="ml-1 mr-1" onClick={gotoKyc}>Continue to KYC</Button>
			        	</div>
			        	:
			        	<></>
		        }
		    </div>
	    )*/

	    //`${errorDesc}`

	return !user||isKycDocVerified(user)||show===false?
			<></>
			:
			(
				<div className={"mb-3 center"}>
			        <div>
			            <FontAwesomeIcon className="mr-1" icon={["fas", "exclamation-triangle"]} /> 
			                {
			                	isKycDocPending(user)? 
			                		`Your KYC document verification is still pending. If you have any queries please contact us at ${process.env.REACT_APP_WELCOME_EMAIL}.`
			                		: isKycDocFailed(user)? 
			                			`Your KYC document verification failed, please re-submit. If you have any queries please contact us at ${process.env.REACT_APP_WELCOME_EMAIL}.`
			                    		: 
			                    		`Federal regulation requires you to get KYC document verification done before any withdrawal of funds.`
			                }
			        </div>
	        		<div className={`mt-1`}>
	            		{user && isKycDocPending(user)?
	            			<Button type="primary w-auto" className="ml-1 mr-1" onClick={checkKycDocVerificationStatus}>Re-check Status</Button>
	            			: isKycDocFailed(user)?
	            				<Button type="primary w-auto" className="ml-1 mr-1" onClick={gotoKyc}>Re-submit KYC</Button>
	            				:
	            				<Button type="primary w-auto" className="ml-1 mr-1" onClick={gotoKyc}>Continue to KYC</Button>
	            		}
	        		</div>
			    </div>
		    )

}

export default KycError;

