const btnAi = document.querySelector("#btnAi");
const Ai_Data = document.querySelector("#Ai_Data");
const input=document.querySelector("#inputText");
let text = document.createElement("p");
text.innerText = `AI Help is now active! 🤖 \n Data Structures and Algorithms are the heart of computer science, shaping how efficiently we solve problems.
They enable systems to store, access, and manage data in intelligent ways.
From search engines to self-driving cars, DSA makes technology faster and smarter.
Understanding them helps developers write optimized and reliable code.
In today’s digital era, mastering DSA means mastering the art of logical thinking.`;

btnAi.addEventListener("click", () => {

  if (confirm("Are you sure?")) {
    input.value=" ";
    Ai_Data.appendChild(text);
    input.value="";

  }
});
