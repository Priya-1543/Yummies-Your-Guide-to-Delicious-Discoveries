import React from 'react'
import Custome_image from './Custome_image'
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef } from "react";

const Video_card = ({ ind }) => {

  let recipe_info = {
    "title": "title",
    "image": "image",
    "views":"views",
    "yt_id": "yt_id",
  };

  let response = localStorage.getItem('last-video-search');
  
  if (response !== null) {
    response = JSON.parse(response);

    if(response.videos.length <= ind) return(<></>);

    recipe_info = {
      "title": response.videos[ind].title,
      "image": response.videos[ind].thumbnail,
      "views":response.videos[ind].views,
      "yt_id": response.videos[ind].youTubeId,
    };

    return (
      <div className='recipe-card'>
        <Custome_image imgSrc={recipe_info.image} pt={'70%'} />
        <div className="recipe-card-info">

          <p className="recipe-title">{recipe_info.title}</p>

          <p id='used_ing_lst' className="recipe-desc">
            Views : {recipe_info.views}
          </p>

          <div className="flex-bx">

            <button className='recipe-btn' onClick={(e) => {
              window.open(`https://www.youtube.com/watch?v=${recipe_info.yt_id}`, "_blank");
            }}>WATCH VIDEO</button>

          </div>

        </div>
      </div>
    )
  }
  else return (
    <></>
  )
}

export default Video_card
