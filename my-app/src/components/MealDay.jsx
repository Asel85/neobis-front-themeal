import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from "axios";
import { Link } from 'react-router-dom';

const MealDay = () => {

    const [dataMeal, setDataMeal] = useState([]);

    useEffect(()=>{
        const getMeal = async ()=>{
          try{
            const result = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
            setDataMeal(result.data.meals[0]);
            console.log(result.data.meals[0])

          }catch(error){
            console.log("error")
          }
        }
        getMeal();
    },[]);

  return (
    <div>
        <Header />
        <div className="home">
          <section className='random-meal-block block'>
            <div className="random-meal-block__text block-text">
              <div className="random-meal-block__title">Meal of the Day</div>
              <Link to={dataMeal.idMeal}>
              <div className="random-meal-block__sub-title block__sub-title">
                {dataMeal.strMeal}
              </div>
              </Link>
              <div className="random-meal-block__info info">
                <div className='info__category category '>{dataMeal.strCategory}</div>
                <div className="info__slash slash"></div>
                <div className="info__area area">{dataMeal.strArea}</div>
                </div>
            </div>
            <div className="random-meal-block__img img">
             <img src={dataMeal.strMealThumb} alt={dataMeal.strMeal} />
            </div>
          </section>
          <h2>Find your Meal</h2>
          <form className="search__block">
          <input type="text" placeholder='Find your Meal'/>
          <button type='submit'>Search</button>
          </form>
        </div>
        
    </div>
  )
}

export default MealDay
