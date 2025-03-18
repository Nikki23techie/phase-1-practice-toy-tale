let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// Fetch toys and render them to the DOM
document.addEventListener('DOMContentLoaded', () => {
  fetchToys();

  // Add event listener for the "Add Toy" button
  document.querySelector('#new-toy-btn').addEventListener('click', () => {
    const form = document.querySelector('.container');
    form.classList.toggle('hidden');
  });
});

// Function to fetch toys
function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy);
      });
    });
}

// Function to render a toy to the DOM
function renderToy(toy) {
  const toyCollection = document.querySelector('#toy-collection');
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;
  
  // Add event listener to the "Like" button
  card.querySelector('.like-btn').addEventListener('click', () => increaseLikes(toy.id));
  
  toyCollection.appendChild(card);
}

// Function to increase the likes
function increaseLikes(toyId) {
  const toyCard = document.getElementById(toyId).parentElement;
  const likesParagraph = toyCard.querySelector('p');
  let currentLikes = parseInt(likesParagraph.innerText.split(' ')[0]);

  // Increment the likes count
  currentLikes++;

  // Send PATCH request to update the likes
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: currentLikes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    // Update the DOM with the new likes count
    likesParagraph.innerText = `${updatedToy.likes} Likes`;
  });
}
// Event listener for "Create Toy" button
document.querySelector('.add-toy-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0;  // New toy starts with 0 likes

  // POST request to add the new toy
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
  .then(response => response.json())
  .then(newToy => {
    // Render the new toy card without reloading the page
    renderToy(newToy);
    
    // Reset the form
    event.target.reset();
    // Hide the form
    document.querySelector('.container').classList.add('hidden');
  });
});
document.querySelector('#new-toy-btn').addEventListener('click', () => {
  const form = document.querySelector('.container');
  form.classList.toggle('hidden');
});
