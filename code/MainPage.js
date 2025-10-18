document.addEventListener("DOMContentLoaded", () => {
    const mobNav = document.querySelector("#mobNav");
    const mobDiv = document.querySelector("#mobDiv");

    mobNav.addEventListener("click", () => {
        if( mobDiv.classList.contains('hidden'))
        {
            mobDiv.classList.remove('hidden');
            mobDiv.classList.add('flex');
        }
        else{
            mobDiv.classList.add('hidden');
            mobDiv.classList.remove('flex');
        }
    });
});
