import React, { useState, useRef, useEffect } from 'react'
import "./slider.css"
import "./thumb.css"

type Prop = {
  percentage: number
  onChange: Function
}

const Slider: React.FC<Prop> = ({ percentage = 0, onChange }) => {
  const [position, setPosition] = useState(0)
 
   const thumbRef = useRef()
  useEffect(() => {
     
    setPosition(percentage)
    
  }, [percentage])

 //const pos = inputRef.current.value = 0

  return (
    <div className='slider-container'>

      <div
        className='thumb'
        //@ts-ignore
        ref={thumbRef}
        style={{
          left: `${position}%`,
          
        }}
      ></div>
      <input
        type='range'
        //ref = {inputRef}
        
        value={position}
      
        className = "range"
        //@ts-ignore
        onChange={onChange}
        style={{width:"100%" }}
      />
    </div>
  )
}

export default Slider
