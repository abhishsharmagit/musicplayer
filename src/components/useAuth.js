import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const grant_type = "authorization_code"
  const redirect_uri = "http://localhost:3000"


  

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
