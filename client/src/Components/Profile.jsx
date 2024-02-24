export function Profile({ name, picture }) {
    return (
        <div id='profile'>
            <img src={picture} alt='profile-picture' />
            <p id='profile-name'>{name}</p>
        </div>
    )
}