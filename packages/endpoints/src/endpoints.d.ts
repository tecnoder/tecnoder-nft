export declare const createUserUrl = "/user-management/create-user";
export declare const verifyUserUrl: (vid: string) => string;
export declare const registerUserUrl = "/user-management/register-user";
export declare const loginUrl = "/user-management/login";
export declare const getSessionUserUrl = "/user-management/get-session-user";
export declare const resetPasswordUrl = "/user-management/reset-password";
export declare const sendResetPasswordVerificationEmailUrl: (emailId: string) => string;
export declare const reSendRegistrationEmailUrl: (emailId: string) => string;
export declare const verifyResetPasswordUrl: (vid: string) => string;
export declare const getQR = "/user-management/get-qr";
export declare const changeTwoFactorAuthenticationUrl = "/user-management/change-two-factor";
export declare const validateTotpUrl = "/user-management/validate-totp";
export declare const logoutUrl = "/user-management/sign-out";
export declare const updateUserDetailsUrl = "/rest/user/update-user-details";
export declare const getAthleteRolesUrl = "/public/get-athlete-roles";
export declare const getNftPlatformTypesUrl = "/public/getNftPlatformType";
export declare const getAllAthleteUrl = "/public/getAllAthlete";
export declare const contactUsUrl = "/public/contact-us";
export declare const getAthleteByIdUrl: (athleteId: number) => string;
export declare const searchByUserProfileUrl: (profileName: string) => string;
export declare const subscribeUrl: (emailId: string, status: string) => string;
export declare const getPackAndDropsForSaleUrl: (pgNo: number, pgSize: number) => string;
export declare const getPackAndDropsForSaleCount = "/public/get-packs-and-drops-for-sale-count";
export declare const createAthleteUrl = "/rest/admin/create-athlete";
export declare const getAllAthletesUrl = "/public/get-athletes";
export declare const updateAthleteUrl = "/rest/admin/update-athlete";
export declare const deleteAthleteUrl: (athleteId: string) => string;
export declare const getAthleteCollectionsUrl: (athleteId: string) => string;
export declare const deleteDropUrl: (dropId: string) => string;
export declare const createDropUrl = "/rest/admin/create-drop";
export declare const getAvailablePackDropsUrl = "/rest/admin/get-nonpack-drops";
export declare const getDropTypesUrl = "/public/get-drop-type";
export declare const getNftPlatformTypeUrl = "/public/get-nft-platform-type";
export declare const createPackUrl = "/rest/admin/create-pack";
export declare const deletePackUrl: (dropId: string) => string;
export declare const getUserDetailsURL = "/rest/user/get-user-details";
export declare const getAllMyTokensURL = "/rest/user/get-my-tokens";
export declare const getMyTokenHistoryUrl = "/rest/user/get-my-token-history";
export declare const sellTokenUrl = "/rest/user/sell-token";
export declare const cancelSecondarySaleUrl = "/rest/user/cancel-secondary-sale";
export declare const getTokensOnSaleUrl: (sortBy: string, sortOrder: string) => string;
export declare const getTokensOnSaleWithFilterUrl: (pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) => string;
export declare const getTokenHistoryUrl: (platformTokenId: string) => string;
