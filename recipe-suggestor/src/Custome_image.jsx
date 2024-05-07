import React from 'react'

const Custome_image = ({imgSrc,pt}) => {
  return (
    <div className='custome-image' style={{paddingTop: pt}}>
      <img src={imgSrc} alt=""/>
    </div>
  )
}

export default Custome_image
