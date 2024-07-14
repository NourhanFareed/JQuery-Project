// * ================ Global Declaration ================
let dataContainer = document.querySelector(".dataContainer");
// let categoriesContainer = document.querySelector(".categoriesContainer");

// * ===============================================

// ? =================== PageLoader=================

$(window).on("load", () => {
  setTimeout(() => {
    $(".loadingPage").fadeOut(300);
  }, 1000);
  randomMealData();
  clearInputs();
  formClearInputs();
});

function removeSecondLoader() {
  $(".secondLoadingPage").addClass("d-block");
  $(".secondLoadingPage").removeClass("d-none");
  setTimeout(() => {
    $(".secondLoadingPage").fadeOut(70, function () {
      $(".secondLoadingPage").remove(); //makes page more lightweight
    });
  }, 2000);
}

// ? ===============================================

// & ================= SideNav ====================

// * onclick nav Icon:

$("#open").on("click", () => {
  if ($(".nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

function openSideNav() {
  $(".menu-close-icon").removeClass("fa-bars");
  $(".menu-close-icon").addClass("fa-xmark");
  $(".nav").animate({ left: `0px` }, 300);

  $("#searchBtn").animate(
    {
      top: `0px`,
    },
    200
  );
  $("#categories").animate(
    {
      top: `0px`,
    },
    300
  );
  $("#area").animate(
    {
      top: `0px`,
    },
    400
  );
  $("#ingredients").animate(
    {
      top: `0px`,
    },
    500
  );
  $("#contact").animate(
    {
      top: `0px`,
    },
    600
  );
}

function closeSideNav() {
  let headerWidth = $("#header").outerWidth(true);
  $(".nav").animate({ left: `-${headerWidth}px` }, 800);
  $(".menu-close-icon").addClass("fa-bars");
  $(".menu-close-icon").removeClass("fa-xmark");

  $("#searchBtn").animate(
    {
      top: `300px`,
    },
    600
  );
  $("#categories").animate(
    {
      top: `300px`,
    },
    500
  );
  $("#area").animate(
    {
      top: `300px`,
    },
    400
  );
  $("#ingredients").animate(
    {
      top: `300px`,
    },
    300
  );
  $("#contact").animate(
    {
      top: `300px`,
    },
    200
  );
}
setTimeout(() => {
  closeSideNav();
}, 100);

// & ===============================================

// ^ ================= SearchInputs ================

// * onclick searchBtn:

$("#searchBtn").on("click", () => {
  closeSideNav();
  removeSecondLoader();
  $("#searchPage").removeClass("d-none");
  $("#searchPage").addClass("d-block");
  $("#home").removeClass("d-flex");
  $("#home").addClass("d-none");
  clearInputs();
});

function clearInputs() {
  let searchByName = document.querySelector("#searchByName");
  let searchByFirstLetter = document.querySelector("#searchByFirstLetter");

  searchByName.value = "";
  searchByFirstLetter.value = "";
}

$(document).ready(function () {
  $("#searchByName").on("input", function () {
    $("#home").removeClass("d-none");
    $("#home").addClass("d-flex");
    let mealName = $("#searchByName").val();

    if (mealName) {
      searchByName(mealName);
    } else {
      searchByName([]);
    }
  });
});

$("#searchByFirstLetter").on("input", function () {
  $("#home").removeClass("d-none");
  $("#home").addClass("d-flex");
  let mealLetter = $("#searchByFirstLetter").val();
  if (mealLetter) {
    searchByFirstLetter(mealLetter);
  } else {
    searchByFirstLetter([]);
  }
});

function searchByName(mealName) {
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
    dataType: "json",
    success: function (data) {
      displayMealResults(data.meals);
    },
  });
}

function searchByFirstLetter(mealLetter) {
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`,
    dataType: "json",
    success: function (data) {
      displayMealResults(data.meals);
    },
  });
}

function displayMealResults(arr) {
  dataContainer.innerHTML = "";
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3 col-12 d-flex justify-content-center align-items-center">
                <div onclick="mealData('${arr[i].idMeal}')" class="card" id="card">
                <div class="icon w-100">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}">
                </div>    
                    <div class="content span py-3">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }
  console.log(cartona);
  dataContainer.innerHTML = cartona;
}

// ^ ===============================================

// ! Diplay Function ===============================

function displayMeals(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3 col-12 d-flex justify-content-center align-items-center">
                <div onclick="mealData('${arr[i].idMeal}')" class="card">
                <div class="icon w-100">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}">
                </div>    
                    <div class="content span py-3">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  dataContainer.innerHTML = cartona;
}

// ! ==================================================

// ~ Categories  ===============================================

// * Onclick Categories:

$("#categories").on("click", () => {
  closeSideNav();
  removeSecondLoader();
  $("#home").removeClass("d-none");
  $("#home").addClass("d-flex");
  $("#searchPage").removeClass("d-block");
  $("#searchPage").addClass("d-none");
  categoriesData();
});

async function categoriesData() {
  dataContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  categoriesDisplay(response.categories);
}

function categoriesDisplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                  <div onclick="categoriesListDetails('${
                    arr[i].strCategory
                  }')" class="card">
                      <div class="icon w-100">
                          <img class="w-100" src="${
                            arr[i].strCategoryThumb
                          }" alt="">
                      </div>
                      <div class="content py-3 d-flex justify-content-start align-items-center ">
                          <h3 class="text-center fw-medium">${
                            arr[i].strCategory
                          }</h3>
                          <p class="text-center fw-normal">${arr[
                            i
                          ].strCategoryDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                      </div>

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

async function categoriesListDetails(idcategory) {
  closeSideNav();
  dataContainer.innerHTML = "";
  removeSecondLoader();
  // console.log("Hi!");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${idcategory}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

function categoriesListDetailsDisplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-md-3 col-12 d-flex justify-content-center align-items-center">
                  <div class="card" onclick="mealData(arr[i].idMeal)">
                      <div class="icon w-100">
                          <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                      </div>
                      <div class="content p-3">
                          <h3 id="" class="mealName text-left fw-medium d-flex justify-content-start align-items-center ">${arr[i].strMeal}</h3>
                         
                      </div>

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

async function mealData(idMeal) {
  closeSideNav();
  dataContainer.innerHTML = "";
  removeSecondLoader();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  response = await response.json();
  console.log(response);
  mealDataDisplay(response.meals[0]);
}

function mealDataDisplay(arr) {
  // console.log(arr); // Check the structure of the arr object

  $("#searchByFirstLetter").slideUp(100);
  $("#searchByName").slideUp(100);

  // * loop ingredients[i]:
  // *=====================
  let recipeIngredients = "";

  for (let i = 0; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      recipeIngredients += `<li class="alert alert-info m-2 p-1">${
        arr[`strMeasure${i}`]
      } ${arr[`strIngredient${i}`]}</li>`;
    }
  }
  // * Split tags string if existed:
  // *=============================
  let tags;
  if (arr.strTags) {
    tags = arr.strTags.split(",");
  } else {
    tags = "";
  }
  // * Loop tagstring[i]:
  // * ==================
  let tagsString = "";

  for (let i = 0; i < tags.length; i++) {
    tagsString += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  // * Display data :
  // *=====================
  let cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3 mt-0" src="${arr.strMealThumb}"
                    alt="">
                    <h2 class="text-left text-white">${arr.strMeal}</h2>
                </div>
                <div class="col-md-8  text-white">
                    <h2>Instructions</h2>
                    <p>${arr.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${recipeIngredients} 
                    </ul>

                    <h3>Tags:</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsString}
                    </ul>

                    <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
    `;
  // }
  // console.log(cartona); // Check the HTML structure of cartona
  // console.log(dataContainer); // Check if dataContainer exists and is correctly referenced
  dataContainer.innerHTML = cartona;

  // console.log("Hi there!");
}

// ~  Categories ===============================================

// ! Random Function Display ============================================

// * Onload window Data Display:

async function randomMealData() {
  closeSideNav();
  dataContainer.innerHTML = "";
  removeSecondLoader();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  response = await response.json();

  randomMealDisplay(response.meals);
}

function randomMealDisplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                  <div onclick="mealData('${arr[i].idMeal}')" class="card"> 
                      <div class="icon w-100">
                          <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                      </div>
                      <div class="content py-3 d-flex justify-content-start align-items-center ">
                          <h3 class="text-center fw-medium">${arr[i].strMeal}</h3>

                      </div>

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

// async function randomMealDetails(idMeal) {
//   closeSideNav();
//   dataContainer.innerHTML = "";
//   removeSecondLoader();
//   let response = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//   );
//   response = await response.json();
//   console.log(response);
//   displayMeals(response.meals.slice(0, 20));
// }

// function rondomMealDetailsDisplay(arr) {
//   console.log(arr); // Check the structure of the arr object

//   // * loop ingredients[i]:
//   // *=====================
//   let recipeIngredients = "";

//   for (let i = 0; i <= 20; i++) {
//     if (arr[`strIngredient${i}`]) {
//       recipeIngredients += `<li class="alert alert-info m-2 p-1">${
//         arr[`strMeasure${i}`]
//       } ${arr[`strIngredient${i}`]}</li>`;
//     }
//   }
//   // * Split tags string if existed:
//   // *=============================
//   let tags;
//   if (arr.strTags) {
//     tags = arr.strTags.split(",");
//   } else {
//     tags = "";
//   }
//   // * Loop tagstring[i]:
//   // * ==================
//   let tagsString = "";

//   for (let i = 0; i < tags.length; i++) {
//     tagsStr += `
//         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
//   }

//   // * Display data :
//   // *=====================
//   let cartona = `
//     <div class="col-md-4">
//                     <img class="w-100 rounded-3 mt-0" src="${arr.strMealThumb}"
//                     alt="">
//                     <h2 class="text-left text-white">${arr.strMeal}</h2>
//                 </div>
//                 <div class="col-md-8  text-white">
//                     <h2>Instructions</h2>
//                     <p>${arr.strInstructions}</p>
//                     <h3><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
//                     <h3><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
//                     <h3>Recipes :</h3>
//                     <ul class="list-unstyled d-flex g-3 flex-wrap">
//                         ${recipeIngredients}
//                     </ul>

//                     <h3>Tags :</h3>
//                     <ul class="list-unstyled d-flex g-3 flex-wrap">
//                         ${tagsStr}
//                     </ul>

//                     <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
//                     <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
//                 </div>
//     `;

//   console.log(cartona); // Check the HTML structure of cartona
//   console.log(dataContainer); // Check if dataContainer exists and is correctly referenced
//   dataContainer.innerHTML = cartona;

//   console.log("Hi there!");
// }

console.log("Hi!");

// ! Random Function Display ============================================

// todo:  Areas =========================================================

// * Onclick Areas:

$("#area").on("click", () => {
  closeSideNav();
  removeSecondLoader();
  $("#home").removeClass("d-none");
  $("#home").addClass("d-flex");
  $("#searchPage").removeClass("d-block");
  $("#searchPage").addClass("d-none");
  areaData();
});

async function areaData() {
  dataContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);
  console.log("Hi!");
  areaDisplay(response.meals);
}

function areaDisplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                  <div  class="card text-white">
                    <div onclick="areaMealData('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

async function areaMealData(area) {
  closeSideNav();
  dataContainer.innerHTML = "";
  removeSecondLoader();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  console.log(response);
  displayMeals(response.meals.slice(0, 20));
}

function areaMealDataDiplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                  <div onclick="categoriesListDetails('${
                    arr[i].strCategory
                  }')" class="card">
                      <div class="icon w-100">
                          <img class="w-100" src="${
                            arr[i].strCategoryThumb
                          }" alt="">
                      </div>
                      <div class="content py-3 d-flex justify-content-start align-items-center ">
                          <h3 class="text-center fw-medium">${
                            arr[i].strCategory
                          }</h3>
                          <p class="text-center">${arr[i].strCategoryDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                      </div>

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

// todo:  Areas =========================================================

// & Ingredients ==========================================================

// * Onclick Ingredients:

$("#ingredients").on("click", () => {
  closeSideNav();
  removeSecondLoader();
  $("#home").removeClass("d-none");
  $("#home").addClass("d-flex");
  $("#searchPage").removeClass("d-block");
  $("#searchPage").addClass("d-none");
  ingredientsData();
});

async function ingredientsData() {
  dataContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  console.log("Hi!");
  ingredientsDisplay(response.meals.slice(0, 20));
}

function ingredientsDisplay(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `

      <div class="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                  <div  class="card text-white">
                    <div onclick="ingredientsMealData('${
                      arr[i].strIngredient
                    }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p class="text-center">${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                      </div>
                    

                  </div>
                </div>
      `;
  }
  dataContainer.innerHTML = cartona;
}

async function ingredientsMealData(ingredients) {
  closeSideNav();
  dataContainer.innerHTML = "";
  removeSecondLoader();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  console.log(response);
  displayMeals(response.meals.slice(0, 20));
  console.log("Chicken");
}

// & Ingredients ===========================================================

// ? Contact =============================================================

// * Onclick Contact Us:

$("#contact").on("click", () => {
  closeSideNav();
  // removeSecondLoader();
  $("#home").removeClass("d-flex");
  $("#home").addClass("d-none");
  $("#searchPage").removeClass("d-block");
  $("#searchPage").addClass("d-none");
  $("#contactPage").removeClass("d-none");
  $("#contactPage").addClass("d-flex");
});

// * Form Declaration:
const form = document.getElementById("myForm");
const inputs = form.elements;
const submitButton = document.getElementById("submit");
// * Regex:
const regexPatterns = {
  name: /^[a-zA-Z ]{2,30}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\d{10}$/,
  age: /^\d{1,3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};
// * Form Event:
form.addEventListener("input", () => {
  let isValid = true;
  // * loop all inputs data:
  for (const input of inputs) {
    const { id, value } = input;
    const regexPattern = regexPatterns[id];

    if (regexPattern) {
      if (!regexPattern.test(value)) {
        document.getElementById(`${id}Error`).classList.remove("d-none");
        document.getElementById(`${id}Error`).classList.add("d-block");
        document.getElementById(
          "nameError"
        ).innerText = ` Special characters and numbers not allowed`;
        document.getElementById(
          "emailError"
        ).innerText = ` Email not valid *exemple@yyy.zzz`;
        document.getElementById(
          "phoneError"
        ).innerText = ` Enter valid Phone Number`;
        document.getElementById("ageError").innerText = ` Enter valid age`;
        document.getElementById(
          "passwordError"
        ).innerText = ` Enter valid password *Minimum eight characters, at least one letter and one
                        number:*`;

        isValid = false;
      } else {
        document.getElementById(`${id}Error`).innerText = "";
        document.getElementById(`${id}Error`).classList.add("d-none");
        document.getElementById(`${id}Error`).classList.remove("d-block");
      }
    }
  }
  // * Password & Repassword condition to submit:
  if (inputs.password.value !== inputs.repassword.value) {
    document.getElementById("repasswordError").innerText =
      "Enter valid repassword, Passwords do not match";
    isValid = false;
  } else {
    document.getElementById("repasswordError").innerText = "";
  }

  submitButton.disabled = !isValid;
});

function formClearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("age").value = "";
  document.getElementById("password").value = "";
  document.getElementById("repassword").value = "";
}

// ? Contact =============================================================
