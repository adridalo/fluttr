import '../Styles/styles.css'
import {Header} from "./Header.jsx";
import {PostForm} from "./PostForm.jsx";
import {Feed} from "./Feed.jsx";
import {Auth} from "./Auth.jsx";

function Fluttr() {

  return (
    <>
        <Header />
        <div id='main'>
            <Feed />
            <Auth />
        </div>
    </>
  )
}

export default Fluttr
