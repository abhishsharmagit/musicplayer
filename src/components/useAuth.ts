import { useState, useEffect } from "react"
import axios from "axios"
import {music, accessTokenAction, refreshTokenAction, expiresInAction} from "../store/action"
import {useDispatch, useSelector} from "react-redux"

const useAuth = (code:string) => {
  // const [accessToken, setAccessToken] = useState()
  // const [refreshToken, setRefreshToken] = useState()
  // const [expiresIn, setExpiresIn] = useState()

  const accessToken = useSelector((state:stateFormat)=> state.accessToken)
  const refreshToken = useSelector((state:stateFormat)=> state.refreshToken)
  const expiresIn = useSelector((state:stateFormat)=> state.expiresIn)



  const grant_type = "authorization_code"
  const redirect_uri = "http://localhost:3000"

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


  return accessToken
}

export default useAuth