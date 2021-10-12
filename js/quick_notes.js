const quickNotes = document.querySelector(".notes");

quickNotes.value = localStorage.getItem("notes");

let cancel;
quickNotes.addEventListener("keyup", (e) => {
  if (cancel) clearTimeout(cancel);
  cancel = setTimeout(() => {
    localStorage.setItem("notes", e.target.value);
  }, 1000);
});
