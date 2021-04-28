import { useState, useEffect } from "react"
import axios from "axios"
import {music} from "../store/action"
import {useDispatch} from "react-redux"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const grant_type = "authorization_code"
  const redirect_uri = "http://localhost:3000"

  const dispatch = useDispatch();
  

  useEffect(() => {
    axios.post("http://localhost:3001/login", {
        code: code
      })
      .then(res => {
        setAccessToken(res.data.accessToken)

        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
      })
      .catch((e) => {
        //window.location = "/"
        console.log(e.message)
      })
  }, [code])


  useEffect(()=>{
    axios.get("http://localhost:3001/newsongs")
    .then((res)=>{
      console.log(res)
      dispatch(music( 
        //@ts-ignore
      res.data.tracks.items.map(track =>{
  
       
        return {
         
           artist: track.artists[0].name,
            title: track.name,
            uri: track.preview_url,
            cardimg: track.album.images[1].url
        }
        
      })
      ))
    }).catch((e)=>{
      console.log(e.message)
    })
   },[])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
     console.log(refreshToken)
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
          setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
        })
        .catch(() => {
          window.location = "/"
        })
   }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}
