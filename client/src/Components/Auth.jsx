import {GoogleLogin} from "@react-oauth/google";
import {useState} from "react";
import {Profile} from "./Profile.jsx";

export function Auth() {

    const [userInfo, setUserInfo] = useState(null)

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
        setUserInfo(data.data)
    }

    return (
        <div id='auth'>
            {userInfo === null ?
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => console.log('Login failed')}
                /> :
                <Profile
                    email={userInfo.email}
                    name={userInfo.name}
                    picture={userInfo.pfp}
                />
            }
        </div>
    )
}