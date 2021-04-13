import React, { useEffect, useRef } from "react";
import "../App.css";
import { ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { play, duration, playing, mute } from "../store/action";

const Acplayer = ({ music }) => {

  const playerState = useSelector((state) => state.playerState);
  const durationState = useSelector(state => state.duration);
  const dispatch = useDispatch();
  const playingState = useSelector(state => state.playingTime);
  const muteState = useSelector(state => state.muted);
console.log(playerState)
console.log(muteState)
console.log("hello")

  const inputRef = useRef(null);

  useEffect(() => {
    if (music) {
      dispatch(play("PLAY", true));
      inputRef.current.play();
    }
    console.log("render")
  }, [music, dispatch]);

  const handleOnClick = () => {
    if (playerState) {
      dispatch(play("PAUSE", false));
      inputRef.current.pause();
    } else {
      dispatch(play("PLAY", true));
      inputRef.current.play();
    }
  };

  const handleMuteIcon = (i) => {
    if (muteState == false) {
      dispatch(mute(true))
      inputRef.current.muted = true;
    } else {
      dispatch(mute(false));
      inputRef.current.muted = false;
    }
  };
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const formattedDuration = fmtMSS(durationState);
  const formattedTime = fmtMSS(playingState);

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
              ref={inputRef}
              src={music}
              controls
              onLoadedMetadata={(e) => {
                const time = parseInt(e.target.duration)
                dispatch(duration(time));
                
              }}
              onTimeUpdate={(e) => {
                var curTime = parseInt(inputRef.current.currentTime);
                dispatch(playing(curTime))
              }}
              onEnded={() => {
                dispatch(play("PAUSE", false));
              }}
              type="audio/mp3"
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
          <div className="progressBar">
            <ProgressBar
              striped
              variant="success"
              now={(playingState / durationState) * 100}
            />

          </div>
        </div>
        <div className="col-1">
          <i
            class={
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
