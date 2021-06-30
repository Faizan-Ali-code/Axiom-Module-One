const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const random = document.getElementById("random");
const form = document.getElementById("form");
const meals = document.getElementById("meals");
const mealDetail = document.getElementById("mealDetail");
const searchResults = document.getElementById("search-results");


function searchMeal(e){
    e.preventDefault();
   const searchText =  search.value;
   
   if(searchText.trim()){
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
       .then(res => res.json())
       .then(data => {


        if(data.meals === null){
            searchResults.innerHTML = `<h2>No Search results for ${searchText}</h2>`;
        }
        else{
            searchResults.innerHTML = `<h2>Search results for ${searchText}</h2>`;
            meals.innerHTML = data.meals.map( meal => `
            <div class=mealDiv >
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            
                <div class="meal-info" data-mealID="${meal.idMeal}">
                   <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `)
            .join('')
            
        }
        
       });
       //Clear the input text after fetch
       search.value = '';
   }
   
   else{
      alert("Please Enter Valid Name");
   }
   //clear the selectedmeal
   mealDetail.innerHTML ='';
}

//definition of function getMeal(mealId);
function getMeal(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
       const meal = data.meals[0];
      
        displayMeal(meal);
    });
}

//definition of the function displayMeal(meal);
function displayMeal(meal){
    searchResults.innerHTML ='';
    meals.innerHTML ='';
    console.log(meal);
    const ingredients = [];
    for(let i=1 ; i<=20 ; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}:${meal[`strMeasure${i}`]}` );
        }
        else{
            break;
        }
    };

    //Render data into UI
    mealDetail.innerHTML = `
    <div class="selected-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strCategory}">
    <div class="selected-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="selected-meal-instructions">
      <p>${meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
      ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
    </div>
    `
    
}

//Events 
// 1. listen for form submit
form.addEventListener("submit",searchMeal);

// 2. listen for click on meals
meals.addEventListener("click",e =>{
    const mealInfo = e.path.find(item =>{
        if(item.classList){
           return item.classList.contains("meal-info");
       }
       else{
           return false;
       }
    });

    if(mealInfo){
        const mealId = mealInfo.getAttribute("data-mealid");
        
        getMeal(mealId);
    }
   
});