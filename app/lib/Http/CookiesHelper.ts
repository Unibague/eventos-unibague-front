import { cookies } from "next/headers";

export class cookiesHelper {
    public static getTokenFromCookies(){
        const cookieStore = cookies();
        const token = cookieStore.get("access_token");
        if(!token) {
            throw new Error("Missing token")
        }
        return token.value
    }

    // public static get2FADataFromCookies(){
    //     const cookieStore = cookies();
    //     const setupSecretKey = cookieStore.get("setup_secret_key");
    //     const token2fa = cookieStore.get("token_2fa");
    //     return data;
    // }

}