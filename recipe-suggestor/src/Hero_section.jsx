import React from 'react';
import './components/Navbar2.scss';
import Custome_image from './Custome_image';
import { useNavigate } from 'react-router-dom';

const Hero_section = () => {
  const navigate = useNavigate();

  const images = [
    '../public/gallery/pizza.jpg',
    '../public/gallery/burger2.jpg',
    '../public/gallery/momos.jpg',
    '../public/gallery/waffel.jpg',
    '../public/gallery/samosa.jpg',
    '../public/gallery/dhosa.jpg',
    '../public/gallery/chas.jpg',
    '../public/gallery/undhu.jpg',
    '../public/gallery/tacos.jpg',
  ]

  function handleClickCook(){
    navigate('/search_recipe');
  }

  

  return (
    <div className='section hero'>

      <div className='col typography'>
        <h1 className='title1'>About Yummiees</h1>
        <p className='info'>Welcome to our website! At Yummiees, we're dedicated to satisfying your cravings with the most delectable recipes you can whip up. Discover dishes that perfectly match the ingredients you have on hand. Simply input your ingredients, and we'll provide you with mouthwatering recipe suggestions. Enhance your culinary prowess by watching instructional videos tailored to the recipes you can create with your selected ingredients. Your last searches will be conveniently saved for quick reference, making it effortless to revisit your favorite recipes. And that's not all - indulge in some hearty laughter with our collection of food jokes, quotes and fun facts. So, what are you waiting for? Click the 'Cook Now' button and embark on a journey to explore our creative recipes.
        </p>
        <button className='btn' onClick={handleClickCook}>Cook Now</button>
      </div>

      <div className='col gallery'>
        {images.map((src, index) => (
          <Custome_image key={index} imgSrc={src} pt={"70%"} />
        ))}
      </div>
    </div>
  )
}

export default Hero_section
