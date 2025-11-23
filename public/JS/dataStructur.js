document.addEventListener("DOMContentLoaded", () => {
    let textArea = document.querySelector(".heroText");
    let text = 'Visualize How different Data structures look like';
    let index = 0;
    textArea.classList.add("text-4xl", "text-center");

    function appearText() {
        if (index < text.length) {
            textArea.innerText += text[index];
            index++;
            setTimeout(appearText, 50);
        }
    }

    function startTyping() {
        textArea.innerText = "";
        index = 0;
        appearText();
    }
    startTyping();
    setInterval(startTyping, 5000);

});
