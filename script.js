document.addEventListener("DOMContentLoaded", function () {
  const moviesContainer = document.querySelector(".movies-container");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const searchInput = document.querySelector(".search-input");
  let moviesData;
  fetch("movies.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data;
      displayMovies(moviesData);
    })
    .catch((error) => console.error("Error fetching movies data"));

  function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-thumbnail");
      movieDiv.innerHTML = `
      <img src = "${movie.image}" alt = "${movie.title}">
      <h3>${movie.title}</h3>
      `;
      moviesContainer.appendChild(movieDiv);

      movieDiv.addEventListener("click", () => openModal(movie));
    });
  }

  function openModal(movie) {
    modalContent.innerHTML = `
    <span class = "close" onClick = "closeModal()">&times;</span>
    <h2>${movie.title}</h2>
    <p><strong>Director :</strong> ${movie.director}</p>
    <p><strong>Genre :</strong> ${movie.genre}</p>
    <p><strong>Budget :</strong> ${movie.budget}</p>
    <p><strong>Collection :</strong> ${movie.collection}</p>
    <p><strong>IMBD Rating :</strong> ${movie.imbdRating}</p>
    <p><strong>Release Year :</strong> ${movie.releaseYear}</p>
    <p>${movie.synopsis}</p>
    `;
    modal.style.display = "block";
  }

  window.closeModal = function () {
    modal.style.display = "none";
  };

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filterSearch = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    if (filterSearch.length > 0) {
      displayMovies(filterSearch);
    } else {
      moviesContainer.innerHTML = `<p>No movies found</p>`;
    }
  });
});
