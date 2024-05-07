import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useParams } from 'react-router-dom';
import Ingredient_card from './Ingredient_card';

export default function DetailRecipe() {
    let { slug } = useParams();
    let response = localStorage.getItem('last-search');

    if (response !== null) {
        response = JSON.parse(response);

        let missedIngredientCount = response[slug].missedIngredientCount;
        let missedIngredients = [];
        response[slug].missedIngredients.forEach(element => {
            let item = {
                "miss_ing_name": element.name,
                "miss_ing_image": element.image,
                "miss_ing_amt":element.amount,
                "miss_ing_unit":element.unit
            }
            missedIngredients.push(item);
        });

        let usedIngredientCount = response[slug].usedIngredientCount;
        let usedIngredients = [];
        response[slug].usedIngredients.forEach(element => {
            let item = {
                "used_ing_name": element.name,
                "used_ing_image": element.image,
                "used_ing_amt":element.amount,
                "used_ing_unit":element.unit
            }
            usedIngredients.push(item);
        });

        // console.log(missedIngredientCount);
        // console.log(missedIngredients);
        // console.log(usedIngredientCount);
        // console.log(usedIngredients);

        return (
            <>
                <Navbar />
                <div className='DetailRecipe-container'>

                    <div className='recipes-container'>
                        {missedIngredients.map((item, index) => (
                            <Ingredient_card key={index} ingredient={item.miss_ing_name} image={item.miss_ing_image} amount={item.miss_ing_amt} unit={item.miss_ing_unit} flag={'absent'}/>
                        ))}

                        {usedIngredients.map((item, index) => (
                            <Ingredient_card key={index} ingredient={item.used_ing_name} image={item.used_ing_image} amount={item.used_ing_amt} unit={item.used_ing_unit} flag={'present'}/>
                        ))}
                    </div>
                </div>
                <Footer />
            </>
        )

    }
    else return (
        <></>
    )
}
