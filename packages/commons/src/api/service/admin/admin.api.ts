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

const AdminService = {

    createAthlete: async function(data: any, headers: any){
        try {
            const response = await postData(`/rest/admin/create-athlete`, data, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    
    
    createDrop: async function(data: any, headers: any){
        try {
            const response = await postData(`/rest/admin/create-drop`, data, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    createPack: async function(data: any, headers: any){
        try {
            const response = await postData(`/rest/admin/create-pack`, data, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    deleteAthlete: async function(id: any, headers: any){
        try {
            const response = await postData(`/rest/admin/delete-athlete?dropId=${id}`, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

    deleteDrop: async function(id: any, headers: any){
        try {
            const response = await postData(`/rest/admin/delete-drop?dropId=${id}`, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

    deletePack: async function(id: any, headers: any){
        try {
            const response = await postData(`/rest/admin/delete-pack?dropId=${id}`, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

    getNonpackDrops: async function(){
        try {
            const response = await postData(`/rest/admin/get-nonpack-drops`);
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

    updateAthlete: async function(data:any, headers: any){
        try {
            const response = await postData(`/rest/admin/update-athlete`, data, {headers:headers});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

}

export default AdminService
export { AdminService }