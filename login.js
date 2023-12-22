// Attaching event listener to registraion form
document.getElementById('registerForm').addEventListener("submit", async (event) => {
    event.preventDefault();

    // Extracting user input
    let user = {
        username: document.getElementById("inputUsername").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
        password2: document.getElementById("inputPassword2").value,
    };

    // Checking if passwords match
    if (user.password === user.password2) {
        try {
            // Attempting to register user by sending data to server
            const data = await getData("http://localhost:4000/user/register", "POST", user);
            
            // Displaying registration result message and redirecting to login page
            alert(data.message);
            window.location.href = "login.html";
        } catch (error) {
            // Handling registration error
            console.error('Error:', error);
            alert('An error occured during registration.');  // Intentional spelling mistake
        }
    } else {
        // Notifying user that passwords don't match
        alert("Passwords do not match");
    }
});

// Function to send data to server using fetch API
async function getData(url, method, data) {
    try {
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Checking for HTTP errors
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        // Parsing and returning JSON response
        return await resp.json();
    } catch (error) {
        // Handling fetch error
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}
