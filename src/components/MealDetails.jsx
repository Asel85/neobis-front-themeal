import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import Header from './Header';

const MealDetails = () => {
  const [mealDetails, setMealDetails] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    const getMealDetail = async ()=>{
      try{
        const result = await axios.get( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`); 
        setMealDetails(result.data.meals[0]);
        console.log(result.data.meals[0])
      }catch(error){
        console.log("error");
      }
      
    }
    getMealDetail();
  },[id])

  const printIngredientsWithMeasure = (mealDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure });
        }
    }
    return ingredients.map((item, index) => (
        <li className='ingredients' key={index}>
           - {item.ingredient} <spam>{item.measure}</spam>
        </li>
    ));
};
  return (
    <>
    <Header/>
    <div className='meal-detail'>
      <div className="meal-detail__info-block block">
      <div className="block-text">
        <div className="block__sub-title">{mealDetails.strMeal}
        </div>
        <div className="info">
          <div className="category">{mealDetails.strCategory}</div>
          <div className="slash"></div>
          <div className="area">{mealDetails.strArea}</div>
        </div>
        <div className="block-ingredients">
          <ul>{printIngredientsWithMeasure(mealDetails)}</ul>
        </div>
      </div>
      <div className="img">
        <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      </div>
      </div>
      <div className="meal-detail-instruction">
        <div className="instruction__title">Instruction</div>
        <p className="instruction__text">{mealDetails.strInstructions}</p>
        <a href={mealDetails.strYoutube} className="instruction__video">Watch on YouTube</a>
      </div>
    </div>
    </>
  )
}

export default MealDetails
