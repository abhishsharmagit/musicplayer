import React from 'react'
import "../App.css"


const Card = ({title, img, music, musicChange}) => {

 
  
    return (
        <div className="container playhover">
        <p></p>
        <div className="card" style={{width : "400px"}} >
        <img className="card-img-top" src={img} alt="Card images" />
          <div className="card-body center">
            {/* <h4 className="card-title"></h4> */}
            <a href="#" className="btn btn-outline-success center-block stretched-link" onClick = {()=>musicChange(music)}>{title}</a>
         
          </div>
        
        </div>
        </div>
    )
}

export default Card
