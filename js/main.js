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

    //const foodName = document.getElementById("foodName").value.toLowerCase();
    // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    var datas = data['meals'][0];

    // var recipeDescImg = document.getElementById("discover__destination__image");
    // var recipeDescImgisi = document.createElement('img');
    // recipeDescImgisi.src = datas['strMealThumb'];
    // recipeDescImg.appendChild(recipeDescImgisi);
    var recipeIns = datas['strInstructions'];
    if (recipeIns != null) {
      recipeIns = recipeIns.replaceAll('\r\n', "<br>");
    }
    else {
      recipeIns = 'no description';
    }
    document.getElementById("recipe-img1").src = datas['strMealThumb'];
    document.getElementById("recipe-img2").src = datas['strMealThumb'];
    document.getElementById("h4_recipe").innerHTML = datas['strMeal'];
    document.getElementById("p_recipe").innerHTML = recipeIns;
    //   <div class="recipe_image">
    //   <img src="assets/destination-1.jpg" id="recipe-img1" alt="destination" />
    //   <img src="assets/destination-2.jpg" id="recipe-img2" alt="destination" />
    // </div>
    // <h4>Discover your dream<br />destinations</h4>
    // <p class="destination__description">
    //   Navigate through a curated selection of travel options, each
    //   designed to ignite your wanderlust and fulfill your travel
    //   aspirations.
    // </p>


    //
    // document.getElementById("recipeId").innerHTML = data['meals'][0]['strMeal'];
    // document.getElementById("recipeInstruction").innerHTML = data['meals'][0]['strInstructions'];

    HideContainer();
    ShowContainer();
    document.getElementsByClassName("row discover__destination__image")[0].scrollIntoView();
    //document.getElementById("").focus({ focusVisible: true });

  }
  catch (error) {
    console.error(error);
  }
}

function HideContainer() {
  var getContainer = document.getElementById("discover");

  if (getContainer.style.display === "block") {
    getContainer.style.display = "none";
  } else {
    getContainer.style.display = "none";
  }
}
function ShowContainer() {
  var getContainer = document.getElementById("discover");
  if (getContainer.style.display === "none") {
    getContainer.style.display = "block";
  } else {
    getContainer.style.display = "block";
  }
}

function showImage() {
  var img = document.getElementById('img_notif');
  img.style.visibility = 'visible';
}

function hideImage() {
  var img = document.getElementById('img_notif');
  img.style.visibility = 'hidden';
}


