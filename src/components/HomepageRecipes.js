import React from "react";
import { Link } from "react-router-dom";
import * as Mui from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

function HomepageRecipes({ defaultRecipes, landingPage}) {

  const recipeCarousel = defaultRecipes.map(recipe => {
    return <Carousel.Item key={recipe.recipeId}>
      <img className="d-block w-100" src={recipe.image} alt={recipe.title}/>
      <Carousel.Caption>
        <h3>{recipe.title}</h3>
        <Link style={{textDecoration: "none"}} to={`/reciperesults/${recipe.recipeId}`}><Mui.Button style={{color: "white"}} size="small">View</Mui.Button></Link>
      </Carousel.Caption>
    </Carousel.Item>
  })

  return (
    <div>
      <Carousel className={landingPage ? "carousel carousel-display-none" : "carousel"}>
        {recipeCarousel}
      </Carousel>
    </div>
  );
}

export default HomepageRecipes;
