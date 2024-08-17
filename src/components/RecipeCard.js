import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';

const RecipeCard = ({ recipe, tagColors }) => {
  const { name, image, tags, time, calories, instructions, references } = recipe;
  console.log(name, tags);

  return (
    <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Image at the top */}
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        
        {/* Title and Tags */}
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          
          {/* Tags */}
          <Box mt={1} >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                style={{ 
                  margin: '2px', 
                  backgroundColor: tagColors[tag] || '#cccccc',
                  color: '#ffffff'
                }}
              />
            ))}
          </Box>
        </CardContent>
        
        {/* Bottom row with cook time and calories */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          bgcolor="background.paper"
          borderTop={1}
          borderColor="divider"
        >
          {/* Cook Time */}
          {time !== undefined && (
            <Typography variant="body2" color="textSecondary">
              Time: {time || "N/A"} mins
            </Typography>
          )}
          
          {/* Calories */}
          {calories !== undefined && (
            <Typography variant="body2" color="textSecondary">
              Calories: {calories || "N/A"}
            </Typography>
          )}
        </Box>
      </Card>
    </Link>
  );
};

export default RecipeCard;
