const token = localStorage.getItem("token");


// 🚫 Protect page
if (!token) {
  window.location.href = "admin-login.html";
}

// 🔁 Section switch
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin-login.html";
}

// =======================
// 📊 DASHBOARD
// =======================
async function loadDashboard() {
  try {
    const a = await fetch("https://school-backend-yk3x.onrender.com/api/admission", {
      headers: { Authorization: token }
    });
    const admissions = await a.json();

    const n = await fetch("https://school-backend-yk3x.onrender.com/api/notices/all", {
      headers: { Authorization: token }
    });
    const notices = await n.json();

    const g = await fetch("https://school-backend-yk3x.onrender.com/api/gallery");
    const gallery = await g.json();

    document.getElementById("totalAdmissions").innerText = admissions.length;
    document.getElementById("totalNotices").innerText = notices.length;
    document.getElementById("totalImages").innerText = gallery.length;

  } catch (err) {
    console.error("Dashboard error:", err);
  }
}

// =======================
// 📥 ADMISSIONS
// =======================
let allAdmissions = [];

async function loadAdmissions() {
  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/admissions", {
      headers: { Authorization: token }
    });

    allAdmissions = await res.json();
    renderTable(allAdmissions);

  } catch (err) {
    console.error("Admissions error:", err);
  }
}

function renderTable(data) {
  const table = document.getElementById("admissionTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach((d, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${d.studentName}</td>
        <td>${d.classSeeking}</td>
        <td>${d.dob}</td>
        <td>${d.parentName}</td>
        <td>${d.phone}</td>
        <td>${d.email || '-'}</td>
        <td>${d.presentSchool || '-'}</td>
        <td>${d.message || '-'}</td>
        <td>${new Date(d.submittedAt).toLocaleString()}</td>
      </tr>
    `;
  });
}

// 🔍 SEARCH
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = allAdmissions.filter(d =>
      d.studentName.toLowerCase().includes(value) ||
      d.phone.includes(value)
    );

    renderTable(filtered);
  });
}

// =======================
// 📥 EXPORT EXCEL (CORRECT)
// =======================
async function exportExcel() {
  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/admission/export", {
      headers: { Authorization: token }
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "admissions.xlsx";
    a.click();

  } catch (err) {
    console.error("Export error:", err);
  }
}

// =======================
// 🖼 GALLERY
// =======================

// Load years
async function loadYears() {
  const res = await fetch("https://school-backend-yk3x.onrender.com/api/gallery/years");
  const years = await res.json();

  const select = document.getElementById("yearSelect");
  if (!select) return;

  select.innerHTML = "";

  years.forEach(y => {
    select.innerHTML += `<option value="${y}">${y}</option>`;
  });

  if (years.length > 0) loadCategories(years[0]);
}

// Load categories
async function loadCategories(year) {
  const res = await fetch(`https://school-backend-yk3x.onrender.com/api/gallery/categories/${year}`);
  const cats = await res.json();

  const select = document.getElementById("categorySelect");
  if (!select) return;

  select.innerHTML = "";

  cats.forEach(c => {
    select.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// Year change
const yearSelect = document.getElementById("yearSelect");
if (yearSelect) {
  yearSelect.addEventListener("change", function () {
    loadCategories(this.value);
  });
}

// Upload image
const uploadForm = document.getElementById("uploadForm");
if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let year = document.getElementById("newYear").value || document.getElementById("yearSelect").value;
    let category = document.getElementById("newCategory").value || document.getElementById("categorySelect").value;

    const formData = new FormData();
    formData.append("image", document.getElementById("image").files[0]);
    formData.append("year", year);
    formData.append("category", category);

    await fetch("https://school-backend-yk3x.onrender.com/api/gallery", {
      method: "POST",
      headers: { Authorization: token },
      body: formData
    });

    alert("Uploaded successfully");

    loadYears();
    loadGalleryAdmin();
  });
}

// Load gallery
async function loadGalleryAdmin() {
  const res = await fetch("https://school-backend-yk3x.onrender.com/api/gallery");
  const data = await res.json();

  const div = document.getElementById("galleryPreview");
  if (!div) return;

  div.innerHTML = "";

  data.forEach(img => {
    div.innerHTML += `
      <div>
        <img src="${img.imageUrl}" width="100">
        <button onclick="deleteImage('${img._id}')">Delete</button>
      </div>
    `;
  });
}

// Delete image
async function deleteImage(id) {
  await fetch(`https://school-backend-yk3x.onrender.com/api/gallery/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  loadGalleryAdmin();
}

// =======================
// 🚀 INIT
// =======================
loadDashboard();
loadAdmissions();
loadYears();
loadGalleryAdmin();