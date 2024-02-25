import {useEffect, useState} from "react";

export function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function() {
            const response = await fetch('/api/v1/posts/getSelfPosts')
            if(!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data.data)
        })()
    }, []);

    return (
        <div id='self-posts'>
            <h2>Previous Posts</h2>
            {posts.map(post => (
                <div key={post.id}>{post.postContent}</div>
            ))}
        </div>
    )
}