import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from "materialize-css";
const Signup = () => {
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState(undefined)
    const history = useHistory();

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])


    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dnrklsoul")
        fetch("https://api.cloudinary.com/v1_1/dnrklsoul/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())
            .then((data) => {
                seturl(data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    const uploadFields = ()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#d32f2f red darken-2" })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#d32f2f red darken-2" })
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push("/signin")

                }
            }).catch((err) => {
                console.log(err)
            })
    }


    const postData = () => {
       if(image){
           uploadPic();
           
       }else{
           
           uploadFields();
       }
    }

    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => { setname(e.target.value) }} />
                <input type="text" placeholder="email"
                    value={email} onChange={(e) => { setemail(e.target.value) }} />
                <input type="password" placeholder="password"
                    value={password} onChange={(e) => { setpassword(e.target.value) }} />

                <div class="file-field input-field">
                    <div class="btn #1976d2 blue darken-1">
                        <span>upload pic</span>
                        <input type="file" onChange={(e) => setimage(e.target.files[0])} />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #1976d2 blue darken-2" onClick={() => { postData() }} >Signup</button>
                <h5>
                    <Link to="/signin">Already don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup























