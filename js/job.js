const form = document.getElementById("jobForm");
const msg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/jobs", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    msg.style.display = "block";
    form.reset();

  } catch (err) {
    alert(err.message);
  }
});