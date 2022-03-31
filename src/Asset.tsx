import {useState, useEffect} from "react";
import { allowedAudioExtensions, allowedImgExtensions, allowedVideoExtensions } from "./utils/Constants";

function Asset(props: any) {

    const [thumbnailType, setThumbnailType] = useState<string>()
    const [videoHeight, setVideoHeight] = useState<string>("100%")
    const [videoWidth, setVideoWidth] = useState<string>("100%")

    useEffect(()=>{
      if(props.assetUrl){
        const type = allowedImgExtensions.exec(props.assetUrl)? "IMAGE" 
                        : (allowedAudioExtensions.exec(props.assetUrl)? "AUDIO" 
                            : (allowedVideoExtensions.exec(props.assetUrl)? "VIDEO" : ""));
        setThumbnailType(type);
      }
      if(props.videoHeight){
      	//setVideoHeight(props.videoHeight)
      }
      if(props.videoWidth){
      	//setVideoWidth(props.videoWidth)
      }

    }, [props, props.assetUrl])


	return <>
		{
            thumbnailType==='VIDEO'? (<video className={videoHeight==="auto"? "vertical-center" : ""} title={props.cryptoKickName} width={videoWidth} height={videoHeight} poster={props.assetUrl} loop autoPlay muted controlsList="nodownload">
                <source src={props.assetUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>)
            :
            (thumbnailType==='AUDIO'? (<audio title={props.cryptoKickName} controls controlsList="nodownload">
                <source src={props.assetUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>)
                :
              (<img alt={props.cryptoKickName} src={props.assetUrl} />)
            )
        }
        </>
}

export default Asset;