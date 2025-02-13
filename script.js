// Function to play background music and then start the journey
function startJourney() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.play();
  }
  // Wait a short moment for the music to start, then navigate to the love story page
  
    window.location.href = "love-story.html";
}


// Floating Hearts Animation
function createFloatingHearts() {
  const heartContainer = document.querySelector(".hearts-container");
  if (heartContainer) {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heartContainer.appendChild(heart);
    }
  }
}
createFloatingHearts();
