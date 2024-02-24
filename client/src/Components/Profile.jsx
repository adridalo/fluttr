import {redirect} from "react-router-dom";

export function Profile({ name, picture }) {
    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p id='profile-name'>{name}</p>
            <button onClick={async () => {
                await fetch('/api/v1/logout', {
                    method: 'DELETE'
                })
                window.location.reload()
            }}>
                Logout
            </button>
        </div>
    )
}