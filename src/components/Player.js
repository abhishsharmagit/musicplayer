import Card from "./Card";
import React from "react";
import "../App.css";
import Acplayer from "./Acplayer";

import { useSelector} from "react-redux";

const Player = () => {
  const lists = [
    {
      title: "Song",
      img:
        "https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
      music: "/assets/music/sample1.mp3",
    },
    {
      title: "Misery",
      img:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
      music: "/assets/music/sample2.mp3",
    },
    {
      title: "Lovely",
      img:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
      music: "/assets/music/sample3.mp3",
    },
    {
      title: "Closer",
      img:
        "https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60",
      music: "/assets/music/sample2.mp3",
    },
    {
      title: "Sugar",
      img:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60",
      music: "/assets/music/sample3.mp3",
    },
    {
      title: "Animal",
      img:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
      music: "/assets/music/sample1.mp3",
    },
  ];

  const musicState = useSelector((state) => state.musicState);



  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <h1 className="text-center">Music Player</h1>
      </div>
      <div className="row">
        {lists.map((data) => {
          return (
            <div className="col justify-content-md-center">
              <Card
                title={data.title}
                img={data.img}
                music={data.music}
                
              />
            </div>
          );
        })}
      </div>
        
      <div className="sticky">
        <Acplayer music={musicState} />
      </div>
    </div>
  );
};

export default Player;
