import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../../App"

const Profile = () => {
    const [mypics, setmypics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setimage] = useState("")
    
    console.log(state);
    useEffect(() => {
        fetch("/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setmypics(result.mypost)
            })

    }, [])
    
    useEffect(()=>{
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "dnrklsoul")
            fetch("https://api.cloudinary.com/v1_1/dnrklsoul/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                    // dispatch({type:"UPDATEPIC",payload:data.url})
                    fetch("/updatepic",{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            pic:data.url
                        })
                    }).then((res)=>{
                        res.json()
                        .then((result)=>{
                             console.log(result)
                             localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                             dispatch({type:"UPDATEPIC",payload:result.pic})
                        })
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },[image])
    const updatePhoto = (file)=>{
        setimage(file)
       
    }
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{ margin: "20px 0px", borderBottom: '1px solid black' }}>

                <div style={{
                    display: "flex", justifyContent: "space-around"
                }}>

                    <div>
                        <img style={{ width: "150px", height: "150px", borderRadius: "80px" }}
                            src={state ? state.pic : "loading"} />

                    </div>
                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%", marginTop: "20px" }}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state ? state.followers.length : "0"} followers </h6>
                            <h6>{state ? state.following.length : "0"} following</h6>
                        </div >
                    </div>
                </div>
               
                <div class="file-field input-field" style={{margin:"20px"}}>
                    <div class="btn #1976d2 blue darken-1">
                        <span>update pic</span>
                        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" />
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map((item) => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Profile








