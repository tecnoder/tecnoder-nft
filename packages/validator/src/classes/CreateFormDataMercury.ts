import { IsValidEmail, Required } from "../rules";

export class CreateFormDataMercury {

    @Required({message: "First Name is required."})
    public firstName: string;

    @Required({message: "Last Name is required."})
    public lastName: string;

    @IsValidEmail()
    @Required({message: "Email is required."})
    public emailId: string;

    constructor($firstName: string, $lastName: string, $emailId: string){
        this.firstName = $firstName;
        this.lastName = $lastName;
        this.emailId = $emailId;
    }

}