document.getElementById('registerForm').addEventListener("submit", async (event) => {
    event.preventDefault();

    let user = {
        username: document.getElementById("inputUsername").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
        password2: document.getElementById("inputPassword2").value,
    };

    // Check the passwords
    if (user.password === user.password2) {
        try {
            // Register the user
            const data = await getData("http://localhost:4000/user/register", "POST", user);
            alert(data.message);
            window.location.href = "login.html";
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
    } else {
        alert("Passwords do not match");
    }
});

async function getData(url, method, data) {
    try {
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        return await resp.json();
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}
