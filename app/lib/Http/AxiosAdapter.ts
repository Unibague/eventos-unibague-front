import axios ,{ AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {IHttpAdapter } from "./IHttpAdapter";
import { redirect } from "next/navigation";

export class AxiosAdapter implements IHttpAdapter{
    
    private axiosInstance: AxiosInstance;
    private csrfTokenFetched: boolean = false;

    
    constructor(token?: string){
        let config: AxiosRequestConfig = {
            baseURL: process.env.apiUrl as string,
            withCredentials: true,
            withXSRFToken: true,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        this.axiosInstance = axios.create(config)
    }

    public async get(url: string): Promise<any> {
        const response = await this.axiosInstance.get(url);
        return response;
        //    let axiosError: AxiosError | null = null;
        // try {
        //     const response = await this.axiosInstance.get<T>(url);
        //     return response.data;
        // } catch (error) {
        //     axiosError = error as AxiosError
        // } finally{
        //     if (axiosError){
        //         this.handleError(axiosError as AxiosError)
        //     } 
        //  }
      }

    public async post(url: string, data: any): Promise<any>{
        const response = await this.axiosInstance.post(url, data);
        return response;
    }  

    public changeDefaultRoute (baseURL: string){
        this.axiosInstance.defaults.baseURL = baseURL
    }

}