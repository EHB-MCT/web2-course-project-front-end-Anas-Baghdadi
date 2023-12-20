// Reference to the HTML element for displaying favorite recipes
const favoriteRecipeContainer = document.getElementById('favoriteRecipeContainer');

// Load favorite recipes on page load
window.addEventListener('load', () => {
  loadFavorites();
});

// Function to display favorite recipes
function loadFavorites() {
  favoriteRecipeContainer.innerHTML = ''; // Clear the current content

    // Load favorite recipes from local storage
  favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Display each favorite recipe
  favorites.forEach(recipe => {
    displayFavoriteRecipe(recipe);
  });
}

// Function to display a favorite recipe
function displayFavoriteRecipe(recipe) {
    // Create the favorite recipe card
    const favoriteRecipeCard = document.createElement('div');
    favoriteRecipeCard.classList.add('recipe'); 

    // Create a link element for the recipe details page
    const recipeLink = document.createElement('a');
    recipeLink.href = recipe.sourceUrl; 
    recipeLink.target = "_blank"; 

    // Set recipe image
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image; 
    recipeImage.alt = recipe.title; 
    recipeLink.appendChild(recipeImage);

    // Set recipe title as the link's text content
    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.title;
    recipeLink.appendChild(recipeTitle);

    // Add recipe link to the card
    favoriteRecipeCard.appendChild(recipeLink);

    // "Remove from Favorites" button
    const removeFromFavoritesButton = document.createElement('button');
    removeFromFavoritesButton.textContent = 'Remove';
    removeFromFavoritesButton.addEventListener('click', () => removeFromFavorites(recipe.id));
    favoriteRecipeCard.appendChild(removeFromFavoritesButton);

    // Add the favorite recipe card to the container
    favoriteRecipeContainer.appendChild(favoriteRecipeCard);
  }



// Function to remove a recipe from favorites
  function removeFromFavorites(recipeId) {
    favorites = favorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites(); 
  }


  function loadFavorites() {
    favoriteRecipeContainer.innerHTML = ''; // Clear 

    // Load favorite recipes from local storage
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Display each favorite recipe
    favorites.forEach(recipe => {
      displayFavoriteRecipe(recipe);
    });
}