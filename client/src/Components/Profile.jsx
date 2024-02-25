import {redirect} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {Posts} from "./Posts.jsx";
import dayjs from "dayjs";

export function Profile({ name, picture, bio, creationDate }) {

    const calculateAccountAge = () => {
        const now = dayjs(Date.now())
        const creation = dayjs(creationDate)

        const years = now.diff(creation, 'year')
        const months = now.diff(creation, 'month')
        const days = now.diff(creation, 'day')
        const hours = now.diff(creation, 'hour')
        const minutes = now.diff(creation, 'minute')

        return`
            ${years} yrs
            ${months} mos
            ${days} dys
            ${hours} hrs
            ${minutes} min
        `
    }

    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p id='profile-name'>{name}</p>
            <p id='profile-bio'>{bio}</p>
            <p id='profile-creation-date'>{calculateAccountAge()}</p>
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