import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { TextField, Grid, InputLabel, MenuItem, Select, FormControl, Container, Typography, Stack, Chip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
//import recipesData from '../data/recipes.json';
//import tagColors from '../data/tagColors';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortOption, setSortOption] = useState('name'); // Default sort option
  const [tagColors, setTagColors] = useState({});

  /*
  useEffect(() => {
    const recipes = recipesData;
    setRecipes(recipes);
    setFilteredRecipes(recipes);

    const allTags = [...new Set(recipes.flatMap(recipe => recipe.tags))];
    setTags(allTags);
  }, []);
  */

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/data/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data));

    setRecipes(recipes);
    setFilteredRecipes(recipes);

    const allTags = [...new Set(recipes.flatMap(recipe => recipe.tags))];
    setTags(allTags);
  }, []);

  useEffect(() => {
    // Fetch the tagColors JSON data from the public folder
    fetch('/data/tagColors.json')
      .then((response) => response.json())
      .then((data) => {
        // Convert the array of tag-color pairs into a dictionary object
        const colorDictionary = data.reduce((acc, tag) => {
          acc[tag.name] = tag.color;
          return acc;
        }, {});
        setTagColors(colorDictionary);  // Set the tag colors dictionary in state
      });
  }, []);

  useEffect(() => {
    let result = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedTags.length > 0) {
      result = result.filter(recipe =>
        selectedTags.every(tag => recipe.tags.includes(tag))
      );
    }

    switch (sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'time':
        result.sort((a, b) => {
          if (a.time === b.time) {
            return a.name.localeCompare(b.name);
          }
          return (a.time || 0) - (b.time || 0);
        });
        break;
      case 'calories':
        result.sort((a, b) => {
          if (a.calories === b.calories) {
            return a.name.localeCompare(b.name);
          }
          return (a.calories || 0) - (b.calories || 0);
        });
        break;
      default:
        break;
    }

    setFilteredRecipes(result);
  }, [search, sortOption, selectedTags, recipes]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const sortedTags = tags.filter(tag => !selectedTags.includes(tag))
    .concat(selectedTags);

  const getFilteredRecipes = () => {
    return filteredRecipes.filter(recipe =>
      selectedTags.length === 0 || recipe.tags.some(tag => selectedTags.includes(tag))
    );
  };

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: 2, marginBottom: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          margin="normal"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <FormControl size="small" variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="name">Alphabetical</MenuItem>
            <MenuItem value="time">Time</MenuItem>
            <MenuItem value="calories">Calories</MenuItem>
          </Select>
        </FormControl>
      </Stack>


      <Stack direction="row" spacing={1} flexWrap="wrap" marginBottom={2}>
        {/* Display selected tags at the top */}
        {selectedTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            deleteIcon={<ClearIcon />}
            onDelete={() => handleTagRemove(tag)}
            sx={{ backgroundColor: tagColors[tag] || '#ddd', margin: 0.5 }}
          />
        ))}
        {/* Display remaining tags below */}
        {sortedTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            sx={{ backgroundColor: tagColors[tag] || '#ddd', margin: 0.5 }}
          />
        ))}
      </Stack>

      <Grid container spacing={2}>
        {getFilteredRecipes().map((recipe, index) => (
          <Grid 
            item 
            xs={6} 
            sm={3} 
            md={3} 
            key={recipe.id} 
          >
            <RecipeCard recipe={recipe} tagColors={tagColors} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
