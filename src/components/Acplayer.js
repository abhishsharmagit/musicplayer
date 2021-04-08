import React, { useState, useEffect, useRef } from 'react'
import "../App.css"
import {ProgressBar} from "react-bootstrap"


const Acplayer = ({music}) => {

    const [duration, setDuration] = useState(0)
    const [playerState,setPlayerState]=useState('pause') // play
    const [playingTime, setPlayingTime] = useState(0)
    const[muteIcon, setMuteIcon] = useState('notmute')
 
  
    const inputRef = useRef(null)

    // canplay
    // playing
    // paused
    // onmetadataloaded
    
   useEffect(()=>{
    if(music){
        inputRef.current.play();
       
        setPlayerState('play')
       
        console.log("render")
    }
   }, [music])


    const handleIcon = () => {
      
       if(playerState=='pause'){
            setPlayerState("play")
            inputRef.current.play();
       }
       else{
            setPlayerState("pause")
            inputRef.current.pause()
       }
      
    }

    const handleMuteIcon = (i) =>{
        if(muteIcon == "notmute"){
                setMuteIcon("mute")
                inputRef.current.muted = true
        }else{
            setMuteIcon("notmute")
            inputRef.current.muted = false
        }
    }
    const fmtMSS = (s) => {return(s-(s%=60))/60+(9<s?':':':0')+s}
  
    // useEffect(() => {
    //     if(inputRef){
    //         inputRef.current
    //     }
    //     return () => {
    //         inputRef.current.remo
    //     }
    // }, [])

    const formattedDuration = fmtMSS(duration)
    const formattedTime = fmtMSS(playingTime)

    return (
        <div className = "container bgd">
            <div className="row border border-5 border-primary rounded">
                <div className = "col-1">
                <i className={playerState=='pause'?"bi bi-play-circle":'bi bi-pause-circle'} onClick = {()=>{handleIcon() }}> </i>
                <div className = "sticky">
                    <audio ref = {inputRef} src={music} controls 
                   onLoadedMetadata={(e) => {
                   setDuration(parseInt(e.target.duration))
                 
                }
                        } 
                     onTimeUpdate={e =>{
                         var curTime = parseInt(inputRef.current.currentTime);
                         setPlayingTime(curTime);
                
                         }} 
                    onEnded={()=>{
                            setPlayerState('pause');
                        }}

                        type="audio/mp3" style = {{display: "none", width: "0px", height: "0px"}}/>
                 </div>
               
                </div>
                <div className = "col-1">
                    <div>
                        {formattedTime}/{formattedDuration}
                    </div>
                </div>
                <div className = "col-9">
                    <div className="progressBar">
                        <ProgressBar striped variant="success" now={playingTime/duration * 100} />
                    </div>
                </div>
                <div className = "col-1">
                    <i class={muteIcon=="notmute"?"bi bi-volume-down-fill":"bi bi-volume-mute-fill"} onClick={()=>{handleMuteIcon() }}></i>
                </div>
            </div>
        </div>
    )
}

export default Acplayer
