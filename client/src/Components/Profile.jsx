import {redirect} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {SelfPosts} from "./SelfPosts.jsx";
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

    const handleLogout = async () => {
        await fetch('/api/v1/auth/logout', {
            method: 'DELETE'
        })
        toast.success('Logout Successful')
        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture'/>
            <button onClick={handleLogout}>
                Logout
            </button>
            <div id='profile-info'>
                <div id='profile-credentials'>
                    <h2 id='profile-name'>{name}</h2>
                    <p id='profile-bio'>{bio}</p>
                    <p id='profile-creation-date'>{calculateAccountAge()}</p>
                </div>
                <div id='profile-edit'>
                    <img src='./src/assets/edit.png' alt='edit-profile'/>
                </div>
            </div>
            <SelfPosts/>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}