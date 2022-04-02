import { IsValidEmail, Required } from "../rules";

export class RegisterFormData {

    @IsValidEmail()
    @Required({message: "Email is required."})
    public emailId: string;

    @Required({message: "Password is required."})
    public password: string;

    @Required({message: "Confirm Password is required."})
    public confirmPassword: string;

    @Required({message: "First Name is required."})
    public firstName: string;

    @Required({message: "Last Name is required."})
    public lastName: string;

    @Required({message: "Profile Name is required."})
    public profileName: string;

    @Required({message: "Country is required."})
    public country: string;

    @Required({message: "State is required."})
    public state: string;

    constructor($emailId: string, $password: string, $confirmPassword: string, $firstName: string, $lastName: string, $profileName: string, $country: string, $state: string){
        this.profileName = $profileName
        this.password = $password
        this.confirmPassword = $confirmPassword
        this.country = $country
        this.state = $state
        this.firstName = $firstName;
        this.lastName = $lastName;
        this.emailId = $emailId;
    }

}