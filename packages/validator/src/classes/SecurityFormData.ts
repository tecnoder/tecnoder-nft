import { Required } from "../rules";

export class SecurityFormData {

    @Required({message: "Password is required."})
    public password: string;

    @Required({message: "Confirm Password is required."})
    public confirmPassword: string;



    constructor($password: string, $confirmPassword: string){
        this.password = $password
        this.confirmPassword = $confirmPassword
    }

}