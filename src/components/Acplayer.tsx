import React, { Dispatch, useEffect, useRef, useState } from "react";
import "../App.css";
//import { ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { play, duration, playing, mute } from "../store/action";
import Slider from "./slider/Slider"

const Acplayer: React.FC<musicProp> = ({ music }) => {

  const playerState = useSelector((state:stateFormat) => state.playerState);
  const durationState = useSelector((state:stateFormat) => state.duration);
  const dispatch = useDispatch();
  const playingTimeState = useSelector((state:stateFormat) => state.playingTime);
  const muteState = useSelector((state:stateFormat) => state.muted);

const [percentage, setPercentage] = useState((playingTimeState / durationState) * 100)
  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    if (music) {
      dispatch(play("PLAY", true));
      audioRef.current.play();
      console.log(music)
    }
    
  }, [music, dispatch]);

  const handleOnClick = () => {
    if (playerState) {
      dispatch(play("PAUSE", false));
      audioRef.current.pause();
    } else {
      dispatch(play("PLAY", true));
      audioRef.current.play();
    }
  };

  const handleMuteIcon = () => {
    if (muteState == false) {
      dispatch(mute(true))
      audioRef.current.muted = true;
    } else {
      dispatch(mute(false));
      audioRef.current.muted = false;
    }
  };
  const fmtMSS = (s:number) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const onChange = (e: any) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    //console.log(audio.currentTime)
    //console.log(e.target.value)
    setPercentage(e.target.value)
  }

  const getCurrDuration = (e:any) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    //const time = e.currentTarget.currentTime
    const cTime = Math.ceil(audioRef.current.currentTime)
               
     dispatch(playing(cTime))
    setPercentage(+percent)
    //setCurrentTime(time.toFixed(2))
  }

  const formattedDuration = fmtMSS(durationState);
  const formattedTime = fmtMSS(playingTimeState);

  return (
    <div className="container bgd">
      <div className="row border border-5 border-primary rounded">
        <div className="col-1">
          <i
            className={playerState ? "bi bi-pause-circle" : "bi bi-play-circle"}
            onClick={handleOnClick}
          >
            {" "}
          </i>
          <div className="sticky">
            <audio
              ref={audioRef}
              src={music}
              
              onLoadedMetadata={(e: any) => {
                const time = parseInt(e.target.duration)
                dispatch(duration(time));
                
              }}
              onTimeUpdate={(e) => {
                getCurrDuration(e)
            
              }}
              onEnded={() => {
                dispatch(play("PAUSE", false));
              }}
             
              style={{ display: "none", width: "0px", height: "0px" }}
            />
          </div>
        </div>
        <div className="col-1">
          <div>
            {formattedTime}/{formattedDuration}
          </div>
        </div>
        <div className="col-9">
          {/* <div className="progressBar">
            <ProgressBar
              striped
              variant="success"
              now={(playingTimeState / durationState) * 100}
            />

          </div> */}
          <Slider percentage={percentage} onChange = {onChange}/>
        </div>
        <div className="col-1">
          <i
            className={
              muteState == false
                ? "bi bi-volume-down-fill"
                : "bi bi-volume-mute-fill"
            }
            onClick={() => {
              handleMuteIcon();
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Acplayer;
