const countdownElement = document.getElementById("countdown");
let countdownDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "Match started!";
  }
}, 1000);

// Dynamically load matches from local storage
const matchesContainer = document.querySelector(".matches .row");
const matches = JSON.parse(localStorage.getItem("matches")) || [];

matches.forEach((match, index) => {
  const matchCard = document.createElement("div");
  matchCard.classList.add("col-lg-4", "col-md-6");

  matchCard.innerHTML = `
      <div class="card shadow-md h-100">
          <div class="card-body">
              <h5 class="card-title">${match.name}</h5>
              <p class="card-text">Date: ${match.date}</p>
              <p class="card-text">Time: ${match.time}</p>
              <p class="card-text">Type: ${match.type}</p>
              <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#registerModal" onclick="populateForm(${index})">Register</button>
          </div>
      </div>
  `;

  matchesContainer.appendChild(matchCard);
});

// Populate the registration form based on selected match
function populateForm(index) {
  const match = matches[index];
  document.getElementById(
    "registerModalLabel"
  ).innerText = `Register for ${match.name}`;
}

// Dynamic player fields
const totalPlayersSelect = document.getElementById("totalPlayers");
const playerFieldsContainer = document.getElementById("playerFields");

// Initialize with default value
totalPlayersSelect.value = "1";
updatePlayerFields();

totalPlayersSelect.addEventListener("change", updatePlayerFields);

function updatePlayerFields() {
  const totalPlayers = parseInt(totalPlayersSelect.value);
  playerFieldsContainer.innerHTML = "";

  for (let i = 1; i <= totalPlayers; i++) {
    const playerField = document.createElement("div");
    playerField.classList.add("mb-3");
    playerField.innerHTML = `<label for="player${i}Name" class="form-label">Player ${i} Name</label>
        <input type="text" class="form-control" id="player${i}Name" required />`;

    playerFieldsContainer.appendChild(playerField);
  }
}
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const playerName = document.getElementById("playerName").value;
    const playerEmail = document.getElementById("playerEmail").value;
    const teamName = document.getElementById("teamName").value;
    const totalPlayers = document.getElementById("totalPlayers").value;

    let players = [];
    for (let i = 1; i <= totalPlayers; i++) {
      const playerField = document.getElementById(`player${i}Name`);
      if (playerField) {
        players.push(playerField.value);
      }
    }

    Swal.fire({
      title: "Registration Successful!",
      text: `Team ${teamName} has been registered with players: ${players.join(
        ", "
      )}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    this.reset();
    playerFieldsContainer.innerHTML = "";
  });
