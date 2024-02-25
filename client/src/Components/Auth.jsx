import {GoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import {Profile} from "./Profile.jsx";
import toast, {Toaster} from "react-hot-toast";

export function Auth() {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const resp = await fetch('/api/v1/auth/check-auth', {
                    method: 'GET',
                    credentials: "include"
                })

                if(!resp.ok) {
                    return
                }

                const data = await resp.json()
                setUserInfo(data.data)
            } catch(e) {
                console.error(e)
            }
        }

        checkAuth()
    }, []);

    const handleLogin = async (response) => {
        const resp = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response),
            credentials: 'include'
        })
        if(!resp.ok) {
            toast.error('Failed to login')
            return
        }
        const data = await resp.json()
        setUserInfo(data.data)
        toast.success('Login Successful')
    }

    return (
        <div id='auth'>
            {userInfo === null ?
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => console.log('Login failed')}
                    useOneTap={true}
                /> :
                <Profile
                    name={userInfo.name}
                    picture={userInfo.picture}
                />
            }
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}