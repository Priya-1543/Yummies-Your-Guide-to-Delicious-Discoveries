import React from 'react'
import Custome_image from './Custome_image'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

const Recipe_card = ({ ind }) => {

  const navigateTo = useNavigate();
  let recipe_info = {
    "title": "title",
    "image": "image",
    "ing_id": "ing_id",
    "used_ing": "used_ing"
  };

  let desc = "";

  let response = localStorage.getItem('last-search');

  if (response !== null) {
    response = JSON.parse(response);

    recipe_info = {
      "title": response[ind].title,
      "image": response[ind].image,
      "ing_id": response[ind].id,
      "used_ing": response[ind].usedIngredients.map(ingredient => ingredient.name)
    };

    desc = "";

    recipe_info.used_ing.forEach(ingredient => {
      desc += ingredient + " | "
    })

    return (
      <div className='recipe-card'>
        <Custome_image imgSrc={recipe_info.image} pt={'70%'} />
        <div className="recipe-card-info">

          <p className="recipe-title">{recipe_info.title}</p>

          <p id='used_ing_lst' className="recipe-desc">
            Used Ingredients  : {desc}
          </p>


        </div>
        <div className="flex-bx">

          <button className='recipe-btn' onClick={(e) => {
            navigateTo(`/recipe/${ind}`)
          }}>VIEW DETAILS</button>

        </div>
      </div>
    )
  }
  else return (
    <></>
  )
}

export default Recipe_card
