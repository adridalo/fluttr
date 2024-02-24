import {GoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import {Profile} from "./Profile.jsx";

export function Auth() {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const resp = await fetch('/api/check-auth', {
                    method: 'GET',
                    credentials: "include"
                })

                if(!resp.ok) {
                    return
                }

                const data = await resp.json()
                console.log(data)
                setUserInfo(data.data)
            } catch(e) {
                console.error(e)
            }
        }

        checkAuth()
    }, []);

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
                    name={userInfo.name}
                    picture={userInfo.picture}
                />
            }
        </div>
    )
}