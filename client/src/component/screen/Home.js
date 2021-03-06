import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../App"
import { Link } from 'react-router-dom'
const Home = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then((res) => res.json())
      .then((result) => {
        console.log(result)
        setData(result.posts)
      })

  }, [])


  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch((err) => {
        console.log(err)
      })
  }

  const UnlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch((err) => {
        console.log(err)
      })
  }

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.filter(item => {
          return item._id !== result._id
        })
        setData(newData)
      })
  }

  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <h5><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile/" }>{item.postedBy.name}</Link> {item.postedBy._id == state._id
                && <i className="material-icons"
                  style={{ float: "right" }} onClick={() => { deletePost(item._id) }}>delete</i>}</h5>
              <div className="card-image">
                <img style={{ width: '500px', height: '350px' }} src={item.photo} alt="homeimage" />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                {
                  item.likes.includes(state._id)
                    ? <i className="material-icons" onClick={() => { UnlikePost(item._id) }}>thumb_down</i> :
                    <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                }
                <h5 style={{ fontSize: "17px", marginLeft: "-20px" }}>{item.likes.length} likes</h5>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {
                  item.comments.map((record) => {
                    return (
                      <h5 style={{ fontSize: "18px", color: "grey", marginLeft: "-20px" }}
                        key={record._id}><span style={{ fontSize: "18px", fontWeight: "500px", color: "black" }}>
                          {record.postedBy.name}</span>  {record.text}</h5>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id)
                }}>
                  <input type="text" className="commentbox" placeholder="Add the comment" />
                </form>
              </div>
            </div>

          )
        })
      }
    </div>
  )
}

export default Home
























