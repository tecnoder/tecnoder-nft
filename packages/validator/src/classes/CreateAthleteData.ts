import { Required } from "helper/validation/rules/Required";
import { IsValidUrl } from "helper/validation/rules/IsValidUrl";

export class CreateAthleteData {

    //@Required({message: "Athlete Id is required."})
    public athleteId: number;

    @Required({message: "Athlete Name is required."})
    public athleteName: string;

    @Required({message: "Role is required."})
    public roleId: string;

    //@Required({message: "Biograph is required."})
    //public biograph: string;

    @Required({message: "Profile picture is required."})
    public profileImage: File;

    @Required({message: "Profile thumbnail picture is required."})
    public profileThumbnailImage: File;

    public bannerImage: File;

    public athleteAttributeList: any[];

    /*public location: string;

    public isVerified: string;

    @Required({message: "State is required."})
    public state: string;

    @Required({message: "City is required."})
    public city: string;

    @Required({message: "Country is required."})
    public country: string;

    @IsValidUrl()
    public socialMediaUrl: string;

    @IsValidUrl()
    public spotifyUrl: string;

    @IsValidUrl()
    public appleMusicUrl: string;

    @IsValidUrl()
    public websiteUrl: string;

    @IsValidUrl()
    public twitterUrl: string;

    @IsValidUrl()
    public instagramUrl: string;

    public twitterHandle: string;

    public instagramHandle: string;*/

    constructor(
            $athleteId: number,
            $athleteName: string,
            $roleId: string,
            //$biograph: string,
            $profileImage: File,
            $profileThumbnailImage: File,
            $bannerImage: File,
            $athleteAttributeList: any[],
            /*$state: string,
            $city: string,
            $country: string,
            $location: string,
            $isVerified: string,
            $socialMediaUrl: string,
            $spotifyUrl: string,
            $appleMusicUrl: string,
            $websiteUrl: string,
            $twitterUrl: string,
            $instagramUrl: string,
            $twitterHandle: string,
            $instagramHandle: string,*/
        ){
            this.athleteId = $athleteId;
            this.athleteName = $athleteName;
            this.athleteAttributeList = $athleteAttributeList;
            this.roleId = $roleId;
            //this.biograph = $biograph;
            this.profileImage = $profileImage;
            this.profileThumbnailImage = $profileThumbnailImage;
            this.bannerImage = $bannerImage;
            /*this.state = $state;
            this.city = $city;
            this.country = $country;
            this.location = $location;
            this.isVerified = $isVerified;
            this.socialMediaUrl = $socialMediaUrl;
            this.spotifyUrl = $spotifyUrl;
            this.appleMusicUrl = $appleMusicUrl;
            this.websiteUrl = $websiteUrl;
            this.twitterUrl = $twitterUrl;
            this.instagramUrl = $instagramUrl;
            this.twitterHandle = $twitterHandle;
            this.instagramHandle = $instagramHandle;*/
    }

    public getPayload(){
        return {
            athleteId : this.athleteId,
            athleteName : this.athleteName,
            //state : this.state,
            //city : this.city,
            //country : this.country,
            roleId : this.roleId,
            //biograph : this.biograph,
            athleteAttributeList: this.athleteAttributeList,
            //profileImage : this.profileImage,
            //bannerImage : this.bannerImage,
            /*location : this.location,
            isVerified : this.isVerified,
            socialMediaUrl : this.socialMediaUrl,
            spotifyUrl : this.spotifyUrl,
            appleMusicUrl : this.appleMusicUrl,
            websiteUrl : this.websiteUrl,
            twitterUrl : this.twitterUrl,
            instagramUrl : this.instagramUrl,
            twitterHandle : this.twitterHandle,
            instagramHandle : this.instagramHandle,*/
        }
    }
}