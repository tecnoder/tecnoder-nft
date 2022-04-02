export const createUserUrl = "/user-management/create-user"
export const verifyUserUrl = (vid: string) => `/user-management/verify-user?vid=${vid}`
export const registerUserUrl = "/user-management/register-user"
export const loginUrl = "/user-management/login"
export const getSessionUserUrl = "/user-management/get-session-user"
export const resetPasswordUrl = '/user-management/reset-password';
export const sendResetPasswordVerificationEmailUrl = (emailId: string) => `/user-management/send-reset-password-verification-email?emailId=${emailId}`;
export const reSendRegistrationEmailUrl = (emailId: string) => `/user-management/re-send-registration-email?emailId=${emailId}`;
export const verifyResetPasswordUrl = (vid: string) => `/user-management/verify-reset-password?vid=${vid}`;
export const getQR = "/user-management/get-qr";
export const changeTwoFactorAuthenticationUrl = "/user-management/change-two-factor";
export const validateTotpUrl = "/user-management/validate-totp";

export const logoutUrl = "/user-management/sign-out"
export const updateUserDetailsUrl = "/rest/user/update-user-details"

export const getAthleteRolesUrl = "/public/get-athlete-roles";
export const getNftPlatformTypesUrl = "/public/getNftPlatformType";
export const getAllAthleteUrl = "/public/getAllAthlete";
export const contactUsUrl = "/public/contact-us";
export const getAthleteByIdUrl = (athleteId:number) => `/public/getAthleteById?athleteId=${athleteId}`;
export const searchByUserProfileUrl = (profileName:string) => `/public/search-users-by-profile?profileName=${profileName}`;
export const subscribeUrl = (emailId:string, status: string) => `/public/subscribe?emailId=${emailId}&status=${status}`;
export const getPackAndDropsForSaleUrl = (pgNo:number, pgSize: number) => `/public/get-packs-and-drops-for-sale?pageNumber=${pgNo}&pageSize=${pgSize}`;
export const getPackAndDropsForSaleCount = `/public/get-packs-and-drops-for-sale-count`;

export const createAthleteUrl = "/rest/admin/create-athlete"
export const getAllAthletesUrl = "/public/get-athletes";
export const updateAthleteUrl = "/rest/admin/update-athlete";
export const deleteAthleteUrl = (athleteId:string) =>  '/rest/admin/delete-athlete?athleteId='+athleteId;
export const getAthleteCollectionsUrl = (athleteId:string) => '/rest/admin/getAthleteConnections?athleteId='+athleteId;
export const deleteDropUrl = (dropId:string) => '/rest/admin/delete-drop?dropId='+dropId;

export const createDropUrl = "/rest/admin/create-drop"
export const getAvailablePackDropsUrl = "/rest/admin/get-nonpack-drops";
export const getDropTypesUrl = "/public/get-drop-type";
export const getNftPlatformTypeUrl = "/public/get-nft-platform-type";

export const createPackUrl = "/rest/admin/create-pack";
export const deletePackUrl = (dropId:string) => '/rest/admin/delete-pack='+dropId;

export const getUserDetailsURL = "/rest/user/get-user-details";
export const getAllMyTokensURL = "/rest/user/get-my-tokens";
export const getMyTokenHistoryUrl = "/rest/user/get-my-token-history";
export const sellTokenUrl = "/rest/user/sell-token";
export const cancelSecondarySaleUrl = "/rest/user/cancel-secondary-sale";
export const getMyBalance = (param: string) => `/rest/user/get-my-balance?currency=${param}`;
export const getCoinListUrl = () => `/public/get-coin-list`;
export const getMyAddressUrl = () => '/rest/user/get-my-address';
export const withdrawUrl = () => '/rest/user/withdraw';
export const updateUserBalanceUrl = () => '/rest/user/deposit';

export const getTokensOnSaleUrl = (sortBy: string, sortOrder: string) => `/public/get-tokens-on-sale?sortByType=${sortBy}&sortByOrder=${sortOrder}`;
export const getTokensOnSaleWithFilterUrl = (pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) => `/public/get-tokens-on-sale-with-filters?pageNumber=${pageNumber}&pageSize=${pageSize}&sortByType=${sortBy}&sortByOrder=${sortOrder}`;
export const getTokenHistoryUrl = (platformTokenId:string) =>  "/public/get-token-history?platformTokenId="+platformTokenId;
