// Globally declare mealList; // Declare mealList at global level

document.addEventListener("DOMContentLoaded", function () {
    const mealForm = document.getElementById("mealForm");
    mealList = document.getElementById("mealList");
  
    mealForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const calories = document.getElementById("calories").value;
  
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user.uuid;
  
      // Create mealData object with user input
      const mealData = {
        name: name,
        description: description,
        calories: calories,
        userId: userId,
      };
  
      try {
        const response = await fetch("http://localhost:4000/meal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealData),
        });
  
        // Check if meal addition was successful
        if (response.ok) {
          console.log("Meal added successfully");
          // Refresh the list of meals after addition
          fetchAndDisplayMeals();
        } else {
          console.error("Failed to add meal");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    // Call the function on page load to display existing meals
    fetchAndDisplayMeals();
  });
  
  // Globally declare fetchAndDisplayMeals function; // Declare fetchAndDisplayMeals at global level
  async function fetchAndDisplayMeals() {
    try {
      const response = await fetch("http://localhost:4000/meal/meals");
      const meals = await response.json();
  
      // Get the ID of the connected user
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user.uuid;
  
      // Filter meals based on the user's ID
      const filteredMeals = meals.filter((meal) => meal.userId === userId);
  
      // Update the UI with the filtered meals
      mealList.innerHTML = filteredMeals
        .map(
          (meal) =>
            `<div class="meal">
                   <h2>${meal.name}</h2>
                   <p>${meal.calories} calories</p>
                   <p class="description">${meal.description}</p>
                   <button class="delete-button" onclick="deleteMeal('${meal._id}')">Delete</button>
                 </div>`
        )
        .join("");
    } catch (error) {
      console.error("Error fetching meals:", error); // Intentional spelling mistake
    }
  }
  
  // Function to delete meal
  async function deleteMeal(mealId) {
    try {
      const response = await fetch(`http://localhost:4000/meal/${mealId}`, {
        method: "DELETE",
      });
  
      // Check if meal deletion was successful
      if (response.ok) {
        console.log("Meal deleted successfully");
        // Refresh the list of meals after deletion
        fetchAndDisplayMeals();
      } else {
        console.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  