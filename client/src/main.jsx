import React from 'react'
import ReactDOM from 'react-dom/client'
import Fluttr from './Components/Fluttr.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
        {
            path: '/',
            element: <Fluttr />
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
