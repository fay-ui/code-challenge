// Your code here
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/films/1")
      .then(response => response.json())
      .then(movie => {
        displayMovieDetails(movie);
      });
  });
  
  function displayMovieDetails(movie) {
    const movieContainer = document.getElementById("movie-details");
    movieContainer.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="${movie.poster}" alt="${movie.title} poster">
      <p>Runtime: ${movie.runtime} minutes</p>
      <p>Showtime: ${movie.showtime}</p>
      <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
      <button id="buy-ticket" ${movie.tickets_sold >= movie.capacity ? 'disabled' : ''}>Buy Ticket</button>
    `;
  }
  

  function fetchAllMovies() {
    fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(movies => {
        const filmsList = document.getElementById("films");
        filmsList.innerHTML = ''; // Clear placeholder
        movies.forEach(movie => {
          const li = document.createElement("li");
          li.textContent = movie.title;
          li.className = movie.tickets_sold >= movie.capacity ? "sold-out film item" : "film item";
          li.addEventListener("click", () => displayMovieDetails(movie));
          filmsList.appendChild(li);
        });
      });
  }
  
  document.addEventListener("DOMContentLoaded", fetchAllMovies);

  

  document.addEventListener("click", (event) => {
    if (event.target.id === "buy-ticket") {
      const movieId = 1; // Or get this dynamically from the displayed movie
      fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(movie => {
          if (movie.tickets_sold < movie.capacity) {
            const newTicketsSold = movie.tickets_sold + 1;
            fetch(`http://localhost:3000/films/${movieId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ tickets_sold: newTicketsSold })
            })
            .then(() => {
              // Update the displayed movie details
              displayMovieDetails({ ...movie, tickets_sold: newTicketsSold });
              // Optionally, POST to tickets endpoint
              fetch("http://localhost:3000/tickets", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ film_id: movieId, number_of_tickets: 1 })
              });
            });
          }
        });
    }
  });

  

  
  
  function fetchAllMovies() {
    fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(movies => {
        const filmsList = document.getElementById("films");
        filmsList.innerHTML = '';
        movies.forEach(movie => {
          const li = document.createElement("li");
          li.textContent = movie.title;
          li.className = movie.tickets_sold >= movie.capacity ? "sold-out film item" : "film item";
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering the click event on the li
            fetch(`http://localhost:3000/films/${movie.id}`, { method: "DELETE" })
              .then(() => fetchAllMovies());
          });
  
          li.appendChild(deleteButton);
          li.addEventListener("click", () => displayMovieDetails(movie));
          filmsList.appendChild(li);
        });
      });
  }

  

  function displayMovieDetails(movie) {
    const movieContainer = document.getElementById("movie-details");
    movieContainer.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="${movie.poster}" alt="${movie.title} poster">
      <p>Runtime: ${movie.runtime} minutes</p>
      <p>Showtime: ${movie.showtime}</p>
      <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
      <button id="buy-ticket" ${movie.tickets_sold >= movie.capacity ? 'disabled' : ''}>
        ${movie.tickets_sold >= movie.capacity ? 'Sold Out' : 'Buy Ticket'}
      </button>
    `;
  }
  