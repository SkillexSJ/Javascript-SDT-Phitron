const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mealsContainer = document.getElementById("meals-container");
const resultsTitle = document.getElementById("results-title");
const mealDetailsContent = document.getElementById("meal-details-content");
const mealModal = new bootstrap.Modal(document.getElementById("mealModal"));

// Event
searchForm.addEventListener("submit", handleSearch);

// --- Functions ---
function handleSearch(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    alert("Please enter a meal name to search.");
    return;
  }

  fetchMeals(searchTerm);
}

function fetchMeals(term) {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      displayMeals(data.meals, term);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      mealsContainer.innerHTML = `<div class="col-12 text-center text-danger"><p>An error occurred. Please try again later.</p></div>`;
    });
}

function displayMeals(meals, term) {
  mealsContainer.innerHTML = "";

  if (!meals) {
    resultsTitle.textContent = `No results found for "${term}"`;
    mealsContainer.innerHTML = `<div class="col-12 text-center text-muted"><p>Please try a different search term.</p></div>`;
    return;
  }

  resultsTitle.textContent = `Showing results for "${term}"`;
  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "col-sm-6 col-md-4 col-lg-3";
    mealCard.innerHTML = `
                    <div class="card meal-card" data-meal-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${meal.strMeal}</h5>
                        </div>
                    </div>
                `;

    mealCard.querySelector(".meal-card").addEventListener("click", () => {
      fetchMealDetails(meal.idMeal);
    });
    mealsContainer.appendChild(mealCard);
  });
}

function fetchMealDetails(mealID) {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      displayMealDetails(data.meals[0]);
    })
    .catch((error) => {
      console.error("Error fetching meal details:", error);
    });
}

function displayMealDetails(meal) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredientsList += `<li class="list-group-item">${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }

  // modal
  document.getElementById("mealModalLabel").textContent = meal.strMeal;
  mealDetailsContent.innerHTML = `
                <div class="text-center mb-3">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded" style="max-width: 300px; width: 100%; height: auto;">
                </div>
                <div class="row g-3">
                    <div class="col-12 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Details</h5>
                                <div class="mb-2">
                                    <strong>Category:</strong>
                                    <p class="mb-1">${meal.strCategory}</p>
                                </div>
                                <div>
                                    <strong>Area:</strong>
                                    <p class="mb-0">${meal.strArea}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Ingredients</h5>
                                <div class="ingredients-scroll" style="max-height: 200px; overflow-y: auto;">
                                    <ul class="list-group list-group-flush">${ingredientsList}</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Instructions</h5>
                        <div class="instructions-scroll" style="max-height: 300px; overflow-y: auto;">
                            <p style="white-space: pre-wrap; line-height: 1.6;">${meal.strInstructions}</p>
                        </div>
                    </div>
                </div>
            `;

  mealModal.show();
}
