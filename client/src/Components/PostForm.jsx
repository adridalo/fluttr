import {useState} from "react";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

export function PostForm() {

    const [postContent, setPostContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        await fetch('/api/v1/posts/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postContent: postContent,
                creationDate: new Date()
            })
        })

        navigate('/')
        toast.success("You put yourself out there!");
    }

    return (
        <div id='post-form'>
            <form onSubmit={handleSubmit}>
                <Link to='/'>
                    <img id='back' src='./src/assets/back.png' alt='back' />
                </Link>
                <textarea required={true} id='post-textarea' placeholder='Put yourself out there.'
                          onChange={(e) => setPostContent(e.target.value)}/>
                <input src='./src/assets/new.png' alt='submit' type='image'/>
            </form>
        </div>
    )
}