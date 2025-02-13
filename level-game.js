document.addEventListener("DOMContentLoaded", function() {
  let currentLevel = 1;
  const maxLevel = 3;
  // Define the parameters for each level with different game types.
  const levels = [
    { 
      level: 1, 
      type: "pop", 
      hearts: 5, 
      message: "Level 1 complete! Your smile lights up my world! 😊", 
      gift: "gift1.png" 
    },
    { 
      level: 2, 
      type: "fall", 
      hearts: 10, 
      message: "Level 2 complete! You catch my heart every time! 😍", 
      gift: "gift2.png" 
    },
    { 
      level: 3, 
      type: "order", 
      hearts: 4, 
      message: "Level 3 complete! You've mastered the challenge!", 
      gift: "gift3.png" 
    }
  ];
  
  const gameContainer = document.getElementById("game-container");

  // Start the current level based on its type.
  function startLevel() {
    gameContainer.innerHTML = ""; // Clear previous content
    const levelData = levels[currentLevel - 1];
    
    // Display the level header.
    const levelHeader = document.createElement("h2");
    levelHeader.textContent = `Level ${levelData.level}`;
    gameContainer.appendChild(levelHeader);
    
    // Call the appropriate function for each game type.
    if (levelData.type === "pop") {
      startPopLevel(levelData);
    } else if (levelData.type === "fall") {
      startFallLevel(levelData);
    } else if (levelData.type === "order") {
      startOrderLevel(levelData);
    }
  }
  
  /* Level 1: Pop the Hearts Game */
  function startPopLevel(levelData) {
    const gameArea = document.createElement("div");
    gameArea.id = "level-game-area";
    gameArea.className = "game-area";
    gameContainer.appendChild(gameArea);
    
    for (let i = 0; i < levelData.hearts; i++) {
      const heart = document.createElement("div");
      heart.className = "game-heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 90 + "%";
      heart.style.top = Math.random() * 90 + "%";
      heart.addEventListener("click", function() {
        heart.classList.add("pop");
        setTimeout(() => {
          heart.remove();
          checkPopLevelCompletion();
        }, 300);
      });
      gameArea.appendChild(heart);
    }
  }
  
  function checkPopLevelCompletion() {
    const remainingHearts = document.querySelectorAll("#level-game-area .game-heart");
    if (remainingHearts.length === 0) {
      levelCompleted();
    }
  }
  
  /* Level 2: Catch the Falling Hearts Game */
  function startFallLevel(levelData) {
    const gameArea = document.createElement("div");
    gameArea.id = "level-fall-area";
    gameArea.className = "game-area";
    gameContainer.appendChild(gameArea);
    let heartsCaught = 0;
    
    for (let i = 0; i < levelData.hearts; i++) {
      const heart = document.createElement("div");
      heart.className = "fall-heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 90 + "%";
      // Set a random fall duration between 3 and 5 seconds.
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      
      heart.addEventListener("click", function() {
        heart.classList.add("pop");
        setTimeout(() => {
          heart.remove();
          heartsCaught++;
          if (heartsCaught === levelData.hearts) {
            levelCompleted();
          }
        }, 300);
      });
      gameArea.appendChild(heart);
    }
  }
  
  /* Level 3: Order the Hearts Game */
  function startOrderLevel(levelData) {
    // In this game, each heart displays a random number.
    // The player must click the hearts in ascending order.
    const gameArea = document.createElement("div");
    gameArea.id = "level-order-area";
    gameArea.className = "game-area order-game-area";
    gameContainer.appendChild(gameArea);
    
    let numbers = [];
    for (let i = 0; i < levelData.hearts; i++) {
      let num = Math.floor(Math.random() * 100); // Generate a random number.
      numbers.push(num);
    }
    // Create a sorted copy for the correct order.
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    let currentIndex = 0;
    
    for (let i = 0; i < numbers.length; i++) {
      const heart = document.createElement("div");
      heart.className = "order-heart game-heart";
      heart.textContent = numbers[i];
      heart.style.left = Math.random() * 90 + "%";
      heart.style.top = Math.random() * 90 + "%";
      
      heart.addEventListener("click", function() {
        // Check if the clicked heart's number is the next in ascending order.
        if (parseInt(heart.textContent) === sortedNumbers[currentIndex]) {
          heart.classList.add("pop");
          setTimeout(() => {
            heart.remove();
            currentIndex++;
            if (currentIndex === sortedNumbers.length) {
              levelCompleted();
            }
          }, 300);
        } else {
          // Optional: Add a brief shake animation to indicate an incorrect choice.
          heart.style.animation = "shake 0.3s";
          setTimeout(() => {
            heart.style.animation = "";
          }, 300);
        }
      });
      gameArea.appendChild(heart);
    }
  }
  
  // When a level is completed, show its message and digital gift.
  function levelCompleted() {
    const levelData = levels[currentLevel - 1];
    const messageDiv = document.createElement("div");
    messageDiv.className = "level-message";
    messageDiv.innerHTML = `<h3>${levelData.message}</h3>`;
    
    if (levelData.gift) {
      const giftImg = document.createElement("img");
      giftImg.src = levelData.gift;
      giftImg.alt = `Gift for Level ${levelData.level}`;
      giftImg.className = "gift-img";
      messageDiv.appendChild(giftImg);
    }
    
    // Clear the game area and show the level completion message.
    gameContainer.innerHTML = "";
    gameContainer.appendChild(messageDiv);
    
    if (currentLevel < maxLevel) {
      const nextButton = document.createElement("button");
      nextButton.className = "btn";
      nextButton.textContent = "Next Level";
      nextButton.addEventListener("click", function() {
        currentLevel++;
        startLevel();
      });
      gameContainer.appendChild(nextButton);
    } else {
      // Final level completed! Now, as a surprise, declare her the winner.
      const finalMessage = document.createElement("div");
      finalMessage.className = "final-message";
      finalMessage.innerHTML = "<h2>Congratulations! You are the winner of my heart! ❤️👑</h2>";
      gameContainer.appendChild(finalMessage);
    }
  }
  
  // Start the first level when the page loads.
  startLevel();
});
