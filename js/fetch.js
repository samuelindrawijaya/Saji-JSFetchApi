var checked = true;
console.log('test runiin'); 
//document.getElementById("getRecipeBtn").addEventListener("click", fetchData());
//document.getElementById("getRecipeBtn").onclick = checkData();
// fetchData();
hideImage(); 
var foodName = document.getElementById("foodname").value = '';
hideArrow();
var checkSearch = '';
var data = [];
async function fetchData() {
  showSpinner();
  var arrayLength = 0;
  var recipeTags = '';
  ClickDisabled();
  try {

      //tiap kali seach kosongkan dulu semua cardnya dan paginated list
      data = [];
      let cardList = document.getElementById("special__grid");
      let cekItem = cardList.querySelectorAll(".blog__card");
      cekItem.forEach((element) => console.log(element));


      let listItems = cardList.querySelectorAll(".blog__card").forEach(e => e.remove());;
      
      let paginationNumbers = document.getElementById("pagination-numbers");
      let listpage = paginationNumbers.querySelectorAll(".pagination-number").forEach(e => e.remove());;
      
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
        document.getElementById("search_box_notif").innerHTML = 'Maaf resep tidak ditemukan...';
        showImage();
        hideArrow();
      }
      else
      {
        hideImage();
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
  
          }
          var getArrowPrev = document.getElementById("prev-button");
          getArrowPrev.style.display = "block";
          var getArrowNext = document.getElementById("next-button");
          getArrowNext.style.display = "block";
          paginatedWeb();
        }
        
      }

  }
  catch (error) {
    hideSpinner();
    console.error(error);
  }
  ClickEnabled();
  hideSpinner();
}