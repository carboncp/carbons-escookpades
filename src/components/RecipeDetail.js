// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
//import recipes from '../data/recipes.json'; // Adjust the path if needed

const RecipeDetail = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/data/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data));
    setRecipes(recipes);
  }, []);

  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id); // Adjust this if you fetch data from an API

  if (!recipe) return <Typography>Recipe not found</Typography>;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={recipe.name}
        height="400"
        image={recipe.image}
      />
      <CardContent>
        <Typography variant="h4" component="div">
          {recipe.name}
        </Typography>
        <Typography variant="body1" component="p">
          {recipe.instructions}
        </Typography>
        {/* Add more details as needed */}
      </CardContent>
    </Card>
  );
};

export default RecipeDetail;
