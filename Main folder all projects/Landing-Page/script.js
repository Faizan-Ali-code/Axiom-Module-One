const close = document.getElementById("close");
const menu = document.getElementById("menu");
const cta = document.getElementById("cta");
const navigation = document.getElementById("navigation");
const model = document.getElementById("model");




//Events 
menu.addEventListener("click",() => document.body.classList.toggle("showNav"));

cta.addEventListener("click",() => model.classList.add("show-model"));

close.addEventListener("click",() => model.classList.remove("show-model")) 

//Event to close form on click the parent of form 
window.addEventListener("click",e =>
  e.target === model ? model.classList.remove("show-model") : false
)