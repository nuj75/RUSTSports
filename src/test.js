// document.getElementById("debug").textContent = "sdf";



// const header = document.getElementById("header");


document.getElementById("header").addEventListener("mouseover", function() {
  const sports_section = document.querySelectorAll(".sports-section");

  sports_section.forEach(section => {
    section.classList.remove("invisible");
  });

 
});





header.addEventListener("mouseleave", function() {
  const sports_section = document.querySelectorAll(".sports-section");

  sports_section.forEach(section => {
    section.classList.add("invisible");
  });
});