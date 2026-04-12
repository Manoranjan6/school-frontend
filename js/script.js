// Mobile Menu
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const links = document.querySelectorAll("#nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Scroll Button
function scrollToSection() {
  document.getElementById("about").scrollIntoView();
}

// 🔥 FETCH NOTICES FROM BACKEND
async function loadNotices() {
  const res = await fetch("https://school-backend-yk3x.onrender.com/api/notices");
  const data = await res.json();

  const box = document.getElementById("notice-box");
  box.innerHTML = "";

  if (data.length === 0) {
    box.innerHTML = "<p>No notices available</p>";
    return;
  }

  data.forEach(n => {
    const p = document.createElement("p");
    p.textContent = "📢 " + n.title;
    box.appendChild(p);
  });
}

loadNotices();
