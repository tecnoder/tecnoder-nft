import axios from "axios";
import { clearAllValue } from "../commons";
import store from "../redux/store";

export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

localStorage.setItem("base_url", API_BASE_URL);

//const userData = JSON.parse(getValue('user-data')||'{}')

const fetch = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: {
        'Authorization': API_KEY,
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
});

const fetchNoAuth = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
});

export const postData = async (url: string, data?: any, options?: any, noauth?: boolean) => {
    try {
        const user:any = store.getState().user;
        options = options||{};
        options.headers = options.headers||{};
        if(user){
            options.headers['AUTH_TOKEN'] = user.jwtId;
        }
        let response: any;
        if(noauth){
            response = await fetchNoAuth.post(url, data, options)
        }
        else{
            response = await fetch.post(url, data, options)
        }
        // console.log(`postData response `, response)
        return response.data;
    } catch (error) {
        console.log(`postData error`, error)
        if (error && error.response && error.response.status === 401) {
            clearAllValue();
            // window.location.href = '/login';
        } else {
            console.error("Error for POST Request", error)
        }
    }
};

export const getData = async (url: string, data?: any) => {
    try {
        const response = await fetch.get(url, data)
        console.log(`postData getData response `, response)
        return response.data;
    } catch (error) {
        console.log(`postData getData error `, error)
        // if (error && error.response.status === 401) {
        //     clearAllValue();
        //     //location.assign("/login");
        //     window.location.href = '/home';
        // } else {
        //     console.error("Error for GET Request", error)
        // }
    }
};

export * as services from './service'