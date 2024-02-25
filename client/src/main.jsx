import React from 'react'
import ReactDOM from 'react-dom/client'
import Fluttr from './Components/Fluttr.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {PostForm} from "./Components/PostForm.jsx";

const router = createBrowserRouter([
        {
            path: '/',
            element: <Fluttr />
        },
        {
            path: '/newPost',
            element: <PostForm />
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
