const quickNotes = document.querySelector(".notes");

quickNotes.value = localStorage.getItem("notes");

let data;
quickNotes.addEventListener("keyup", (e) => {
  if (data) clearTimeout(data);
  data = setTimeout(() => {
    localStorage.setItem("notes", e.target.value);
  }, 1000);
});
