import {Link} from "react-router-dom";

export function Feed() {

    return (
        <div id='feed'>
            <div id='feed-top'>
                <Link to='/newPost'>
                    <img
                        src='./src/assets/new.png'
                        id='new-post-button'
                        alt='new-post-image'
                    />
                </Link>
            </div>
        </div>
    );
}
