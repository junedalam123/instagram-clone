import React, { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import M from "materialize-css"
const CreatePost = () => {
    const history = useHistory();
    const [title, settitle] = useState("")
    const [body, setbody] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState("")



    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#d32f2f red darken-2" })
                    } else {
                        M.toast({ html: "created post success", classes: "#43a047 green darken-1" })
                        history.push("/")

                    }
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [url])



    const postDetails = () => {
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
    return (
        <div className="card input-filed"
            style={{
                margin: "10px auto",
                maxWidth: "600px",
                height: "350px",
                padding: "20px",
                textAlign: "center",
                marginTop: "70px"
            }}
        >
            <input type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e) => setbody(e.target.value)} />
            <div class="file-field input-field">
                <div class="btn #1976d2 blue darken-1">
                    <span>upload Image</span>
                    <input type="file" onChange={(e) => setimage(e.target.files[0])} />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #1976d2 blue darken-1"
                onClick={() => postDetails()}
            >Submit Post</button>
        </div>
    )
}

export default CreatePost
























