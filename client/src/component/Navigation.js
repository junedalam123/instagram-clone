import React, { useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { UserContext } from '../App';

const Navigation = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
        <li><Link to="/profile">profile</Link></li>,
        <li><Link to="/create">createPost</Link></li>,
        <li><Link to="/myfollowingpost">My following Post</Link></li>,
        <li>
          <button style={{
            background: "red", color: "white", outline: "none",
            padding: "10px 30px", border: "none",
            boxShadow: "0 2px 2px 0px red",
            marginRight:"10px",
            textTransform: "uppercase", font: "14px", fontWeight: "700"
            
          }} className="logoutbtn" onClick={() => {
            localStorage.clear()
            dispatch({ "type": "CLEAR" })
            history.push("/signin")
          }}>Logout</button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div class="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left"  >Instagram</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>

  )
}

export default Navigation


























