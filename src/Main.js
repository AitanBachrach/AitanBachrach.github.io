import { Outlet, Link } from "react-router-dom";

function Main(){
    return (
      <>

        <h1>hello there</h1>
        <Link to="/londonbridge">LondonBridge</Link>
        <Outlet/>
      </>
    )
} 

export default Main