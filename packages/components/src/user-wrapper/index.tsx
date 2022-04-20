
import { useAppSelector } from '@sindric-lib-ui/commons';
import { postData } from '@sindric-lib-ui/commons/lib/api/api';
import { getUserDetailsURL } from '@sindric-lib-ui/endpoints';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const UserWrapper: React.FC = ({children}) => {

    const {user} = useAppSelector((state) => state);
    const [userData, setUserData] = useState(null);

    const history = useHistory();

    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        setUserDetails();
    }, []);

    const setUserDetails = async () => {
        const response = await postData(getUserDetailsURL);
        if(response.status === "SUCCESS"){
            setUserData(response.data);
        }
        setProcessed(true);
    }

    if((!(user && user.emailId))){
        history.push('/login');
        return (<></>)
    }
    else{

        return (
            <div>
                {processed && children}
            </div>
        );
    }
};

export default UserWrapper;
