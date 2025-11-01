document.addEventListener("DOMContentLoaded", () => {
    let textArea = document.querySelector(".heroText");
    let text = 'Visualize How different Data structures look like';
    let index = 0;

    function appearText() {
        if (index < text.length) {
            textArea.innerText += text[index];
            index++;
            setTimeout(appearText, 30);
        }
    }

    appearText();
});
