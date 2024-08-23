import axios ,{ AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {IHttpAdapter } from "./IHttpAdapter";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";  // Add this import to handle cookies

export class AxiosAdapter implements IHttpAdapter{
    
    private axiosInstance: AxiosInstance;
    
    
    constructor(token?: string){

        const xsrfToken = Cookies.get('XSRF-TOKEN');

        console.log(Cookies.get());

        let config: AxiosRequestConfig = {
            baseURL: process.env.apiUrl as string,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-XSRF-TOKEN': xsrfToken ?? '' 
            }
        };
        this.axiosInstance = axios.create(config)
    }

    public async get(url: string, params?:any): Promise<any> {
        const response = await this.axiosInstance.get(url, params);
        return response;
      }

    public async post(url: string, data: any): Promise<any>{
        const response = await this.axiosInstance.post(url, data);
        return response;
    }  

    public async put(url: string, data: any): Promise<any>{
        const response = await this.axiosInstance.put(url, data);
        return response;
    }  

    public changeDefaultRoute (baseURL: string){
        this.axiosInstance.defaults.baseURL = baseURL
    }

}