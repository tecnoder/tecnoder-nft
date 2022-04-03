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

const OrderService = {

    submitOrder: async function(payload: any){
        try {
            const response = await postData(`/rest/order/submit-order`, payload);
            return response
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

}

export default OrderService

export { OrderService }