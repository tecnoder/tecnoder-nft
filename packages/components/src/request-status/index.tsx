import { useEffect } from 'react'
import { useHistory, withRouter } from 'react-router';
import { Button } from '../button';

function RequestStatus(props: any) {
    const history = useHistory();

    useEffect(() => {
        if (!props.location.state) {
            history.goBack()
        }
    }, [])

    const goToAction1 = (e:any)=>{
        e.preventDefault();
        if(props.location.state && props.location.state.data.btnUrl1){
            history.push(props.location.state.data.btnUrl1);
        }
        else{
            history.push("/");
        }
    }

    const goToAction2 = (e:any)=>{
        e.preventDefault();
        history.push(props.location.state.data.btnUrl2);
    }

    let content = (
        <div className={`${`request_page_wrapper`} text-uppercase`}>
            <div className="container mx-auto">
                <h3 className="mb-2">{props.location.state?.data.title||"Congratulations!"}</h3>
                {props.location.state?.data.message1? <h5 className="">{props.location.state?.data.message1}</h5> : <></>}

                {props.location.state?.data.message2? <p className="">{props.location.state?.data.message2}</p> : <></>}

                <div className={`button-block mt-md-5 mt-5 ${`button_block`}`}>
                    <Button type="primary" onClick={goToAction1}>{props.location.state?.data.btnText1||'Home'}</Button>
                    {
                        props.location.state?.data.btnUrl2 && props.location.state?.data.btnText2? 
                        <Button type="secondary" onClick={goToAction2}>{props.location.state?.data.btnText2}</Button>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )

    return content
}

export default withRouter(RequestStatus)
