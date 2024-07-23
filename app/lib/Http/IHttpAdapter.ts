import { AxiosResponse } from "axios";

export interface IHttpAdapter 
{
    get(url: string, params?: any): Promise<AxiosResponse>;
    post(url: string, data?: any): Promise<AxiosResponse>;

}