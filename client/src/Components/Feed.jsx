import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {formatTime} from "../util/util.js";

export function Feed() {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/v1/posts/getAllPosts')

            if(!response.ok) {
                toast.error('Error occurred getting all posts')
            }

            const data = await response.json()
            setPosts(data.posts)
            console.log(data.posts)
        })()
    }, []);

    return posts ? (
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
            <div id='posts'>
                {posts.map(post => {
                    return <div className='post'>
                        <div key={post.id} id='post-info'>
                            <img src={post.creator.picture} alt='user-profile-picture'/>
                            <p id='post-creator'>{post.creator.name}</p>
                            <p id='post-creation-date'>{formatTime(post.creationDate)}</p>
                        </div>
                        <p id='post-content'>{post.postContent}</p>
                    </div>
                })}
            </div>
        </div>
    ) : null
}
