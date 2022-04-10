import { Required } from "../rules";

export class RegisterFormDataMercury {

    @Required({message: "Profile Name is required."})
    public profileName: string;

    @Required({message: "Password is required."})
    public password: string;

    @Required({message: "Confirm Password is required."})
    public confirmPassword: string;

    @Required({message: "Country is required."})
    public country: string;

    @Required({message: "State is required."})
    public state: string;

    constructor($profileName: string, $password: string, $confirmPassword: string, $country: string, $state: string){
        this.profileName = $profileName
        this.password = $password
        this.confirmPassword = $confirmPassword
        this.country = $country
        this.state = $state
    }

}