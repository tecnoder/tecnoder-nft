// import LayoutPmt from "pages/layout-pmt";
// import Layout2 from "pages/layout-2";
// import Layout3 from "pages/layout-3";
// import { Button } from "components/scss";

import React, { useEffect, useState } from "react";
// import { setLoader, removeLoader } from "redux/slices/loader";
// import { DebounceInput } from "react-debounce-input";
// import {UserService} from "helper/api/service/user/user.api";
// import {PublicService} from "helper/api/service/public/public.api";

// import InputField from "components/scss/elements/inputfield/InputField";
import { useParams, useHistory, useLocation, useRouteMatch } from "react-router-dom";
// import {isLoggedIn, isKycIdPending, isKycIdVerified, isKycDocPending, isKycDocVerified, gotoPaymentApp} from "helper/utility";

// import { useAppSelector, useAppDispatch } from "redux/store";
import moment from 'moment';
import numeral from 'numeral';
// import KycError from "components/scss/kycerror";
import qs from "qs";
import { gotoPaymentApp, useAppDispatch, useAppSelector } from "@sindric-lib-ui/commons";
import { getCoinList } from "@sindric-lib-ui/commons/lib/redux/slices/misc/coinList";
import { getMyCurrencies } from "@sindric-lib-ui/commons/lib/redux/slices/user/myCurrencies";
import { isKycDocVerified, isKycIdVerified, isLoggedIn } from "../../utility";
import { UserService } from "@sindric-lib-ui/commons/lib/api/service";
import { removeLoader, setLoader } from "@sindric-lib-ui/commons/lib/redux/slices/loader";
import KycError from "../../kycerror";
import { Button } from "../../button";
// import {getMyCurrencies} from "redux/slices/user/myCurrencies";
// import {getCoinList} from "redux/slices/misc/coinList";


const Wallet: React.FC<{[key:string]: any}> = ({userData}) => {

    let { url } = useRouteMatch();
    const {user, myCurrencies, coinList} = useAppSelector((state) => state);
    const paymentUrl = process.env.REACT_APP_PAYMENT_URL;
    const location = useLocation();
    const dispatch = useAppDispatch()
    const history = useHistory();

    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    //const [myCurrencies, setMyCurrencies] = useState<any[]>([]);
    const [showfundView, setShowfundView] = useState<any>(false);
    const [pageList, setPageList] = useState<any>([]);
    const [fundTransferSttaus, setFundTransferStatus] = useState<any>({});
    //const [coinList, setCoinList] = useState<any>({});
    const [fundData, setFundData] = useState<any>({});
    const [myAddress, setMyAddress] = useState<any>({});
    const [isAddressCopied, setIsAddressCopied] = useState<any>(false);
    const [cancelCcPayment, setCancelCcPayment] = useState<any>();
    const [currency, setCurrency] = useState<any>();
    
    const [isAddressValid, setIsAddressValid] = useState<any>({});

    const [usdBalance, setUsdBalance] = useState<any>({});
    const [ethBalance, setEthBalance] = useState<any>({});
    const [btcBalance, setBtcBalance] = useState<any>({});

    const [kycErrorCode, setKycErrorCode] = useState<number>();
    const [kycErrorDesc, setKycErrorDesc] = useState<string>();


    useEffect(() => {
        dispatch(getCoinList());
        dispatch(getMyCurrencies());
    }, []);

    useEffect(() => {
        //getCoinList()
        //getBalances();
        if(myCurrencies && myCurrencies.length){
            setUsdBalance(myCurrencies.find(cur=>cur.currencyType==='USD'));
            setEthBalance(myCurrencies.find(cur=>cur.currencyType==='ETH'));
            setBtcBalance(myCurrencies.find(cur=>cur.currencyType==='BTC'));
        }
    }, [myCurrencies]);


    useEffect(()=>{

        if(user && location && location.search.length>0){
            const {d} = qs.parse(location.search.substring(1));

            if(isLoggedIn(user)){
                history.replace({
                    pathname: url, 
                    search: '', 
                    state:{isActive: true}
                });

                UserService.decryptExchangeData(d)
                .then(resp=>{
                    if(resp && resp.status==="SUCCESS" && resp.data){

                        if(resp.data.status==='SUCCESS'){

                          const stateData: any = 
                            resp.data.currency==='USD'? {
                                    status: true,
                                    message2: `Your ${resp.data.actionType} request submitted for ${numeral(resp.data.amount).format('0,0.[00000000]')} 
                                                    ${resp.data.currency}. You will see the balance updated once the transaction is completed.`,
                                    message1: `${resp.data.actionType.substring(0,1) + resp.data.actionType.substring(1)} request submitted successfully!!`,
                                    btnUrl1: url,
                                    btnText1: 'Ok'
                                }
                                :
                                {
                                    title: '',
                                    status: true,
                                    message2: null,
                                    message1: resp.data.actionType==='deposit'? 
                                                    `Once your transfer is successfully processed, 
                                                            your funds will be available soon in your Wallet`
                                                    : `Your withdraw request submitted for ${numeral(resp.data.amount).format('0,0.[00000000]')} 
                                                            ${resp.data.currency} to address 
                                                            ${resp.data.address.substring(0,4)+'...'+resp.data.address.substring(resp.data.address.length-4)}. 
                                                            You will see the balance updated once the transaction is completed.`,
                                    btnUrl1: url,
                                    btnText1: 'Ok'
                                };

                          history.replace({
                              pathname: '/req/status',
                              state: {
                                  data: stateData
                              }
                          });                            
                        }
                        else if(resp && resp.data && (resp.data.errorCode === "5101" || resp.data.errorCode === "5102")){
                            setKycErrorCode(resp.data.errorCode)
                            setKycErrorDesc(resp.data.errorDesc)
                        }
                    }
                    else{
                        setErrors({common: [resp && resp.errorDesc? resp.errorDesc : 'Failed to process the transaction']});
                    }
                },
                err=>{
                    setErrors({common: [err && err.message? err.message : 'Failed to process the transaction']});
                })
            }
            else{
                gotoLogin();
            }
        }

    }, [user, location])


    const gotoLogin = ()=>{
        history.push({
          pathname: "/login",
          state: { from: url }
        });
    }


    const renderFundView = (actionType: string) => {
        if(isLoggedIn(user)){
            dispatch(setLoader("getExToken"))
            gotoPaymentApp(
                url,
                {
                    currency: currency,
                    actionType: actionType
                }, 
                actionType,
                user
            )
            .then(resp=>{
                //DO Nothing
                if(resp && resp.status !== 'SUCCESS'){
                    dispatch(removeLoader("getExToken"));
                    setErrors({common: [resp? resp.errorDesc : "Error occured while getting token"]});
                }
            }, err=>{
                dispatch(removeLoader("getExToken"));
                setErrors({common: [err && err.message? err.message : "Error occured while getting token"]});
            })

        }else{
            return false
            //gotoLogin();
        }
    }

    const getTotalUsdBalance = () => {
        if(coinList && Object.keys(coinList).length>0){
            const totalUSD = usdBalance.balance;
            const totalETH = ethBalance.balance * coinList["ETH"].price;
            const totalBTC = btcBalance.balance * coinList["BTC"].price;
            return totalUSD + totalETH + totalBTC;
        }
        return 0;
    }

    return (
        <div className="wallet-wrapper">
            
            <KycError verifyType={"DOC"} errorCode={kycErrorCode} errorDesc={kycErrorDesc} show={true} />

            <div className="crnt-blns-blck">
                {showError === true && (<div><i className="fa fa-warning mr-2"></i> Failed to get the wallet balances</div>)}
                {
                    myCurrencies && myCurrencies.length
                        ? myCurrencies.map((cur: any, idx: number) => {
                            return (<div key={idx} className={`crnt-blns-row ${currency===cur.currencyType? 'selected'  :''}`}>
                                <label className="row d-flex align-items-center grid cntr-flex">
                                    <div className="col-sm-6 text-left">
                                        <span className="radio-wrapper">
                                            <input type="radio" id={`cur_radio_${cur.currencyType}`} name="currency" onClick={(e)=>setCurrency(cur.currencyType)} />
                                        </span>
                                        <span className="icon">
                                            <img
                                                src={
                                                    cur.currencyType === "ETH"
                                                        ? "/icons/eth-icon.svg"
                                                        : cur.currencyType === "USD"
                                                            ? "/icons/usd-icon.svg"
                                                            : "/icons/bitcoin-icon.svg"
                                                }
                                                alt="text"
                                            />
                                        </span>
                                        {
                                            cur.currencyType === "ETH"
                                                ? "Ethereum "
                                                : cur.currencyType === "USD"
                                                    ? "US Dollars "
                                                    : "Bitcoin "
                                        }
                                        ({cur.currencyType})
                                    </div>
                                    <div className="col-md-6 text-right d-flex flex-column ml-auto">
                                        <div>
                                            {cur.currencyType === "USD"? '$' : ''} {numeral(cur.balance).format("0,00.[00000000]")} <span className="hide-md">{cur.currencyType}</span>
                                        </div>
                                        <div>
                                            {
                                                cur.currencyType !== "USD"
                                                    ?
                                                    <span className="color-grey hide-md">USD ${numeral(cur.balance * coinList[cur.currencyType].price).format("0,0.[00]")}</span>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                </label>
                            </div>)
                        })
                        : (<div className="crnt-blns-row">
                            <div className="row d-flex align-items-center ">
                                <div className="text-center">
                                    No Data Found!
                                </div>
                            </div>
                        </div>)
                }
                <div className={`crnt-blns-block cntr-flex`}>
                    <div>Total Balance:</div><div className="ml-auto">USD ${numeral(getTotalUsdBalance()).format("0,0.00")}</div>
                </div>

            </div>

            {
                Object.keys(coinList).length>0 && btcBalance && ethBalance && usdBalance?
                <div className={`mt-3 mt-md-5`}>
                    <div className={`${`button_block`}`}>
                        <Button 
                            type="primary"
                            className="ml-1 mr-1"
                            disabled={!currency||currency===""}
                            onClick={() => renderFundView("deposit")}
                        >
                            {!currency||currency===''? 'Select currency to ' : ''} Add Funds
                        </Button>
                        <Button
                            type="primary"
                            className="ml-1 mr-1"
                            disabled={!currency||currency===""||isKycIdVerified(user)===false||isKycDocVerified(user)===false}
                            onClick={() => renderFundView("withdraw")}
                        >
                            {!currency||currency===''? 'Select currency to ' : ''} Withdraw Funds
                        </Button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
    
}

export default Wallet;
