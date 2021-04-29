import React from 'react'

import { songAction } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import lists from "../musicList"

type AppProps = {
  title: string,
  img: string,
  music: string
}

const Card: React.FunctionComponent<AppProps> = ({title, img, music}) => {

  const dispatch = useDispatch()
  const musicState = useSelector((state:stateFormat) => state.musicState)
  
    return (
        <div className="container playhover" style={{width : "200px", height: "200px", margin:"15px"}}>
        <div className="card" >
        <img className="card-img-top" src={img} alt="Card images" />
          
            <h5 className="card-title" style={{width : "150px", height: "40px",paddingBottom:"30px"}}>
            <a href="#" className="stretched-link"  style={{width : "100px", height: "20px", fontSize: "14px"}} onClick = {()=>dispatch(songAction(music))}>{title}</a>
            </h5>
        
        </div>
        </div>
    )
}

export default Card
