
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