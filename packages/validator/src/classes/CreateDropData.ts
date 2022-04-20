import moment from 'moment';
import { HasNoOfCopies, IsValidDecimal, IsValidInteger, MinimumIncrementLtMinimumPrice, MinimumPriceLtBuyNow, Required, RequiredAuctionMinimumPrice, RequiredAuctionStartEndTime, RequiredBuyItNowPrice, StartTimeBeforeEndTime } from '../rules';
import { YMD_TIME_FMT } from '../utility';


export class CreateDropData {

    //@Required({message: "Drop Id is required."})
    public dropId: number;

    @Required({message: "Drop title is required."})
    public title: string;

    @IsValidInteger({message: "Enter valid Number of Copies."})
    @HasNoOfCopies({message: "Number of Copies is required."})
    public noOfCopies: number;

    @Required({message: "NFT platform type is required."})
    public nftPlatformType: string;

    @Required({message: "Athlete(s) is required."})
    public athleteIdList: any[];

    @Required({message: "Drop Type is required."})
    public dropTypeId: string;

    @Required({message: "Description is required."})
    public description: string;

    @Required({message: "Asset is required."})
    public assetFile: File;

    @Required({message: "Asset thumbnail is required."})
    public thumbnailImage: File;

    public assetBannerImage: File;

    public hasBuyItNow: boolean;

    @Required({message: "Is pack drop required."})
    public isPackDrop: string;

    public isEntitled: string;

    @Required({message: "Access Id is required."})
    public accessId: string;
    
    @RequiredAuctionStartEndTime({message: "Start time is required."})
    @StartTimeBeforeEndTime({message: "Start time should be before end time."})
    public startTime: Date;

    @RequiredAuctionStartEndTime({message: "End time is required"})
    public endTime: Date;

    @IsValidDecimal({message: "Enter valid amount."})
    @RequiredBuyItNowPrice({message: "Buy it now price is required."})
    public buyItNowPrice: number;

    @IsValidDecimal({message: "Enter valid amount."})
    @RequiredAuctionMinimumPrice({message: "Minimum price is required."})
    @MinimumPriceLtBuyNow({message: "Minimum price should be less than buy it now price"})
    public minimumPrice: number;

    @IsValidDecimal({message: "Enter valid amount."})
    @RequiredAuctionMinimumPrice({message: "Minimum increment price is required."})
    @MinimumIncrementLtMinimumPrice({message: "Minimum increment price should be less than minimum price."})
    public minimumIncrementPrice: number;


    constructor(
            $dropId: number,
            $title: string,
            $noOfCopies: number,
            $nftPlatformType: string,
            $athleteIdList: any[],
            $dropTypeId: string,
            $description: string,
            $assetFile: File,
            $thumbnailImage: File,
            $assetBannerImage: File,
            $startTime: Date,
            $endTime: Date,
            $isPackDrop: string,
            $isEntitled: string,
            $accessId: string,
            $hasBuyItNow: boolean,
            $buyItNowPrice: number,
            $minimumPrice: number,
            $minimumIncrementPrice: number,
        ){
            this.dropId = $dropId;
            this.title = $title;
            this.noOfCopies = $noOfCopies;
            this.nftPlatformType = $nftPlatformType;
            this.athleteIdList = $athleteIdList;
            this.dropTypeId = $dropTypeId;
            this.description = $description;
            this.assetFile = $assetFile;
            this.thumbnailImage = $thumbnailImage;
            this.assetBannerImage = $assetBannerImage;
            this.isPackDrop = $isPackDrop;
            this.isEntitled = $isEntitled;
            this.accessId = $accessId;
            this.hasBuyItNow = $hasBuyItNow;
            this.buyItNowPrice = $buyItNowPrice;
            this.minimumPrice = $minimumPrice;
            this.minimumIncrementPrice = $minimumIncrementPrice;
            this.startTime = $startTime;
            this.endTime = $endTime;
    }

    public getPayload(){
        return {
            dropId : this.dropId,
            title : this.title,
            dropTypeId : this.dropTypeId,
            description : this.description,
            isPackDrop : this.isPackDrop,
            isEntitled : this.isEntitled,
            accessId : this.accessId,            
            noOfCopies : this.noOfCopies,
            nftPlatformType : this.nftPlatformType,
            athleteIdList : this.athleteIdList,
            assetFile : this.assetFile,
            thumbnailImage : this.thumbnailImage,
            assetBannerImage : this.assetBannerImage,
            buyItNowPrice : this.buyItNowPrice,
            minimumPrice : this.minimumPrice,
            minimumIncrementPrice : this.minimumIncrementPrice,
            startTime : moment(this.startTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
            endTime : moment(this.endTime, YMD_TIME_FMT).utc().format(YMD_TIME_FMT),
        }
    }
}