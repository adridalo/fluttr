export function Profile({ name, email, picture }) {
    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p>{name}</p>
            <p>{email}</p>
        </div>
    )
}