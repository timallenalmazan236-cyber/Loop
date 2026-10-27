const diceCount = document.getElementById("diceCount");
const diceColor = document.getElementById("diceColor");
const diceContainer = document.getElementById("diceContainer");
const totalDisplay = document.getElementById("total");

let results = [1, 1];

const pipPositions = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8]
};


function createDie(value) {
  const die = document.createElement("div");
  die.className = "die";
  die.style.setProperty("--dice-color", diceColor.value);
  die.setAttribute("aria-label", `Die showing ${value}`);

  // FOR LOOP CODE
  for (let i = 0; i < 9; i++) {
    const pip = document.createElement("span");
    pip.className = "pip";

    if (pipPositions[value].includes(i)) {
      pip.classList.add("visible");
    }

    die.appendChild(pip);
  }

  return die;
}


function displayDice() {
  diceContainer.replaceChildren();

  let i = 0;

  // WHILE LOOP CODE
  while (i < results.length) {
    diceContainer.appendChild(createDie(results[i]));
    i++;
  }

  // Calculate the total
  let total = 0;
  let j = 0;

  while (j < results.length) {
    total += results[j];
    j++;
  }

  totalDisplay.textContent =
    results.length > 1 ? `Total: ${total}` : "";

  // Change the Roll button to match the dice color
  const rollBtn = document.getElementById("rollBtn");
  rollBtn.style.backgroundColor = diceColor.value;
  rollBtn.style.borderColor = diceColor.value;
  rollBtn.style.boxShadow = `0 3px 0 ${diceColor.value}`;
}


function rollDice() {
  results = [];

  const count = Number(diceCount.value);
  let i = 0;

  // DO...WHILE LOOP CODE
  if (count > 0) {
    do {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      results.push(randomNumber);
      i++;
    } while (i < count);
  }

  displayDice();
}


// Reset all dice to show 1
function resetDice() {
  results = Array(Number(diceCount.value)).fill(1);
  displayDice();
}


// Copy the dice results
async function copyResults() {
  const text = results.join(", ");
  const message = document.getElementById("copyMessage");

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();

    const copied = document.execCommand("copy");
    area.remove();

    if (!copied) return;
  }

  message.classList.add("show");

  clearTimeout(window.copyMessageTimer);

  window.copyMessageTimer = setTimeout(() => {
    message.classList.remove("show");
  }, 1500);
}


// Button and input events
diceCount.addEventListener("change", rollDice);
diceColor.addEventListener("input", displayDice);

document.getElementById("rollBtn").addEventListener("click", rollDice);
document.getElementById("resetBtn").addEventListener("click", resetDice);
document.getElementById("copyBtn").addEventListener("click", copyResults);


// Display the initial dice
displayDice();