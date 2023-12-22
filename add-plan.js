// Declare mealList globally to make it accessible across functions
let mealList;

// Execute the following code when the DOM (Document Object Model) has been fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the meal form and meal list elements
  const mealForm = document.getElementById("mealForm");
  mealList = document.getElementById("mealList");

  // Add an event listener to the meal form for form submission
  mealForm.addEventListener("submit", async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get meal details from the form
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const calories = document.getElementById("calories").value;

    // Retrieve the user information from the session storage
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user.uuid;

    // Create an object with meal data
    const mealData = {
      name: name,
      description: description,
      calories: calories,
      userId: userId,
    };

    try {
      // Send a POST request to add a new meal
      const response = await fetch("http://localhost:4000/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      });

      // Check if the meal addition was successful
      if (response.ok) {
        console.log("Meal added successfully");
        // Refresh the meal list after adding a new meal
        fetchAndDisplayMeals();
      } else {
        console.error("Failed to add meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Call the fetchAndDisplayMeals function to show existing meals when the page loads
  fetchAndDisplayMeals();
});

// Declare fetchAndDisplayMeals globally to make it accessible
async function fetchAndDisplayMeals() {
  try {
    // Fetch the list of meals from the server
    const response = await fetch("http://localhost:4000/meal/meals");
    const meals = await response.json();

    // Retrieve the ID of the logged-in user
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user.uuid;

    // Filter meals based on the user's ID
    const filteredMeals = meals.filter((meal) => meal.userId === userId);

    // Update the user interface with the filtered meals
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
    console.error("Error retrieving meals:", error);
  }
}

// Function to delete a meal
async function deleteMeal(mealId) {
  try {
    // Send a DELETE request to remove the specified meal
    const response = await fetch(`http://localhost:4000/meal/${mealId}`, {
      method: "DELETE",
    });

    // Check if the meal deletion was successful
    if (response.ok) {
      console.log("Meal deleted successfully");
      // Refresh the meal list after deleting a meal
      fetchAndDisplayMeals();
    } else {
      console.error("Failed to delete meal");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
