import {redirect} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {Posts} from "./Posts.jsx";

export function Profile({ name, picture }) {
    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p id='profile-name'>{name}</p>
            <button onClick={async () => {
                await fetch('/api/v1/auth/logout', {
                    method: 'DELETE'
                })
                toast.success('Logout Successful')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }}>
                Logout
            </button>
            <Posts />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}