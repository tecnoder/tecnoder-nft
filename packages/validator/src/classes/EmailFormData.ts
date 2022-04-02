import { IsValidEmail, Required } from "../rules";

export class EmailFormData {

    @IsValidEmail()
    @Required({message: "Email is required."})
    public emailId: string;

    constructor($emailId: string){
        this.emailId = $emailId;
    }
}