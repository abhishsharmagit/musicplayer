import { useState, useEffect } from "react"
import axios from "axios"
import {music, accessTokenAction, refreshTokenAction, expiresInAction} from "../store/action"
import {useDispatch, useSelector} from "react-redux"

const useAuth = (code:string) => {

  const accessToken = useSelector((state:stateFormat)=> state.accessToken)
  const refreshToken = useSelector((state:stateFormat)=> state.refreshToken)
  const expiresIn = useSelector((state:stateFormat)=> state.expiresIn)


  const dispatch = useDispatch();
  

  useEffect(() => {
    axios.post("http://localhost:3001/login", {
        code: code
      })
      .then(res => {
        dispatch(accessTokenAction(res.data.accessToken))

        dispatch(refreshTokenAction(res.data.refreshToken))
        dispatch(expiresInAction(res.data.expiresIn))
        //@ts-ignore
        window.history.pushState({}, null, "/")
      })
      .catch((e) => {
        //window.location = "/"
        console.log(e.message)
      })

  }, [code])


   useEffect(() => {

    setTimeout(()=>{
      
      axios.post("http://localhost:3001/refresh")
      .then(res => {
        
        dispatch(accessTokenAction(res.data.accessToken))
        dispatch(expiresInAction(res.data.expiresIn))
        //@ts-ignore
        window.history.pushState({}, null, "/")
      })
      .catch((e) => {
        //window.location = "/"
        console.log(e.message)
      })
      //@ts-ignore
    }, (expiresIn*1000 - 60*1000))
    

  }, [])


  return accessToken
}

export default useAuth