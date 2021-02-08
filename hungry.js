//required elements
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById('search-submit');
const searchOutput = document.getElementById("search-output");

searchSubmit.addEventListener("click", function () { fetchData(searchInput) });

//fecthing meal data
const fetchData = (searchInput) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => displayMeal(data))
        .catch(error => displayError(error))
}

function displayError(error) {
    //console.log("No data found");    
    searchOutput.innerHTML = `<h3>Sorry no data found</h3>`;
}

function displayMeal(data) {
    if (data.meals == null) {
        console.log("no meals found at this moment");
        searchOutput.innerHTML = `<div id="search-error"><h3>Sorry no meal found at this moment</h3></div>`;
    } else {
        displayMealData(data.meals);
    }
}

function displayMealData(dataArray) {
    //clear prev data    
     while (searchOutput.hasChildNodes()) {
        searchOutput.removeChild(searchOutput.firstChild);
    }
    //create divs
    const insidesearchOutput = `
    <div id="search-header"><h3>: Search result :</h3></div>
    <div id="meal-details"></div>
    <div id="search-result"></div>
    <div id="result-error"></div>
  `
  searchOutput.innerHTML = insidesearchOutput;
    
    dataArray.forEach(element => {
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal-container";
        mealDiv.innerHTML = `<div onclick="mealDetails(${element.idMeal})" ><div class="meal-image"><img src=${element.strMealThumb}></div><div class="meal-name">${element.strMeal}</div></div>`;
        const mealResult = document.getElementById("search-result");
        mealResult.appendChild(mealDiv);        
    });

}

const mealDetails = (mealId) => {
    //console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealDetails(data))
        .catch(error => displayError(error))
}

function displayMealDetails(data) {
    //console.log(data.meals);
    const ingredientObject = data.meals[0];
    for (ingredient in ingredientObject) {
        console.log(ingredient);
    }
    const mealDetailsDiv = document.getElementById("meal-details");
    mealDetailsDiv.innerHTML = `
    <div id="meal-ingredients-list">
    <div class="meal-image"><img src=${ingredientObject.strMealThumb}></div>
    <h2>${ingredientObject.strMeal} </h2>
    <h4>Ingredients : </h4>
    <ul>
    <li>${ingredientObject.strIngredient1}</li>
    <li>${ingredientObject.strIngredient2}</li>
    <li>${ingredientObject.strIngredient3}</li>
    <li>${ingredientObject.strIngredient4}</li>
    <li>${ingredientObject.strIngredient5}</li>
    <li>${ingredientObject.strIngredient6}</li>
    </ul>
    </div>
    `
}

function showMealDeatails(mealid) {
    const mealDetailsDiv = document.createElement("div");
    mealDiv.className = "meal-container";
    mealDiv.innerHTML = `<div class="meal-image"><img src=${element.strMealThumb}></div><div class="meal-name">${element.strMeal}</div>`;
    const mealResult = document.getElementById("search-result");
    mealResult.appendChild(mealDiv);
}