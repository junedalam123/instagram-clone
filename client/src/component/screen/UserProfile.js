import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../../App"
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setuserProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams();
    const [showfollow, setshowfollow] = useState(state?!state.following.includes(userid):true)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setuserProfile(result)

            })

    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type:"UPDATE", payload: { following:data.following,followers:data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setuserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setshowfollow(false)
            })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                 localStorage.setItem("user", JSON.stringify(data))
                 
                 setuserProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers:newFollower
                        }
                    }
                })
                setshowfollow(true)
            })
    }



    return (
        <>
            {
                userProfile ?
                    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0px", borderBottom: '1px solid black' }}>
                            <div>
                                <img style={{ width: "150px", height: "150px", borderRadius: "80px" }}
                                    src={userProfile.user.pic}  />
                            </div>
                            <div>
                                <h4>{userProfile.user.name}</h4>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "108%", marginTop: "20px" }}>
                                    <h6>{userProfile.posts.length} posts</h6>
                                    <h6>{userProfile.user.followers.length} followers</h6>
                                    <h6>{userProfile.user.following.length} following</h6>
                                </div >
                                {
                                    showfollow ?
                                        <button style={{margin:"20px 0px"}} className="btn waves-effect waves-light #1976d2 blue darken-1"
                                            onClick={() => { followUser() }}>follow</button>
                                        :
                                        <button style={{margin:"20px 0px"}} className="btn waves-effect waves-light #1976d2 blue darken-1"
                                            onClick={() => { unfollowUser() }}>Unfollow</button>
                                }
                            </div>
                        </div>
                        <div className="gallery">
                            {
                                userProfile.posts.map((item) => {
                                    return (
                                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                               
                                        )
                                })
                            }

                        </div>
                    </div>
                    : <h2>loading....!</h2>
            }

        </>
    )
}
export default Profile




