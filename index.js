// Remember to import the data and Dog class!

import dogs from "/data.js";

function renderDogHtml(data) {
  const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = data;

  document.getElementById("card").innerHTML = ` <div class="card-container">
    <img src="${avatar}" alt="dog" class="dog-img" />
    <h2 class="dog-info">${name} , ${age} </h2>
    <p class="dog-des">${bio}</p>
  </div>
</div>`;
}

function shuffleArray(dogs) {
  if (dogs[0].hasBeenLiked || dogs[0].hasBeenSwiped) {
    dogs.splice(0, 1);
  }
  if (dogs.length == 0) {
    document.querySelector(".actions").style.display = "none";
    document.getElementById(
      "card"
    ).innerHTML = `<div class="end-msg"><h2>All dogs have been swiped!</h2></div>`;
  }

  for (let i = dogs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dogs[i], dogs[j]] = [dogs[j], dogs[i]];
  }

  renderDogHtml(dogs[0]);
  const LikeBtn = document.querySelector(".heart-icon");
  const disLikeBtn = document.querySelector(".cross-icon");
  LikeBtn.style.pointerEvents = "auto";
  disLikeBtn.style.pointerEvents = "auto";
}

shuffleArray(dogs);

document.addEventListener("click", function (e) {
  const cardContainer = document.querySelector(".card-container");
  const targetHeartBtn = e.target.dataset.like;
  const targetCrossBtn = e.target.dataset.dislike;

  if (targetHeartBtn) {
    liked();
  }
  if (targetCrossBtn) {
    disLiked();
  }
});

function liked() {
  const disLikeBtn = document.querySelector(".cross-icon");
  disLikeBtn.style.pointerEvents = "none";
  dogs[0].hasBeenLiked = true;
  dogs[0].hasBeenSwiped = true;

  const likeBadge = document.querySelector(".like-badge");

  likeBadge.style.display = "inline";
  setTimeout(() => {
    likeBadge.style.display = "none";
  }, 1000);
  setTimeout(() => {
    shuffleArray(dogs);
  }, 1000);
}

function disLiked() {
  const LikeBtn = document.querySelector(".heart-icon");
  LikeBtn.style.pointerEvents = "none";

  const nopeBadge = document.querySelector(".nope-badge");
  dogs[0].hasBeenLiked = false;
  dogs[0].hasBeenSwiped = true;
  nopeBadge.style.display = "inline";
  setTimeout(() => {
    nopeBadge.style.display = "none";
  }, 1000);
  setTimeout(() => {
    shuffleArray(dogs);
  }, 1000);
}
