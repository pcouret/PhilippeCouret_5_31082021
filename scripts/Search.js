const container = document.getElementById("recipes-list");
  for (let i=0;i<recipes.length;i++){
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
                      ${recipes[i].description.length<70? recipes[i].description: recipes[i].description.substring(0,70)+"..."}
                    </p>
                  </div>
                </div>
              </div>
            </li>`

            container.innerHTML += card
  }
          function getIngredients(ingredientsList){
            let ingredientLi= ""
          ingredientsList.forEach(element => {
            ingredientLi+=`   <li class="ingredient">
                        ${element.ingredient}: <span class="ingredient__quantity">${element.quantite ?element.quantite : element.quantity?element.quantity: ""} ${element.unit?element.unit: ""}</span>
                      </li>`
          });
          return ingredientLi;
          }

          
          function createFilterList(filterList , filterType){
            let filterLi= ""
            if (filterType === "ingredient"){
                filterList.forEach(oneFilterElement => {
                    filterLi+=`   <li class=${filterType}>
                                ${oneFilterElement[filterType]}
                              </li>`
                  });
            }else if (filterType === "ustensil"){
                filterList.forEach(oneFilterElement => {
                    filterLi+=`   <li class=${filterType}>
                                ${oneFilterElement}
                              </li>`
                  });
            }else if (filterType === "appliance"){
                    filterLi+=`   <li class=${filterType}>
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
