import {redirect} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

export function Profile({ name, picture }) {
    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p id='profile-name'>{name}</p>
            <button onClick={async () => {
                await fetch('/api/v1/logout', {
                    method: 'DELETE'
                })
                toast.success('Logout Successful')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }}>
                Logout
            </button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}