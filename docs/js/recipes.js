(()=>{const e=document.getElementById("generateButton"),t=(document.getElementById("sortSelect"),document.getElementById("recipeContainer"));window.addEventListener("load",(()=>{o(),c=JSON.parse(localStorage.getItem("favorites"))||[]}));let n=[],c=[];function o(){t.innerHTML="",n=[],fetch("https://api.spoonacular.com/recipes/random?number=20&apiKey=ca4f5f3814034176897c6a3861ce159d").then((e=>e.json())).then((e=>{n=e.recipes,function(e){Array.from(new Set(e.map((e=>e.id)))).map((t=>e.find((e=>e.id===t)))).forEach((e=>{const n=document.createElement("div");n.classList.add("recipe");const c=document.createElement("a");c.href=e.sourceUrl,c.target="_blank";const o=document.createElement("img");o.src=e.image,o.alt=e.title,c.appendChild(o);const d=document.createElement("h3");d.textContent=e.title,c.appendChild(d),n.appendChild(c);const r=document.createElement("button");r.textContent="Add to Favorites",r.addEventListener("click",(()=>a(e.id))),n.appendChild(r),t.appendChild(n)}))}(n)})).catch((e=>{console.error("Error:",e)}))}function a(e){const t=n.find((t=>t.id===e));t&&(c.push(t),localStorage.setItem("favorites",JSON.stringify(c)))}e.addEventListener("click",o)})();