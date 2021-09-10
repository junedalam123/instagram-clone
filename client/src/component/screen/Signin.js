import React, { useState,useContext } from 'react'
import { UserContext } from "../../App"
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import M from "materialize-css"


const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const history = useHistory()


    const postData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#d32f2f red darken-2" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#d32f2f red darken-2" })
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "signin success", classes: "#43a047 green darken-1" })
                    history.push("/")

                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                <input type="password" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />

                <button className="btn waves-effect waves-light #1976d2 blue darken-1" onClick={() => postData()}>Login</button>
                <h5>
                    <Link to="/signup">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin


























