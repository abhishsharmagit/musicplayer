import React, {useState, useEffect} from 'react'
import useAuth from "./useAuth"
import {Form} from "react-bootstrap"
import TrackSearchResult from "./TrackSearchResult"
import Player from "./Player"
import { useSelector, useDispatch } from "react-redux";
import { music, searchAction, searchResultsAction, albumUrlAction, titleAction, songAction } from "../store/action";
import axios from "axios"




const Dashboard: React.FC<PlayerProps> = ({code}) => {
  //@ts-ignore
  const accessToken = useAuth(code);

  const dispatch = useDispatch();
  
  const search = useSelector((state:stateFormat) => state.search)
  const searchResults = useSelector((state:stateFormat) => state.searchResults)
  const title = useSelector((state:stateFormat) => state.title)


  function chooseTrack(track:any) {
    dispatch(songAction(track.uri))
    dispatch(albumUrlAction(track.albumUrl))
    dispatch(titleAction(track.title))
    dispatch(searchAction(""))
    dispatch(searchResultsAction([]))
    
  }

  //@ts-ignore
  useEffect(() => {
    if (!search) return dispatch(searchResultsAction([]))
    if (!accessToken) return

    let cancel = false

      axios.post("http://localhost:3001/search", {
        search
      })
        .then(res => {

          if (cancel) return
           
           dispatch(searchResultsAction(
              //@ts-ignore
              res.data.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                  (smallest:any, image:any) => {
                    if (image.height < smallest.height) return image
                    return smallest
                  },
                  track.album.images[0]
                )
      
                return {
                  artist: track.artists[0].name,
                  title: track.name,
                  uri: track.preview_url,
                  albumUrl: smallestAlbumImage.url,
                }
              })
        
           ))
        })
        .catch((e) => {


        })
    

    return () => (cancel = true)
  }, [search, accessToken])


  return (
       <div className="d-flex flex-column py-2" >
         
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => dispatch(searchAction(e.target.value))}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>
        
        {//@ts-ignore
        searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <Player />
    </div>
  )
}

export default Dashboard
