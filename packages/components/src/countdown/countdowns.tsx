import React, {useState, useEffect} from "react";
import moment, {Duration} from "moment";
import { _DT_FMT_DB } from "../utility";

interface CountDownProps {
	time: Date; //2026-05-31 14:12:52 format
  label: string;
  wrapperClass: string;
  onDone?: any;
  onUpdate?: any;
}


export const FromTime = (props: CountDownProps) =>{

  const [duration, setDuration] = useState<Duration>();
	
  useEffect(() => {
      let timer: any = setInterval(() => {
        const d = moment.utc().diff(moment.utc(props.time, _DT_FMT_DB));
        setDuration(moment.duration(d, 'milliseconds') as Duration); 
        if(props.onUpdate){
          props.onUpdate();
        }
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      }
  });

  return (<>
    {duration && duration.asMilliseconds()>0 && (<span className={`${props.wrapperClass}`}>
      <span className="mr-1">{props.label}:</span>
      <span className="mr-05">{`${duration.days()}D `}</span>
      <span className="mr-05">{`${duration.hours()}H `}</span>
      <span className="mr-05">{`${duration.minutes()}M `}</span>
      <span className="mr-05">{`${duration.seconds()}S `}</span>
      </span>)}
  </>)
}

export const ToTime = (props: CountDownProps) =>{

  const [duration, setDuration] = useState<Duration>();
  const [diff, setDiff] = useState<number>(-1);
	
  useEffect(() => {
      let timer: any = setInterval(() => {
        const d = moment.utc(props.time, _DT_FMT_DB).diff(moment.utc());
        if(d>=0){
          setDiff(d);
      	  setDuration(moment.duration(d, 'milliseconds') as Duration);
          if(props.onUpdate){
            props.onUpdate();
          }
        }else{
          clearInterval(timer);
          timer = null;
          if(props.onDone){
            setDiff(-1);
            props.onDone();
          }
        }
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      }
  });

  return (<>
    {diff>0 && duration && duration.asMilliseconds()>0 && (<span className={`${props.wrapperClass}`}>
      <span className="mr-1">{props.label}:</span>
      <span className="mr-05">{`${duration.days()}D `}</span>
      <span className="mr-05">{`${duration.hours()}H `}</span>
      <span className="mr-05">{`${duration.minutes()}M `}</span>
      <span className="mr-05">{`${duration.seconds()}S `}</span>
      </span>)}
  </>)
}

