import { HttpClient } from '../lib/Http/HttpClient';
import { cookies } from 'next/headers';

export const logout = () =>{

    const logout = async () => {
        const http = HttpClient.getInstance();
        const response = await http.get('/logout')
    }

    logout();


    return (
        <div>
            <p> Te deslogeaste correctamente!!</p>
        </div>
    )
}

export default logout;