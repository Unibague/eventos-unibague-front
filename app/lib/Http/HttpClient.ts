
import { AxiosAdapter } from "./AxiosAdapter";
import { IHttpAdapter } from "./IHttpAdapter";
import { cookies } from 'next/headers'


export class HttpClient{
 
    private static instance: HttpClient;
    private httpAdapter: IHttpAdapter;

    private constructor(token){
        //Here we define what implementation we want to use. In this case I chose Axios
        // const token = HttpClient.getTokenFromCookies()
        this.httpAdapter = new AxiosAdapter(token)
    }

    public static getInstance(){

        //Here i Should send the token
        HttpClient.instance = new HttpClient('17|pNruYCgK5H57RKHnsnVs0pvq4LXE9NPJCTutAizt933c3935')
        return HttpClient.instance;
    }
    
    public setAuthToken(token: string){
        sessionStorage.setItem('token', token)
        this.httpAdapter = new AxiosAdapter(token);
    }

    public get(url: string, data?: any){
        return HttpClient.instance.httpAdapter.get(url)
    }


    public post(url: string, data: any){
        return HttpClient.instance.httpAdapter.post(url,data)
    }

    // public static get2FADataFromCookies(){
    //     const cookieStore = cookies();
    //     const setupSecretKey = cookieStore.get("setup_secret_key");
    //     const token2fa = cookieStore.get("token_2fa");
        
    //     let data = [setupSecretKey, token2fa];

    //     return data;
    // }

}