import '../Styles/styles.css'
import {Header} from "./Header.jsx";
import {PostForm} from "./PostForm.jsx";
import {Feed} from "./Feed.jsx";

function Fluttr() {

  return (
    <>
        <Header />
        <div id='main'>
            <PostForm />
            <Feed />
        </div>
    </>
  )
}

export default Fluttr
