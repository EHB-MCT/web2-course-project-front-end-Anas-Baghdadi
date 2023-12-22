document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "./login.html";
});

