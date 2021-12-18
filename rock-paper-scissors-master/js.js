const circles = document.querySelectorAll(".circles");
const array = ["paper", "scissors", "rock"];
const triangle = document.querySelector(".triangle");
var n = 0;
//looping through the circles
circles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    //getting the target circle data property
    let targetName = circle.getAttribute("data-circle");
    //adding a class to the selected circle so i can make other circles dissapear
    circle.classList.add("selected");
    const notSelectedCircles = document.querySelectorAll(
      ".circles:not(.selected)"
    );
    //removing the triangle in between
    triangle.classList.add("none");
    circle.parentElement.style.placeItems = "start";
    //animating according to which circle is clicked
    document.querySelector(".bottom").classList.add("col");
    document.querySelector(".house").classList.add("h1__show");
    document.querySelector(".you").classList.add("h1__show");

    if (targetName == "scissors") {
      circle.classList.add("animate-scissors");
      //giving display none to unselected circles
      notSelectedCircles.forEach((none) => {
        none.classList.add("none");
      });
    } else if (targetName == "rock") {
      circle.classList.add("animate-rock");
      //giving display none to unselected circles
      notSelectedCircles.forEach((none) => {
        none.classList.add("none");
      });
    } else {
      //giving display none to unselected circles
      notSelectedCircles.forEach((none) => {
        none.classList.add("none");
      });
    }
    //Shuffling the options
    const interval = setInterval(() => {
      if (n < array.length) {
        shuffle(n);
        n++;
        setTimeout(() => {
          document
            .querySelector(".bottom")
            .removeChild(document.querySelector(".bottom").lastElementChild);
        }, 300);
      } else {
        n = 0;
        //selecting a random option and showing it
        clearInterval(interval);
        OpponentTurn(array, targetName);
      }
    }, 400);
  });
});
//function to select random option
const OpponentTurn = (arr, target) => {
  const random = arr[Math.floor(Math.random() * arr.length)];
  //    <div data-circle="rock" class="circles rock">
  //      <span class="wrapper">
  //        <img src="./images/icon-rock.svg" alt="" class="" />
  //      </span>
  //    </div>;
  const circle = document.createElement("div");
  const wrapper = document.createElement("span");
  const img = document.createElement("img");
  circle.classList += `circles ${random} made`;
  wrapper.classList.add("wrapper");
  img.src = `./images/icon-${random}.svg`;
  wrapper.appendChild(img);

  circle.appendChild(wrapper);
  document.querySelector(".bottom").appendChild(circle);
  checkingScore(random, target);
};
//function to shuffle options
const shuffle = (n) => {
  const arr = array[n];
  const circle = document.createElement("div");
  const wrapper = document.createElement("span");
  const img = document.createElement("img");
  circle.classList += `circles ${arr} made`;
  wrapper.classList.add("wrapper");
  img.src = `./images/icon-${arr}.svg`;
  wrapper.appendChild(img);
  circle.appendChild(wrapper);

  document.querySelector(".bottom").appendChild(circle);
};
//checks result and updates the score
const checkingScore = (ai, target) => {
  const selectedElement = document.querySelector(".selected");
  const aiElement = document.querySelector(".made");
  const score = document.querySelector(".score");
  let innerValue = parseInt(score.innerText);
  let win = false;
  if (
    (target === "paper" && ai === "rock") ||
    (target === "rock" && ai === "scissors") ||
    (target === "scissors" && ai === "paper")
  ) {
    creatingReset(!win);
    innerValue += 1;
    score.innerText = innerValue;
    selectedElement.classList.add("winner");
  } else if (target === ai) {
    creatingReset(null);
  } else {
    creatingReset(win);
    aiElement.classList.add("winner");
  }
};
//a function to reset the whole game when play again button is pressed
const creatingReset = (e) => {
  const h1 = document.createElement("h1");
  const btn = document.createElement("button");
  const div = document.createElement("div");
  h1.classList.add("reset-h1");
  btn.classList.add("play-again");
  div.classList.add("reset-div");
  btn.innerText = "PLAY AGAIN";
  div.appendChild(h1);
  div.appendChild(btn);
  document.querySelector(".bottom").appendChild(div);
  if (e === true) {
    h1.innerText = "YOU WIN!";
  } else if (e === null) {
    h1.innerText = "DRAW!";
  } else {
    h1.innerText = "YOU LOSE!";
  }
  //////////=========================================================================
  document.querySelector(".play-again").addEventListener("click", () => {
      document.querySelector(".selected").classList.remove("animate-scissors")
      document.querySelector(".selected").classList.remove("animate-paper")
      document.querySelector(".selected").classList.remove("animate-rock")
    //////////=========================================================================
    document.querySelector(".bottom").classList.remove("col");
    document.querySelector(".house").classList.remove("h1__show");
    document.querySelector(".you").classList.remove("h1__show");
    document.querySelector(".triangle").classList.remove("none");
    document.querySelector(".bottom").style.placeItems = "center";
    if(document.querySelector(".winner") != null){
       document.querySelector(".winner").classList.remove("winner");
  }
    //////////=========================================================================
    document
      .querySelector(".bottom")
      .removeChild(document.querySelector(".bottom").lastElementChild);
    circles.forEach((circle) => {
      circle.classList.contains("none")
        ? circle.classList.remove("none")
        : circle.classList.remove("selected");
    });
    //////////=========================================================================
    div.remove();
    document.querySelector(".made").remove();
    
  });
};
//===================Rules Modal =================================
const rulesBtn = document.querySelector(".rules");
const rulesModal = document.querySelector(".modal");
const cross = document.querySelector(".cross");
const overlay = document.querySelector(".overlay");

rulesBtn.addEventListener("click", () => {
  overlay.classList.add("dropOverlay");
  rulesModal.classList.add("dropModal");
});
cross.addEventListener("click", () => {
  overlay.classList.remove("dropOverlay");
  rulesModal.classList.remove("dropModal");
});
