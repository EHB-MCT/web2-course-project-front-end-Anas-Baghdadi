document.getElementById("registerForm").addEventListener("submit",(async e=>{e.preventDefault();let t={username:document.getElementById("inputUsername").value,email:document.getElementById("inputEmail").value,password:document.getElementById("inputPassword").value,password2:document.getElementById("inputPassword2").value};if(t.password===t.password2)try{const e=await async function(e,t,r){try{let e=await fetch("http://localhost:4000/user/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw new Error(`Failed to fetch data: ${e.message}`)}}(0,0,t);alert(e.message),window.location.href="login.html"}catch(e){console.error("Error:",e),alert("An error occurred during registration.")}else alert("Passwords do not match")}));