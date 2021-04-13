import React from 'react'
import "../App.css"
import { music } from "../store/action";
import { useDispatch } from "react-redux";



const Card = ({title, img, music: Musics}) => {

  const dispatch = useDispatch()
  
    return (
        <div className="container playhover">
        <p></p>
        <div className="card" style={{width : "400px"}} >
        <img className="card-img-top" src={img} alt="Card images" />
          <div className="card-body center">
            {/* <h4 className="card-title"></h4> */}
            <a href="#" className="btn btn-outline-success center-block stretched-link" onClick = {()=>dispatch(music(Musics))}>{title}</a>
         
          </div>
        
        </div>
        </div>
    )
}

export default Card
