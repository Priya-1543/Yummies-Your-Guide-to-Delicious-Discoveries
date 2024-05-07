import React from 'react'
import Custome_image from './Custome_image'

const Ingredient_card = ({ingredient,image,amount,unit,flag}) => {
  return (
    <div className={`recipe-card ${flag}`}>
        <Custome_image imgSrc={image} pt={'50%'} />
        <div className="recipe-card-info">
          <p className="recipe-title">{ingredient}</p>
          <p className="recipe-desc">{amount} {unit}</p>
        </div>
    </div>
  )
}

export default Ingredient_card
