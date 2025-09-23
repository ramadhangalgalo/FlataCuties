const animalList = document.getElementById("animal_list");
const apiUrl = "http://localhost:3000/characters"; 

const selectedName = document.getElementById("animal_name");
const selectedImage = document.getElementById("animal_image");
const selectedVotes = document.getElementById("animal_votes");
const voteBtn = document.getElementById("vote_btn");

let selectedAnimal = null;

function loadAnimals() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(animalData => {
      animalList.innerHTML = ""; 
      animalData.forEach(animal => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <h3>${animal.name}</h3>
          <img src="${animal.image}" alt="${animal.name}" width="80" />
        `;
        listItem.style.cursor = "pointer";
        listItem.addEventListener("click", () => selectAnimal(animal));
        animalList.appendChild(listItem);
      });
      if (animalData.length > 0) selectAnimal(animalData[0]);
    })
    .catch(error => console.error("Error fetching animals:", error));
}

function selectAnimal(animal) {
  selectedAnimal = animal;
  selectedName.textContent = animal.name;
  selectedImage.src = animal.image;
  selectedImage.alt = animal.name;
  selectedVotes.textContent = animal.votes;
}

voteBtn.addEventListener("click", () => {
  if (!selectedAnimal) return;
  const updatedVotes = selectedAnimal.votes + 1;
  fetch(`${apiUrl}/${selectedAnimal.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ votes: updatedVotes })
  })
    .then(response => response.json())
    .then(updatedAnimal => {
      selectedAnimal.votes = updatedAnimal.votes;
      selectedVotes.textContent = updatedAnimal.votes;
    })
});

loadAnimals();