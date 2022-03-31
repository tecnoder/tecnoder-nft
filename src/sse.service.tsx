
interface NftEventSource{
    source: EventSource;
    handlers: Array<Function>;
}

const eventSources: {[key:string]: NftEventSource} = {};

export const PUBLIC_TOPIC_EVENT_TYPES = ['NEW_DROP', 'SETTLED_TOKEN', 'UPDATE_DROP', 'DROP_UPDATE', 'DELETE_DROP', 'NEW_TOKEN_ON_SALE', 'SETTLED_TOKEN', 'TOKEN_SALE_UPDATE', 'CANCEL_TOKEN_ON_SALE'];
export const USER_ID_TOPIC_EVENT_TYPES = ['OUT_BID', 'OUT_BOUGHT'];

export function sseConnect(topic: string | number, handler: Function, isUserIdTopic: boolean = false){
    const strTopic: string = topic+'';
    if( !eventSources[strTopic] ){        
        connect(strTopic, handler, isUserIdTopic);    
     }
    eventSources[strTopic].handlers.push(handler);
    //console.log(`Subscribed SSE listener for topic ${topic}`);
    
    return {
        unsubscribe:()=>{
            eventSources[strTopic].handlers = eventSources[strTopic].handlers.filter(func=>func!==handler);
            console.log(`Unsubscribed SSE listener for topic ${topic}`);
        }
     }
}


export function sseDisconnect(topic: string|number){
    const strTopic: string = topic+'';
    if( eventSources[strTopic] && eventSources[strTopic].source ){
        eventSources[strTopic].source.close();
        delete eventSources[strTopic];
        console.log(`Disconnected SSE for topic ${topic}`);
    }
    else{
        console.log(`No topic by name '${topic}' found to disconnect`);
    }
}


function connect(topic: string, handler: Function, isUserIdTopic: boolean = false){

    let sseUrl = `${process.env.REACT_APP_SSE_URL}?topic=${topic}`;

    let source = new EventSource(sseUrl);
    eventSources[topic] = eventSources[topic]||{source: null, handlers: []};    
    eventSources[topic].source = source;
    
    let eventMethod = function(event: any){
        //handler(JSON.parse(event.data));
        let data = JSON.parse(event.data);
        eventSources[topic].handlers.forEach(func=>{
            try{
                func(data);
            }catch(e){
                console.log(e);
            }
        })
     }


    source.onerror = function() {
        source.close();

        setTimeout(()=>{
            connect(topic, handler, isUserIdTopic);
        }, 1000)
     }
    let eventTypes: string[] = [];

    if(topic === 'public'){
        eventTypes = PUBLIC_TOPIC_EVENT_TYPES;
     }
    else if(isUserIdTopic){
        eventTypes = USER_ID_TOPIC_EVENT_TYPES;
    }

    eventTypes.forEach(element => {
        source.addEventListener(element, eventMethod)
    });

}

