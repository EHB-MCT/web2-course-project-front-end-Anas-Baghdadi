document.getElementById("loginform").addEventListener("submit",(async e=>{e.preventDefault();let t={email:document.getElementById("inputEmail").value,password:document.getElementById("inputPassword").value};try{const e=await async function(e,t,o){const n=await fetch("http://localhost:4000/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!n.ok)throw new Error(`Failed to fetch data: HTTP error! Status: ${n.status}`);return await n.json()}(0,0,t);"You are logged in!"===e.message?(alert("Login successful"),sessionStorage.setItem("user",JSON.stringify(e.data)),window.location.href="home.html"):console.error("Login failed:",e.message)}catch(e){alert("Authentication error"),console.error("Error during login:",e)}}));