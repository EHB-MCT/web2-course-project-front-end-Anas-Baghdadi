const apiKey = 'ca4f5f3814034176897c6a3861ce159d';
const timeFrame = 'day';
document.getElementById('generateButton').addEventListener('click', () => {
  const targetCalories = document.getElementById('caloriesInput').value;
  fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}`)
    .then(response => response.json())
    .then(data => {
      const meals = data.meals;
      const mealContainer = document.getElementById('mealContainer');
      mealContainer.innerHTML = ''; // Clear previous meal plan
      meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        const titleElement = document.createElement('h2');
        titleElement.textContent = meal.title;
        mealDiv.appendChild(titleElement);


        // if (meal.nutrients && meal.nutrients.calories !== undefined) {

        //   // add calories of meal
        //   const caloriesElement = document.createElement('p');
        //   caloriesElement.textContent = `Calories: ${meal.nutrients.calories}`;
        //   mealDiv.appendChild(caloriesElement);
        // }

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');


        // add image of meal if its available
        if (meal.imageType) {
          const imageElement = document.createElement('img');
          imageElement.src = `https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`;
          mealDiv.appendChild(imageElement);
        }
        // add prep time 
        const readyInMinutesElement = document.createElement('p');
        readyInMinutesElement.textContent = `Ready in ${meal.readyInMinutes} minutes`;
        mealDiv.appendChild(readyInMinutesElement);
        // add portions of the meal
        const servingsElement = document.createElement('p');
        servingsElement.textContent = `Servings: ${meal.servings}`;
        mealDiv.appendChild(servingsElement);
        // add link to the recipe
        const recipeLinkElement = document.createElement('a');
        recipeLinkElement.href = meal.sourceUrl;
        recipeLinkElement.textContent = 'See the full recipe';
        recipeLinkElement.target = '_blank'; // add link in new tab
        recipeLinkElement.classList.add('recipe-link');
        mealDiv.appendChild(recipeLinkElement);

        mealContainer.appendChild(mealDiv);
      });
    })
    .catch(error => {
      console.log(error);
    });
});