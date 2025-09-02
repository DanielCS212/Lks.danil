document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  const instructionBtn = document.getElementById("instructionBtn");
  const instructionModal = document.getElementById("instructionModal");
  const closeModal = instructionModal.querySelector(".close");
  const home = document.getElementById("home");
  const game = document.getElementById("game");
  const playerName = document.getElementById("playerName");
  const playerLevel = document.getElementById("playerLevel");
  const selectedGun = document.getElementById("selectedGun");
  const gameArea = document.getElementById("gameArea");
  const scoreDisplay = document.getElementById("score");
  const leaderboardList = document.getElementById("leaderboardList");
  const sortLeaderboard = document.getElementById("sortLeaderboard");

  let score = 0;
  let leaderboardData = [];

 
  playBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const level = document.getElementById("level").value;
    const gun = document.querySelector('input[name="gun"]:checked');
    const target = document.querySelector('input[name="target"]:checked');

    if (!username || !gun || !target) {
      alert("Please enter name, choose gun, and target!");
      return;
    }

    score = 0;
    scoreDisplay.textContent = score;

    playerName.textContent = username;
    playerLevel.textContent = level;
    selectedGun.src = gun.value;

    home.classList.add("hidden");
    game.classList.remove("hidden");

    document.body.style.cursor = "url('pointer.jpg'), auto";

    spawnTarget(target.value);


    if (!leaderboardData.find(p => p.name === username)) {
      leaderboardData.push({ name: username, score: 0 });
    }
    renderLeaderboard();
  });


  function spawnTarget(targetImg) {
    const target = document.createElement("img");
    target.src = targetImg;
    target.classList.add("target");
    moveTarget(target);
    gameArea.appendChild(target);

    target.addEventListener("click", () => {
      score++;
      scoreDisplay.textContent = score;

      updateLeaderboard(playerName.textContent, score);

      const boom = document.createElement("img");
      boom.src = "boom.jpg";
      boom.classList.add("boom");
      boom.style.left = target.style.left;
      boom.style.top = target.style.top;
      gameArea.appendChild(boom);

      setTimeout(() => boom.remove(), 500);
      target.remove();

      spawnTarget(targetImg);
    });
  }


  function moveTarget(target) {
    const x = Math.random() * (gameArea.offsetWidth - 100);
    const y = Math.random() * (gameArea.offsetHeight - 100);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
  }


  function updateLeaderboard(name, score) {
    let player = leaderboardData.find(p => p.name === name);
    if (player) {
      player.score = score;
    }
    renderLeaderboard();
  }

  function renderLeaderboard(sortBy = sortLeaderboard.value) {
  leaderboardList.innerHTML = "";
  let sorted = [...leaderboardData];
  if (sortBy === "score") {
    sorted.sort((a, b) => b.score - a.score);
  } else if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  sorted.forEach(player => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div class="player-info">
        <span class="player-name">${player.name}</span>
        <span class="player-score">Score : ${player.score}</span>
      </div>
      <button>Detail</button>
    `;
    leaderboardList.appendChild(li);
  });
}

  sortLeaderboard.addEventListener("change", () => {
    renderLeaderboard(sortLeaderboard.value);
  });


  instructionBtn.addEventListener("click", () => {
    instructionModal.style.display = "block";
  });
  closeModal.addEventListener("click", () => {
    instructionModal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === instructionModal) {
      instructionModal.style.display = "none";
    }
  });
});
