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

const ClubService = {

    getPacksAndDropsForSaleByAccessId: async function(accessId: any, pgNo: any, pgSize: any, sortBy: string, sortOrder: string){
        try {
            const response = await postData(`/rest/club/get-packs-and-drops-for-sale-by-access-id?accessId=${accessId}&pageNumber=${pgNo}&pageSize=${pgSize}&sortByType=${sortBy}&sortByOrder=${sortOrder}`, null);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

}

export default ClubService

export { ClubService }