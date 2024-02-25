import {useEffect, useState} from "react";
import dayjs from "dayjs";

export function SelfPosts() {

    const [posts, setPosts] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async function() {
            let response = await fetch('/api/v1/posts/getSelfPosts')
            if(!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            let data = await response.json();
            setPosts(data.posts)
            setUser(data.user)
        })()
    }, []);

    const formatTime = time => {
        return dayjs(time).format("MMM DD, YYYY, HH : mm : ss");
    }

    return posts && user ? (
        <div id='self-posts'>
            {posts.map(post => (
                <div className='post'>
                    <div key={post.id} id='post-info'>
                        <img src={user.picture} alt='user-profile-picture'/>
                        <p id='post-creator'>{user.name}</p>
                        <p id='post-creation-date'>{formatTime(post.creationDate)}</p>
                    </div>
                    <p id='post-content'>{post.postContent}</p>
                </div>
            ))}
        </div>
    ) : null
}