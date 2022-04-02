import { IsValidEmail, Required } from "../rules";

export class LoginFormData {

    @IsValidEmail()
    @Required({message: "Email is required."})
    public emailId: string;

    @Required({message: "Password is required."})
    public password: any;

    constructor($emailId: string, $password: string){
        this.emailId = $emailId;
        this.password = $password
    }

}