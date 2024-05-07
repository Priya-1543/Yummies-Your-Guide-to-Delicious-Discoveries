import React from 'react'
import { useNavigate } from 'react-router-dom';

const Things_to_do = () => {

  const navigate = useNavigate();

  const lst = [
    "Savor Food Jokes, Quotes and Fun Fact",
    "Discover Recipes",
    "Watch Recipe Videos",
    "Save Your Searches",
  ]

  function handleClickSignup() {
    navigate('/signup');
  }

  return (
    <div className='section things_to_do'>

      <div className='col about_img'>
        <img src='../public/gallery/julab_jamun.jpg' />
      </div>

      <div className='col typography'>
        <h1 className='title1'>Things you can explore</h1>

        {lst.map((item, index) => (
          <p className='to_do' key={index}>{item}</p>
        ))}

        <button className='btn' onClick={handleClickSignup}>Sign Up</button>
      </div>

    </div>
  )
}

export default Things_to_do
