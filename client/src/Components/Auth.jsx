import {GoogleLogin} from "@react-oauth/google";

export function Auth() {

    const handleLogin = (response) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credential: response.credential
            })
        })
    }

    return (
        <div id='auth'>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log('Login failed')}
            />
        </div>
    )
}