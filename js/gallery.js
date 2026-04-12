async function loadGallery() {
  const res = await fetch("https://school-backend-yk3x.onrender.com/api/gallery");
  const data = await res.json();

  const container = document.getElementById("gallery");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No images available</p>";
    return;
  }

  const grouped = {};

  // Group data
  data.forEach(item => {
    if (!grouped[item.year]) grouped[item.year] = {};
    if (!grouped[item.year][item.category]) grouped[item.year][item.category] = [];

    grouped[item.year][item.category].push(item);
  });

  // Sort years DESC (latest first)
  const years = Object.keys(grouped).sort((a, b) => b - a);

  years.forEach(year => {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("year");

    yearDiv.innerHTML = `<h2>${year}</h2>`;

    const categories = grouped[year];

    for (let cat in categories) {
      const catDiv = document.createElement("div");
      catDiv.classList.add("category");

      catDiv.innerHTML = `<h3>${cat}</h3>`;

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("images");

      categories[cat].forEach(img => {
        imgDiv.innerHTML += `<img src="${img.imageUrl}">`;
      });

      catDiv.appendChild(imgDiv);
      yearDiv.appendChild(catDiv);
    }

    container.appendChild(yearDiv);
  });
}

loadGallery();