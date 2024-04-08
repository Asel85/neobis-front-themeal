import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from "axios";
import { Link } from 'react-router-dom';

const MealDay = () => {

    const [dataMeal, setDataMeal] = useState([]);
    const [searchMeal, setSearchMeal] = useState("");
    const [searchDataMeal, setSearchDataMeal] = useState([]);

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

    const getSearchMeal = async (e)=>{
      e.preventDefault();
      try{
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);
        if(res.data.meals){
           setSearchDataMeal(res.data.meals);
        }else{
          setSearchDataMeal([]);
        }

      }catch(error){
        console.log("error");
      }
    }
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
          <form className="search__block" onSubmit={getSearchMeal}>
          <input type="text" placeholder='Find your Meal'value={searchMeal} onChange={(e)=>{setSearchMeal(e.target.value)}}/>
          <button type='submit'>Search</button>
          </form>
          {searchDataMeal && searchDataMeal.map((item)=>
            (
                <Link to={item.idMeal}>
                <div className="search-block">
                <img src={item.strMealThumb} alt={item.strMeal} className="search-block__img" />
                <div className="search-block__content">
                  <div className="search-block__title">{item.strMeal}</div>
                  <div className="info">
                    <div className="category">{item.strCategory}</div>
                    <div className="slash"></div>
                    <div className="area">{item.strArea}</div>
                  </div>
                </div>
                </div>
                </Link>
            )
          )}
        </div>    
    </div>
  )
}

export default MealDay
