// Add an event listener for the login form
document
  .getElementById("loginform")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Extract user credentials from the input fields
    let user = {
      email: document.getElementById("inputEmail").value,
      password: document.getElementById("inputPassword").value,
    };

    try {
      // Send a login request to the server
      const result = await getData(
        "http://localhost:4000/user/login",
        "POST",
        user
      );

      // Check the login result
      if (result.message === "You are logged in!") {
        // Display a success message and store user data in sessionStorage
        alert("Login successful");
        sessionStorage.setItem("user", JSON.stringify(result.data));
        // Redirect the user to the home page
        window.location.href = "home.html";
      } else {
        // Log an error message if login fails
        console.error("Login failed:", result.message);
        // Handle the case where login fails, for example, display a message to the user
      }
    } catch (error) {
      // Display an authentication error message
      alert("Authentication error");
      // Log errors related to the login request
      console.error("Error during login:", error);
      // Handle errors related to the login request here
    }
  });

// Function to make a generic data-fetching request
async function getData(url, method, data) {
  // Send a fetch request to the specified URL with the provided method and data
  const resp = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check if the request was successful; if not, throw an error
  if (!resp.ok) {
    throw new Error(`Failed to fetch data: HTTP error! Status: ${resp.status}`);
  }

  // Return the JSON data from the response
  return await resp.json();
}
