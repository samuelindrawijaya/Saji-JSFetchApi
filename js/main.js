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

var getContainer = document.getElementById("discover");
getContainer.style.display = "none";

var checked = true;
console.log('test runiin');

//document.getElementById("getRecipeBtn").addEventListener("click", fetchData());
//document.getElementById("getRecipeBtn").onclick = checkData();
// fetchData();
var foodName = document.getElementById("foodname").value = '';
var getArrowPrev = document.getElementById("prev-button");
getArrowPrev.style.display = "none";
var getArrowNext = document.getElementById("next-button");
getArrowNext.style.display = "none";
var checkSearch = '';
var data = [];
async function fetchData() {
  var arrayLength = 0;
  var recipeTags = '';
  ClickDisabled();
  HideContainer();
  try {
      
      if (checkSearch != '') {
          let paginatedList = document.getElementById("special__grid");
          let listItems = paginatedList.querySelectorAll(".blog__card").forEach(e => e.remove());;
          let paginationNumbers = document.getElementById("pagination-numbers");
          let listpage = paginationNumbers.querySelectorAll(".pagination-number").forEach(e => e.remove());;
          data = [];
      }
      //let foodName = document.getElementById("foodName").value.toLowerCase();
      var foodName = document.getElementById("foodname").value.toLowerCase();
      checkSearch = foodName;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      data = await response.json();
      if(data['meals'] == null)
      {
        document.getElementById("search_box_notif").innerHTML = 'Resep tidak ditemukan...';
      }
      else
      {

        document.getElementById("search_box_notif").innerHTML = '';
        arrayLength = data['meals'].length;
        console.log(arrayLength);
        if (arrayLength === 0) {
          alert('test');
        }
        else {
          for (var i = 0; i < arrayLength; i++) {
  
            //console.log(data['meals'][i]['strMeal']);
            var specialGrid = document.getElementById("special__grid");
            var getDiv = document.createElement("div");
            getDiv.setAttribute("class", "blog__card");
            getDiv.setAttribute("id", "blog__card");
            var cardImg = document.createElement('img');
            cardImg.src = data['meals'][i]['strMealThumb'];
            getDiv.appendChild(cardImg);
  
            var getCardContent = document.createElement("div");
            getCardContent.setAttribute("class", "blog__card__content");
  
            var getH3 = document.createElement("h3");
            getH3.appendChild(document.createTextNode(data['meals'][i]['strArea'] + ' ' + data['meals'][i]['strCategory']));
            getCardContent.appendChild(getH3);
            var getH4 = document.createElement("h4");
            getH4.appendChild(document.createTextNode(data['meals'][i]['strMeal']));
            getCardContent.appendChild(getH4);
            var getP = document.createElement("p");
            recipeTags = data['meals'][i]['strTags'];
            if (recipeTags != null) {
              recipeTags = recipeTags.replaceAll(',', "  ");
            }
            else {
              recipeTags = 'no description';
            }
            getP.appendChild(document.createTextNode(recipeTags));
            getCardContent.appendChild(getP);
  
            getDiv.appendChild(getCardContent);
  
            //add button 
            var getDivBtn = document.createElement("div");
            getDivBtn.setAttribute("class", "special__footer");
  
            var getButton = document.createElement("button")
            var idBtn = String(data['meals'][i]['idMeal']);
            // console.log(idBtn);
            getButton.setAttribute("class", "btn");
            getButton.setAttribute("id", idBtn);
            getButton.setAttribute('onclick', `addRecipeExplaination(${idBtn});`);
            getButton.appendChild(document.createTextNode('Baca ini'));
            //var mealId = data['meals'][i]['idMeal'];
  
  
            getDivBtn.appendChild(getButton);
            // <div class="special__footer">
            // <button class="btn">Add to Cart</button>
            // </div>
  
            specialGrid.appendChild(getDiv);
            getDiv.appendChild(getDivBtn);
  
            // document.getElementById(idBtn).onclick = function()
            // {
            //   console.log(document.getElementById(idBtn));
            //   addRecipeExplaination(idBtn);
            // };
            // li.appendChild(document.createTextNode(data['meals'][i]['strMeal']));
            // li.setAttribute("id", listId); // added line
            // ul.appendChild(li);
  
            //ad input hiddiden//
  
  
            // //then img maybe
            // let img = document.createElement('img');
            // img.src = data['meals'][i]['strMealThumb'];
            // ul.appendChild(img);
          }
          var getArrowPrev = document.getElementById("prev-button");
          getArrowPrev.style.display = "block";
          var getArrowNext = document.getElementById("next-button");
          getArrowNext.style.display = "block";
          paginatedWeb();
        }
        
      }

    // let pokemonSprite = data.sprites.front_default;
    // let imgElement = document.getElementById("pokemon-img");

    // imgElement.src = pokemonSprite;
    // imgElement.style.display = "block";

  }
  catch (error) {
    console.error(error);
  }
  ClickEnabled();
}

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
// async function addRecipeExplaination(id)
// {
//   const getRecipeById = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?i=${id}`);
//    if(!getRecipeById.ok){
//        throw new Error("Could not fetch resource");
//    }

//    let data = await getRecipeById.json();
//    // document.getElementById('getRecipeBtn').style.visibility='hidden';
//    // document.getElementById("recipeImg").src = data['meals'][0]['strMealThumb'];
//    // document.getElementById("recipeId").innerHTML = data['meals'][0]['strMeal'];
//    // document.getElementById("recipeInstruction").innerHTML = data['meals'][0]['strInstructions'];

//    arrayLength = data['meals'].length;
//    console.log(arrayLength);
// }
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


function paginatedWeb() {
  let paginationNumbers = document.getElementById("pagination-numbers");
  let paginatedList = document.getElementById("special__grid");
  let listItems = paginatedList.querySelectorAll(".blog__card");
  let nextButton = document.getElementById("next-button");
  let prevButton = document.getElementById("prev-button");


  let paginationLimit = 8;
  let pageCount = Math.ceil(listItems.length / paginationLimit);
  console.log('test');
  console.log(pageCount);
  let currentPage = 1;

  let disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };

  let enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };

  let handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }

    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };

  let handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      let pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };

  let appendPageNumber = (index) => {
    let pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
  };

  let getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  let setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    let prevRange = (pageNum - 1) * paginationLimit;
    let currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };

  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    let pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}



