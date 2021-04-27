import React, {useState, useEffect} from 'react'
import useAuth from "./useAuth"
import {Form} from "react-bootstrap"
import TrackSearchResult from "./TrackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import Player from "./Player"
import { useSelector, useDispatch } from "react-redux";
import { music } from "../store/action";
import axios from "axios"





const spotifyApi = new SpotifyWebApi({
  clientId: "0882e218b9ff4e169ccf5df2227a5053",
})

const Dashboard = ({code}) => {
  const accessToken = useAuth(code);
  console.log(accessToken)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
 // const [playingTrack, setPlayingTrack] = useState()
  const dispatch = useDispatch();
  const musicState = useSelector((state) => state.musicState);



 // console.log(playingTrack)
  function chooseTrack(track) {
    dispatch(music(track.uri))
    setSearch("")
    
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    // spotifyApi.searchTracks(search).then(res => {
    //   if (cancel) return
    //   console.log(res)
    //   setSearchResults(
        
    //     res.body.tracks.items.map(track => {
    //       const smallestAlbumImage = track.album.images.reduce(
    //         (smallest, image) => {
    //           if (image.height < smallest.height) return image
    //           return smallest
    //         },
    //         track.album.images[0]
    //       )

    //       return {
    //         artist: track.artists[0].name,
    //         title: track.name,
    //         uri: track.preview_url,
    //         albumUrl: smallestAlbumImage.url,
    //       }
    //     })
    //   )
    // })

      axios.post("http://localhost:3001/search", {
        search
      })
        .then(res => {
          console.log(1)
         
         //const resp = JSON.parse(res);
          console.log(res)
        })
        .catch((e) => {
          console.log(2)
          console.log(e.message)
        })
    

    return () => (cancel = true)
  }, [search, accessToken])


  return (
       <div className="d-flex flex-column py-2" >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )} */}
      </div>
      <Player />
    </div>
  )
}

export default Dashboard
