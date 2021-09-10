import React, { useEffect, createContext, useReducer, useContext } from 'react'
import Navigation from "./component/Navigation"
import "./App.css"
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./component/screen/Home"
import Signin from "./component/screen/Signin"
import Signup from "./component/screen/Signup"
import Profile from "./component/screen/Profile"
import CreatePost from "./component/screen/CreatePost";
import { reducer, initialState } from "./reducers/UseReducers"
import UserProfile from "./component/screen/UserProfile"
import SubscribesUserPost from "./component/screen/SubscribesUserPost"

export const UserContext = createContext();


const Rounting = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push("/")
    } else {
      history.push("/signin")
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile" >
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
         <UserProfile />
       </Route>
       <Route path="/myfollowingpost">
         <SubscribesUserPost />
       </Route>
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navigation />
        <Rounting />
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App

















