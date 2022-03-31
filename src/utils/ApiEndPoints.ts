export const createUserUrl = () => '/user-management/create-user-one-step';
export const loginUrl = () => '/user-management/login';
export const getSessionUserUrl = () => '/user-management/get-session-user';
export const getUserDetailsUrl = () => '/rest/user/get-user-details';
export const verifyUserUrl = (vid: string) => `/user-management/verify-user-one-step?vid=${vid}`
export const sendResetPasswordVerificationEmailUrl = (emailId: string) => `/user-management/send-reset-password-verification-email?emailId=${emailId}`;
export const reSendRegistrationEmailUrl = (emailId: string) => `/user-management/re-send-registration-email?emailId=${emailId}`;
export const verifyResetPasswordUrl = (vid: string) => `/user-management/verify-reset-password?vid=${vid}`;

export const validateTotpUrl = "/user-management/validate-totp";


export const getDropTypeUrl = () => '/public/get-drop-type';
export const getContentCreatorTypeUrl = () => '/public/getContentCreatorType';
export const getNftPlatformTypeUrl = () => '/public/getNftPlatformType';
export const getAllCOntentCreatorUrl = () => '/public/getAllContentCreator';
export const getDropByDropId = (param: any) => `/public/get-drop-by-drop-id/?dropId=${param}`;
export const getTopDrops = (pageNumber:any, pageSize:any) => `/public/get-packs-and-drops-for-sale?pageNumber=${pageNumber}&pageSize=${pageSize}`;
export const getAllTokensForSaleUrl = () => '/public/get-tokens-on-sale';
export const getSecondaryMarketHistoryUrl = (pageNumber:any, pageSize:any) => `/public/getSecondaryMarketHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`;
export const getBiddingHistoryUrl = (id: any) => `/public/getBiddingHistory?dropId=${id}`;
export const getTokensForSaleByTokenIdUrl = (id: any) => `/public/getTokensForSaleByTokenId?tokenId=${id}`;
export const getTokenHistoryUrl = (id: any) => `/public/get-token-history?platformTokenId=${id}`;
export const getCoinListUrl = () => `/public/getCoinDetails`;
export const isValidateAddressUrl = (address: any, addressType: any) => `/public/isValidateAddress?address=${address}&addressType=${addressType}`;
export const searchByUserProfileUrl = (profileName:string) => `/public/search-users-by-profile?profileName=${profileName}`;

export const getSignoutUrl = () => '/rest/user/signOut';
export const createDropUrl = () => '/rest/admin/createDrop';
export const createContentCreator = () => '/rest/admin/createContentCreator';
export const createContentCreatorType = () => '/rest/admin/createContentCreatorType';
export const getAllCryptoKicksProductLineUrl = () => '/rest/admin/getAllCryptoKicksProductLine';
export const getMyBalance = (param: string) => `/rest/user/getMyBalance?currency=${param}`;
export const submitOrder = () => '/rest/order/submitOrder';
export const getAllMyTokensUrl = () => '/rest/user/getAllMyTokens';
export const setForSecondarySaleUrl = () => '/rest/user/secondarySale';
export const cancelSecondarySaleUrl = () => '/rest/user/cancelSecondarySale';
export const getMyAddressUrl = () => '/rest/user/getMyAddress';
export const withdrawUrl = () => '/rest/user/withdraw';

export const deleteDropUrl = (dropId : any) => `/rest/admin/deleteDrop?dropId=${dropId}`;

export const getConfigUrl = (configName: string) => `/public/getConfig?configName=${configName}`;
export const getTokensSaleHistoryUrl = () => `/public/getTokensSaleHistory`;

export const getTokenDateMintedAndTransHashUrl = (id: any) => `/public/getTokenDateMintedAndTransHash?tokenId=${id}`;
export const resetPasswordUrl = () => '/auth/resetPassword';

export const getAllMyExternalTokensUrl = ()=>'/rest/user/getAllMyExternalTokens';

export const updateUserBalanceUrl = () => '/rest/user/depositUsd';
export const getCallApiUrl = () => '/exapi/map/callApi';

export const insertExternalTransAuditUrl = ()=> '/rest/user/insertExternalTransAudit';
export const updateExternalTransAuditUrl = ()=> '/rest/user/updateExternalTransAudit';
