function renderMatches() {
  const matchTableBody = document.getElementById("matchTableBody");
  matchTableBody.innerHTML = ""; // Clear the table body

  let matches = localStorage.getItem("matches")
    ? JSON.parse(localStorage.getItem("matches"))
    : [];

  matches.forEach((match, index) => {
    matchTableBody.innerHTML += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${match.name}</td>
                  <td>${match.date}</td>
                  <td>${match.time}</td>
                  <td>${match.type}</td>
                  <td>
                      <button class="btn btn-warning btn-sm" onclick="editMatch(${index})">Edit</button>
                      <button class="btn btn-danger btn-sm" onclick="deleteMatch(${index})">Delete</button>
                  </td>
              </tr>
          `;
  });
}

// Add match form submission
document.getElementById("adminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const matchName = document.getElementById("matchName").value;
  const matchDate = document.getElementById("matchDate").value;
  const matchTime = document.getElementById("matchTime").value;
  const matchType = document.getElementById("matchType").value;

  const matchDetails = {
    name: matchName,
    date: matchDate,
    time: matchTime,
    type: matchType,
  };

  // Save the match details to local storage
  let matches = localStorage.getItem("matches")
    ? JSON.parse(localStorage.getItem("matches"))
    : [];
  matches.push(matchDetails);
  localStorage.setItem("matches", JSON.stringify(matches));

  // Reset the form
  this.reset();

  // Show success message with SweetAlert2
  Swal.fire({
    icon: "success",
    title: "Match Added",
    text: "The match has been added successfully!",
    confirmButtonText: "OK",
  });

  // Render matches
  renderMatches();
});

// Edit match
function editMatch(index) {
  let matches = JSON.parse(localStorage.getItem("matches"));
  const match = matches[index];

  // Populate form with match details
  document.getElementById("matchName").value = match.name;
  document.getElementById("matchDate").value = match.date;
  document.getElementById("matchTime").value = match.time;
  document.getElementById("matchType").value = match.type;

  // Remove the match from the list
  matches.splice(index, 1);
  localStorage.setItem("matches", JSON.stringify(matches));

  // Re-render matches
  renderMatches();
}

// Delete match
function deleteMatch(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this match!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let matches = JSON.parse(localStorage.getItem("matches"));
      matches.splice(index, 1);
      localStorage.setItem("matches", JSON.stringify(matches));

      // Show success message with SweetAlert2
      Swal.fire("Deleted!", "The match has been deleted.", "success");

      // Re-render matches
      renderMatches();
    }
  });
}

// Initial render of matches
renderMatches();
