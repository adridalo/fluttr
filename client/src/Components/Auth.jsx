import {GoogleLogin} from "@react-oauth/google";
import {useState} from "react";

export function Auth() {

    const [username, setUsername] = useState("")

    const handleLogin = async (response) => {
        const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response),
            credentials: 'include'
        })
        if(!resp.ok) {
            throw new Error("Failed to login")
        }
        const data = await resp.json()
        sessionStorage.setItem('authenticated', 'true')
        setUsername(data.data.name)
    }

    return (
        <div id='auth'>
            {username === '' ?
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => console.log('Login failed')}
                /> :
                <p>{username}</p>
            }
        </div>
    )
}