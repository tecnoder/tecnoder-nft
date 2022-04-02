import { Required } from "../rules";

export class ProfileFormData {

    @Required({message: "Profile Name is required."})
    public profileName: string;

    @Required({message: "First Name is required."})
    public firstName: string;

    @Required({message: "Last Name is required."})
    public lastName: string;

    @Required({message: "Country is required."})
    public country: string;

    @Required({message: "State is required."})
    public state: string;

    constructor($profileName: string, $firstName: string, $lastName: string, $country: string, $state: string){
        this.profileName = $profileName
        this.firstName = $firstName
        this.lastName = $lastName
        this.country = $country
        this.state = $state
    }

}