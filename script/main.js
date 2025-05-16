document.getElementById("birdImg").addEventListener("click", () => {
      const sound = document.getElementById("birdSound");
      sound.currentTime = 0; 
      sound.play();
    });