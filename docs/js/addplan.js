(()=>{let e;async function t(){try{const t=await fetch("http://localhost:4000/meal/meals"),o=await t.json(),n=JSON.parse(sessionStorage.getItem("user")).uuid,l=o.filter((e=>e.userId===n));e.innerHTML=l.map((e=>`<div class="meal">\n                 <h2>${e.name}</h2>\n                 <p>${e.calories} calories</p>\n                 <p class="description">${e.description}</p>\n                 <button class="delete-button" onclick="deleteMeal('${e._id}')">Delete</button>\n               </div>`)).join("")}catch(e){console.error("Error retrieving meals:",e)}}document.addEventListener("DOMContentLoaded",(function(){const o=document.getElementById("mealForm");e=document.getElementById("mealList"),o.addEventListener("submit",(async function(e){e.preventDefault();const o={name:document.getElementById("name").value,description:document.getElementById("description").value,calories:document.getElementById("calories").value,userId:JSON.parse(sessionStorage.getItem("user")).uuid};try{(await fetch("http://localhost:4000/meal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).ok?(console.log("Meal added successfully"),t()):console.error("Failed to add meal")}catch(e){console.error("Error:",e)}})),t()})),window.deleteMeal=async function(e){try{(await fetch(`http://localhost:4000/meal/${e}`,{method:"DELETE"})).ok?(console.log("Meal deleted successfully"),t()):console.error("Failed to delete meal")}catch(e){console.error("Error:",e)}}})();