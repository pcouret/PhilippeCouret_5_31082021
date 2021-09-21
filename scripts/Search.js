const container = document.getElementById("recipes-list");
for (let i = 0; i < recipes.length; i++) {
    const card = `            <li id="${recipes[i].id}" class="recipe-block">
              <div class="recipe-block__img"></div>
              <div class="recipe">
                <div class="recipe__titleTime">
                  <h2 class="recipe__titleTime__title name">
                    ${recipes[i].name}
                  </h2>
                  <h2 class="recipe__titleTime__time">
                    <img
                      src="img/clock-circle.svg"
                      alt="icone temps"
                      class="icon recipe__titleTime__time--icon"
                    />
                    ${recipes[i].time} min
                  </h2>
                </div>
                <div class="ingredients-description">
                  <div class="Ingredients">
                    <ul class="ingredients-list">
                      ${getIngredients(recipes[i].ingredients)}
                    </ul>
                  </div>
                  <div class="description">
                    <p class="description__text">
                      ${recipes[i].description.length < 70 ? recipes[i].description : recipes[i].description.substring(0, 70) + "..."}
                    </p>
                  </div>
                </div>
              </div>
            </li>`

    container.innerHTML += card
}

let tabIngredients = getAllIngr();
let tabSelectIngr = [];

let tabAppareils = getAllAppl();
let tabSelectAppl = [];

let tabUstensiles = getAllUst();
let tabSelectUst = [];

function getIngredients(ingredientsList) {
    let ingredientLi = ""
    ingredientsList.forEach(element => {
        ingredientLi += `   <li class="ingredient">
                        ${element.ingredient}: <span class="ingredient__quantity">${element.quantite ? element.quantite : element.quantity ? element.quantity : ""} ${element.unit ? element.unit : ""}</span>
                      </li>`
    });
    return ingredientLi;
}


function createFilterList(filterList, filterType) {
    let filterLi = ""
    if (filterType === "ingredient") {
        filterList.forEach(oneFilterElement => {
            filterLi += `   <li class=${filterType}>
                                ${oneFilterElement[filterType]}
                              </li>`
        });
    } else if (filterType === "ustensil") {
        filterList.forEach(oneFilterElement => {
            filterLi += `   <li class=${filterType}>
                                ${oneFilterElement}
                              </li>`
        });
    } else if (filterType === "appliance") {
        filterLi += `   <li class=${filterType}>
                                ${filterList}
                              </li>`

    }
    return filterLi;
}

let ingredientsList = document.getElementById("ingredient-list")
let ustensilsList = document.getElementById("ustensile-list")
let apliancesList = document.getElementById("appliance-list")
let ingredientsListDom = ""
let ustensilsListDom = ""
let apliancesListDom = ""


recipes.forEach(oneRecipe => {
    ingredientsListDom += createFilterList(oneRecipe.ingredients, "ingredient")
    ustensilsListDom += createFilterList(oneRecipe.ustensils, "ustensil")
    apliancesListDom += createFilterList(oneRecipe.appliance, "appliance")
});
ingredientsList.innerHTML = ingredientsListDom
ustensilsList.innerHTML = ustensilsListDom
apliancesList.innerHTML = apliancesListDom





function searchIngredients(ingredientsSearchList) {
    let tabIngr = [];
    ingredientsSearchList.forEach(recipes => {
        recipes.ingredients.forEach(ingredient => {
            const index = tabIngr.findIndex(i => Utils.normScripture(i)=== Utils.normScripture(ingredient.ingredient))
            if (index === -1){
                tabIngr.push(ingredient.ingredient)
            }
        })
        // const ingredients = _recipes.ingredients.map(i =>) i.ingredient)
        // tabIngr = [...tabIngr, ...ingredients]
    })
    console.log(tabIngr)
    tabIngr.sort();
    return tabIngr;
};

function getAllIngr() {
    let tabAllIngr = [];
    recipes.forEach(recette => {
        recette.ingredients.forEach(currentIngredient => {
            let ingr = currentIngredient.ingredient;
            if (!tabAllIngr.find(i=>Utils.normString(i)===Utils.normString(ingr))){
                tabAllIngr.push(ingr.toLowerCase());
            }
        })
    })
    tabAllIngr.sort();
    return tabAllIngr;
}

// function searchAppareil(appareilsSearchList) {
//     let tabApp = [];
//     appareilsSearchList.forEach(_recipe => {
//         recette.appareils.forEach(appareil => {
//             const index = tabApp.findIndex(i => Utils.normScripture(i)=== Utils.normScripture(ingredient.ingredient))
//             if (index === -1){
//                 tabApp.push(appareil.appareil)
//             }
//         })
        
//     })
//     console.log(tabApp)
//     tabApp.sort();
//     return tabApp;
// };


function getAllAppl() {
    let tabAllAppl = [];
    recipes.forEach(recette => {
        recette.appliances.forEach(currentAppliance => {
            let appl = currentAppliance.appliance;
            if (!tabAllAppl.find(i=>Utils.normString(i)===Utils.normString(appl))){
                 tabAllAppl.push(appl.toLowerCase());
            }
        })
    })
    tabAllAppl.sort();
    return tabAllAppl;
}



function getAllUst() {
    let tabAllUst = [];
    recipes.forEach(recette => {
        recette.ustensils.forEach(currentUstensile => {
            let ust = currentUstensile.ustensils;
            if (!tabAllUst.find(i=>Utils.normString(i)===Utils.normString(ust))){
                tabAllUst.push(ust.toLowerCase());
            }
        })
    })
    tabAllUst.sort();
    return tabAllUst;
}



function displayIngrList() {
    loadAllIngr();
    document.getElementById("suggIngr").style.display = "flex";
    document.querySelector("ingrFilter .fa-chevron-up").style.display = "block";
    document.querySelector("ingrFilter .fa-chavron-down").style.display = "none";
}

// function hideIngrList() {
//     document.getElementById("suggIngr").style.display = "none";
//     document.querySelector("ingrFilter .fa-chevron-up").style.display = "none";
//     document.querySelector("ingrFilter .fa-chavron-down").style.display = "block";
// }

function isHidden(el) {
    return (el.offsetParent === null)
}

function showingredientfilter(){
    if (isHidden(document.getElementById("ingredient-list"))){
        document.getElementById("ingredient-list").style.display = "block"
        document.getElementById("appliance-list").style.display = "none"
        document.getElementById("ustensile-list").style.display = "none"
        document.querySelector(".fa-chevron-up").style.display = "block";
        document.querySelector(".fa-chevron-down").style.display = "none";
    } else {
        document.getElementById("ingredient-list").style.display = "none"
        document.querySelector(".fa-chevron-down").style.display = "block";
        document.querySelector(".fa-chevron-up").style.display = "none";
    }
    

}

function showappareilfilter(){
    if (isHidden(document.getElementById("appliance-list"))){
        document.getElementById("appliance-list").style.display = "block"
        document.getElementById("ingredient-list").style.display = "none"
        document.getElementById("ustensile-list").style.display = "none"
        document.querySelector(".fa-chevron-up").style.display = "block";
        document.querySelector(".fa-chevron-down").style.display = "none";
    } else {
        document.getElementById("appliance-list").style.display = "none"
        document.querySelector(".fa-chevron-down").style.display = "block";
        document.querySelector(".fa-chevron-up").style.display = "none";
    }
}

function showustensilefilter(){
    if (isHidden(document.getElementById("ustensile-list"))){
        document.getElementById("ustensile-list").style.display = "block"
        document.getElementById("ingredient-list").style.display = "none"
        document.getElementById("appliance-list").style.display = "none"
        document.querySelector(".fa-chevron-up").style.display = "block";
        document.querySelector(".fa-chevron-down").style.display = "none";
    } else {
        document.getElementById("ustensile-list").style.display = "none"
        document.querySelector(".fa-chevron-down").style.display = "block";
        document.querySelector(".fa-chevron-up").style.display = "none";
    }
}

let inputfilterIngredient = document.getElementById("search-ingredient")
//let inputfilterIngredient = document.getElementById("search-appareil")
//let inputfilterIngredient = document.getElementById("search-ustensile")

inputfilterIngredient.addEventListener("input", (event) => {
    const list = document.querySelectorAll("#ingredient-list" + "> .ingredient")
    let normalizeInputSearch = Utils.normString(event.target.value.trim())
    let regEx = new RegExp("(" + normalizeInputSearch + ")", 'gi')
    list.forEach((element) => {
        if (Utils.normString(element.innerText).match(regEx) || event.target.value === ""){
            element.style.display = 'list-item'
        } else {
            element.style.display = 'none'
        }
    })
})

// function seachFilterElement(event) {
//     const list = document.querySelectorAll("#" + event.target.id + "> .filter")
//     let normalizeInputSearch = Utils.normString(event.target.value.trim())
//     let regEx = new RegExp("(" + normalizeInputSearch + ")", 'gi')
//     list.forEach((element) => {
//         if (Utils.normString(element.innerText).match(regEx) || event.target.value === ""){
//             element.style.display = 'list-item'
//         } else {
//             element.style.display = 'none'
//         }
//     })
// }

// document.getElementById("search-ingredient").addEventListener("input" , seachFilterElement())

let inputfilterAppareils = document.getElementById("search-appareil")

inputfilterAppareils.addEventListener("input", (event) => {
    const list = document.querySelectorAll("#appareil-list" + "> .appareil")
    let normalizeInputSearch = Utils.normString(event.target.value.trim())
    let regEx = new RegExp("(" + normalizeInputSearch + ")", 'gi')
    list.forEach((element) => {
        if (Utils.normString(element.innerText).match(regEx) || event.target.value === ""){
            element.style.display = 'list-item'
        } else {
            element.style.display = 'none'
        }
    })
})

let inputfilterUstensiles = document.getElementById("search-ustensile")

inputfilterUstensiles.addEventListener("input", (event) => {
    const list = document.querySelectorAll("#ustensile-list" + "> .ustensile")
    let normalizeInputSearch = Utils.normString(event.target.value.trim())
    let regEx = new RegExp("(" + normalizeInputSearch + ")", 'gi')
    list.forEach((element) => {
        if (Utils.normString(element.innerText).match(regEx) || event.target.value === ""){
            element.style.display = 'list-item'
        } else {
            element.style.display = 'none'
        }
    })
})