const API_URL = "http://localhost:3000/characters";

const listDiv = document.getElementById("animal-list");
const nameEl = document.getElementById("name");
const imgEl = document.getElementById("image");
const votesEl = document.getElementById("votes");
const voteBtn = document.getElementById("vote-btn");
const resetBtn = document.getElementById("reset-btn");

let currentAnimal = null;

// Fetch all animals
fetch(API_URL)
  .then(res => res.json())
  .then(animals => {
    animals.forEach(animal => {
      const btn = document.createElement("button");
      btn.textContent = animal.name;
      btn.addEventListener("click", () => showAnimal(animal));
      listDiv.appendChild(btn);
    });
  });

function showAnimal(animal) {
  currentAnimal = animal;
  nameEl.textContent = animal.name;
  imgEl.src = animal.image;
  votesEl.textContent = animal.votes;
}


voteBtn.addEventListener("click", () => {
  if (!currentAnimal) return;
  currentAnimal.votes--;
  votesEl.textContent = currentAnimal.votes;

  // persist to server
  fetch(`${API_URL}/${currentAnimal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: currentAnimal.votes })
  });
});

// Reset button
resetBtn.addEventListener("click", () => {
  if (!currentAnimal) return;
  currentAnimal.votes = 0;
  votesEl.textContent = 0;

  // persist to server
  fetch(`${API_URL}/${currentAnimal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: 0 })
  });
});