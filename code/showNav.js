document.addEventListener("DOMContentLoaded", () => {
    const mobNav = document.querySelector("#mobNav");
    const mobNavcontent=document.querySelector("#mobNavcontent");
    mobNav.addEventListener("click", () => {
       if(mobNavcontent.classList.contains("hidden"))
       {
        mobNavcontent.classList.remove("hidden");
       }else{
           mobNavcontent.classList.add("hidden");
       }
    });
});
