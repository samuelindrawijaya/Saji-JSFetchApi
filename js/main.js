let menuBtn = document.getElementById("menu-btn");
let navLinks = document.getElementById("nav-links");
let menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  let isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

let scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// function validateChar()
// {}

function ClickDisabled()
{
   document.getElementById('btn_search').disabled = true;
}

function ClickEnabled()
{
  document.getElementById('btn_search').disabled = false;
}

//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
//function search meals by id 
async function addRecipeExplaination(id) {

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    var datas = data['meals'][0];
    var recipeIns = datas['strInstructions'];
    if (recipeIns != null) {
      recipeIns = recipeIns.replaceAll('\r\n', "<br>");
      recipeIns = recipeIns.replaceAll('.', "<br>");
    }
    else {
      recipeIns = 'no description';
    }

    document.getElementById("recipe_header").innerHTML = datas['strMeal'];
    document.getElementById("recipe-img2").src = datas['strMealThumb'];
    document.getElementById("h4_recipe").innerHTML = datas['strCategory'];
    document.getElementById("p_recipe").innerHTML = recipeIns;
    modalShow();

  }
  catch (error) {
    console.error(error);
  }
}

function hideImage() {
  var img = document.getElementById('img_notif');
  img.style.visibility = 'hidden';
}

function showImage() {
  var img = document.getElementById('img_notif');
  img.style.visibility = 'visible';
}

function hideArrow()
{
  var getArrowPrev = document.getElementById("prev-button");
  getArrowPrev.style.display = "none";
  var getArrowNext = document.getElementById("next-button");
  getArrowNext.style.display = "none";
}


function showSpinner() {
  document.getElementById('loader').style.display = 'inline-block';
}


function hideSpinner() {
  document.getElementById('loader').style.display = 'none';
}



