import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', // Light grey background
        padding: 3, // Padding around the header
        textAlign: 'center', // Center align the text
        marginBottom: 4 // Space below the header
      }}
    >
      <Typography
        variant="h2" // You can use h1, h2, h3, etc. based on the size you need
        component="h1"
        sx={{ 
          fontWeight: 'bold', // Makes the text bold
          color: '#333', // Dark color for the text
          letterSpacing: '1px', // Adds spacing between letters
        }}
      >
        carbon's escookpades
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ 
          marginTop: 1, // Space above the subtitle
          color: '#666', // Lighter color for the subtitle
        }}
      >
        Discover your next favorite recipe
      </Typography>
    </Box>
  );
};

export default Header;
