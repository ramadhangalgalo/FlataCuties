// Use static data instead of fetching from a server

const animals = [
  {
    id: 1,
    name: "Fluffy",
    image: "ttps://cdn.pixabay.com/photo/2020/03/10/04/48/animal-4917802_1280.jpg",
    votes: 0
  },
  {
    id: 2,
    name: "Spot",
    image: "https://place-puppy.com/200x200",
    votes: 0
  },
  {
    id: 3,
    name: "Chirpy",
    image: "https://loremflickr.com/200/200/bird",
    votes: 0
  }
];

const listDiv = document.getElementById("animal-list");
const nameEl = document.getElementById("name");
const imgEl = document.getElementById("image");
const votesEl = document.getElementById("votes");
const voteBtn = document.getElementById("vote-btn");
const resetBtn = document.getElementById("reset-btn");

let currentAnimal = null;

// Populate animal list with static data
animals.forEach(animal => {
  const btn = document.createElement("button");
  btn.textContent = animal.name;
  btn.addEventListener("click", () => showAnimal(animal));
  listDiv.appendChild(btn);
});

function showAnimal(animal) {
  currentAnimal = animal;
  nameEl.textContent = animal.name;
  imgEl.src = animal.image;
  votesEl.textContent = animal.votes;
}

voteBtn.addEventListener("click", () => {
  if (!currentAnimal) return;
  currentAnimal.votes++;
  votesEl.textContent = currentAnimal.votes;
});

resetBtn.addEventListener("click", () => {
  if (!currentAnimal) return;
  currentAnimal.votes = 0;
  votesEl.textContent = 0;
});