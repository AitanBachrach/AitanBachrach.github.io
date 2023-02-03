import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from './Navigation/Navigation';
import LondonBridge from './LondonBridge/LBApp';
import "bootstrap/dist/css/bootstrap.min.css";
import Projects from './Projects/Projects';
import Home from './Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element:< Navigation/>,
    errorElement: <h1>Seems like I messed up somewhere</h1>,
    children: [
      {
        path: "londonbridge",
        element: <LondonBridge/>
      },
      {
        path: "projects",
        element: <Projects/>
      },
      {
        path: "",
        element: <Home/>
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
