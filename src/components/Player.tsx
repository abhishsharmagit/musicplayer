import Card from "./Card";
import React, {useEffect} from "react";
import "../App.css";
import Acplayer from "./Acplayer";
import useAuth from "./useAuth"
import {music} from "../store/action"
import { useSelector, useDispatch} from "react-redux";
import Dashboard from "./Dashboard";
import axios from "axios";
import lists from "../musicList"


const Player = () => {


  const dispatch = useDispatch()
  const musicState = useSelector((state:stateFormat) => state.musicState);
  const song = useSelector((state:stateFormat) => state.song);

  useEffect(()=>{
    
    setTimeout(()=>{
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
    }, 2000)
  }, [])
 


  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
      <h1 className="text-center">Music Player</h1>
      </div>
     
      <div className="row">
        {musicState.map((data:any) => {
          return (
            
            <div className="col justify-content-md-center">
              <Card
                title={data.title}
                img={data.cardimg}
                music={data.uri}
              />
            </div>
          );
        })}
      </div>
        
      <div className="sticky">
        <Acplayer song={song} />
      </div>
    </div>
  );
};

export default Player;
