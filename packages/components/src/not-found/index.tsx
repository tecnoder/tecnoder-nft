import { isErrorExists } from "@sindric-lib-ui/commons";
import { postData } from "@sindric-lib-ui/commons/lib/api/api";
import { subscribeUrl } from "@sindric-lib-ui/endpoints";
import { validate } from "@sindric-lib-ui/validator";
import { EmailFormData } from "@sindric-lib-ui/validator/lib/classes";
import React, { useState } from "react";
import { Button } from "../button";
import InputField from "../InputField";


const NotFound: React.FC = () => {

    const [emailId, setEmailId] = useState('');
    let [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleNewsletterSubmit = async (event: any) => {
        event.preventDefault();
    
        let emailFormData = new EmailFormData(emailId);
    
        let errorFromValidator = validate(emailFormData);
        setErrors(errorFromValidator);
    
        if(isErrorExists(errorFromValidator)){
            setErrors(errorFromValidator);
        }
        else{
            setSubmitting(true);
            const response = await postData(subscribeUrl(emailId, 'Y'));
            if(response.status === "SUCCESS"){
                setIsFormSubmitted(true)
                setSubmitting(false);
            }
        }
      }

    let content = (
        <>
        <div className="text-content center mt-5 flex-column-center">
            <h2>Page Not Found</h2>
            <div className="light-intro w-30 mt-1">
                Join our mailing list to stay in the loop with our NFT drops and new announcements.
            </div>
            {
                isFormSubmitted && (
                    <div className="light-intro w-30 mt-1 center">
                        Subscribed to the mailing lists
                    </div>
                )
            }
        </div>
        <div className="flex mt-2">
            {!isFormSubmitted && (
                <form className={`coming_soon_form`} onSubmit={handleNewsletterSubmit}>
                <div className={`coming_soon_field`}>
                    <InputField wrapperClass="mb-1" type="text" name="emailId" placeholder="Email" value={emailId} errors={errors} onChange={(e:any)=>setEmailId(e.target.value)}/>
                </div>
                <div className={`coming_soon_button`}>
                    <Button type="primary" aria-disabled>Sign Up</Button>
                </div>
                </form>
            )}
        </div>
        </>
    );

    return (
        <div className="toc">
            {content}
        </div>
    )
};

export default NotFound;
