document.addEventListener("DOMContentLoaded", () => {
  const oneBtn = document.querySelector("#oneBtn");
  const twoBtn = document.querySelector("#twoBtn");
  const randomBtn = document.querySelector("#randomBtn");
  const arrayItem = document.querySelector("#arrayDataStructure");
  const divTwoD = document.querySelector("#divTwoD");
  const noOfRow = document.querySelector("#noOfRow");
  const noOfCol = document.querySelector("#noOfCol");
//   const themeToggle=document.getElementsByClassName("themeToggle");
//   themeToggle.addEventListener("click",()=>
// {
//     alert("ok");
//         document.body.classList.remove("bg-indigo-950");
//     let body=document.querySelector("body");

//     body.classList.add("text-black");
    
// })
  let mode = "oneD";

  oneBtn.addEventListener("click", () => {
    mode = "oneD";
    divTwoD.classList.add("hidden");
    resetArrayContainer();
  });

  twoBtn.addEventListener("click", () => {
    mode = "twoD";
    divTwoD.classList.remove("hidden");
    resetArrayContainer();
  });

  // Function to reset container styles
  function resetArrayContainer() {
    arrayItem.innerHTML = "";
    
    // Remove all inline styles and classes
    arrayItem.classList.remove("grid", "flex");
    arrayItem.removeAttribute("style");
    
    // Reset any specific styles that might be left
    arrayItem.style.display = "";
    arrayItem.style.gridTemplateColumns = "";
    arrayItem.style.gridTemplateRows = "";
    arrayItem.style.gap = "";
  }

  function generateOneDArray() {
    resetArrayContainer();
    
    // Use flex for 1D array
    arrayItem.classList.add("flex");
    arrayItem.style.flexWrap = "wrap";
    arrayItem.style.justifyContent = "center";
    arrayItem.style.alignItems = "center";
    arrayItem.style.gap = "0.5rem";
    
    const fragment = document.createDocumentFragment();
    const rand = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
    
    for (let i = 0; i < rand; i++) {
      const div = document.createElement("div");
      div.innerText = i;
      div.className =
        "border-2 border-black rounded-lg px-4 py-2 backdrop-blur-xl bg-white/20 shadow-md hover:bg-white/30 transition-all min-h-[60px] min-w-[60px] flex items-center justify-center";
      fragment.appendChild(div);
    }
    arrayItem.appendChild(fragment);
  }

  function generateTwoDArray() {
    resetArrayContainer();
    
    let rows = parseInt(noOfRow.value) || 3;
    let cols = parseInt(noOfCol.value) || 3;
    
    // Add limits for rows and columns
    if (rows > 5) rows = 5;
    if (cols > 9) cols = 9;
    
    // Use grid for 2D array
    arrayItem.classList.add("grid");
    arrayItem.style.display = "grid";
    arrayItem.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    arrayItem.style.gridTemplateRows = `repeat(${rows}, auto)`;
    // arrayItem.style.gap = "0.5rem";
    arrayItem.style.width = "100%";
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.innerText = r * cols + c;
        cell.className = "border-2 border-black rounded-lg  py-2 backdrop-blur-xl bg-white/20 shadow-md hover:bg-white/30 transition-all text-center ";
        cell.dataset.row = r;
        cell.dataset.col = c;
        arrayItem.appendChild(cell);
      }
    }
  }

  randomBtn.addEventListener("click", () => {
    if (mode === "oneD") generateOneDArray();
    else generateTwoDArray();
  });

  // Generate initial 1D array
  generateOneDArray();
});