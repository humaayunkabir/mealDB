const loadMeal = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displyMeals(data.meals))
}


const displyMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);

    });
}


function searchBtn() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeal(searchText);
    searchField.value = '';
}


const loadMealDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displyMealDetails(data.meals[0]))

}

const displyMealDetails = meal => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    const detailDiv = document.createElement('div')
    detailDiv.classList.add('card')
    detailDiv.innerHTML = `
        <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap">
        <div class="card-body">
            <h3 class="card-title">${meal.strMeal}</h3>
            <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
        </div>
    `;
    detailContainer.appendChild(detailDiv);

}

loadMeal('');