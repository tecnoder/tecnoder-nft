import { postData } from "../../api";

class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: any) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const PublicService = {

    getAthleteRoles: async function(conf: any){
        try {
            const response = await postData(`/public/getAthleteRoles`, null, conf);
            if(response.data){
                return response.data
            }
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getDropTypes: async function(){
        try {
            const response = await postData(`/public/get-drop-type`, null);
            if(response && response.data){
                return response.data||[];
            }
            return [];
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getCoinList: async function(){
        try {
            const response = await postData(`/public/get-coin-list`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getNftPlatformType: async function(conf: any){
        try {
            const response = await postData(`/public/getNftPlatformType`, null, conf);
            if(response.data){
                return response.data
            }
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getAllAthletes: async function(){
        try {
            const response = await postData(`/public/get-athletes`, null);
            if(response && response.data){
                return response.data
            }
            return null;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getAllAthletesDetails: async function(){
        try {
            const response = await postData(`/public/get-athletes-details`, null);
            return response? (response.data||[]) : [];
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getPacksAndDropsForSale: async function(pgNo: any, pgSize: any, sortBy: string, sortOrder: string){
        try {
            const response = await postData(`/public/get-packs-and-drops-for-sale?pageNumber=${pgNo}&pageSize=${pgSize}&sortByType=${sortBy}&sortByOrder=${sortOrder}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }

    },

    getAthleteById: async function(id:any){
        try {
            const response = await postData(`/public/get-athlete-by-id?athleteId=${id}`, null);
            return response
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    
    getDropsByAthleteId: async function(id:any, pgNo:any, pgSize:any){
        try {
            const response = await postData(`/public/get-packs-and-drops-for-sale-by-athlete-id?athleteId=${id}&pageNumber=${pgNo}&pageSize=${pgSize}`, null);
            return response
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getDropsByPackId: async function(id:any){
        try {
            const response = await postData(`/public/get-drops-by-pack-id?packId=${id}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getDropByDropId: async function(id:any){
        try {
            const response = await postData(`/public/get-drop-by-drop-id?dropId=${id}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getPackByPackId: async function(id:any){
        try {
            const response = await postData(`/public/get-pack-by-pack-id?packId=${id}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getDropSoldItemsByDropId: async function(id:any){
        try {
            const response = await postData(`/public/get-drop-sold-items?dropId=${id}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getBiddingHistory: async function(id:any, packId:any){
        try {
            const response = await postData(`/public/get-bidding-history?dropId=${id}&packId=${packId}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getAthletesByDropId: async function(id:any){
        try {
            const response = await postData(`/public/get-athlete-by-drop-Id?dropId=${id}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getAthletesDropCount: async function(){
        try {
            const response = await postData(`/public/get-athlete-drops-count`, null);
            return response? response.data : null;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getAllTiers: async function(){
        try {
            const response = await postData(`/public/get-drop-tier`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getOriginalTransHash: async function(platformTokenId: string){
        try {
            const response = await postData(`/public/get-original-trans-hash?platformTokenId=${platformTokenId}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getDropRoyaltiCategory: async function(){
        try {
            const response = await postData(`/public/get-drop-royalty-category`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
}

export default PublicService

export { PublicService }