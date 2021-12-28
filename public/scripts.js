const cards = document.querySelectorAll('.card');

for(let card of cards) {
    card.addEventListener('click', () => { 
        const revenueId = card.getAttribute('id'); 
        window.location.href = `/details/${revenueId}`; 
    });
}

// Show and hide
const ingredients = document.querySelector('.ingredients');
const preparation = document.querySelector('.method-of-preparation');
const information = document.querySelector(".additional-information");

if(ingredients || preparation || information) {
    hideIngredients();
    hidePreparation();
    hideInformation();
}

function hideIngredients() {
    const ingredientsSpan = document.querySelector('.ingredients span');
    
    ingredientsSpan.addEventListener('click', () => {
        if(ingredientsSpan.innerHTML == "Esconder") {
            ingredientsSpan.innerHTML = "Mostrar";
            ingredients.className += " hide";
        } else {
            ingredientsSpan.innerHTML = "Esconder";
            ingredients.className = "ingredients";
        }
    });
}


function hidePreparation() {
    const preparationSpan = document.querySelector('.method-of-preparation span');
    
    preparationSpan.addEventListener('click', () => {
        if(preparationSpan.innerHTML == "Esconder") {
            preparationSpan.innerHTML = "Mostrar";
            preparation.className += " hide";
        } else {
            preparationSpan.innerHTML = "Esconder";
            preparation.className = "method-of-preparation";
        }
    });
}

function hideInformation() {
    const informationSpan = document.querySelector('.additional-information span');

    information.addEventListener('click', () => {
        if(informationSpan.innerHTML == "Esconder") {
            informationSpan.innerHTML = "Mostrar";
            information.className += " hide";
        } else {
            informationSpan.innerHTML = "Esconder";
            information.className = "method-of-preparation";
        }
    });
}

// Logic for removing input 
// on pages other than the create page
const recipeFields = document.querySelector('.recipe-fields');

if(recipeFields) {
    displayInput();
}

function displayInput() {
    const currentPage = location.pathname;
    const inputIngredient = document.querySelector('.ingredient input');
    const inputPreparation = document.querySelector('.input-script');

    let href = String(currentPage);

    if(href != '/admin/recipes/create') {
        inputIngredient.parentNode.removeChild(inputIngredient);
        inputPreparation.parentNode.removeChild(inputPreparation);
    }
}


// Add new inputs 
const btnAddIngredient = document.querySelector('.add-ingredient');
const btnAddPreparation = document.querySelector('.add-preparation');

if(btnAddIngredient || btnAddPreparation) {
    addIngredient();
    addPreparation();
}

function addIngredient() {
    const box = document.querySelector('.box-ingredients');

    btnAddIngredient.addEventListener('click', () => {
        const newInput = document.createElement('input');
        
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('name', 'ingredients[]');

        box.appendChild(newInput);
    });
}

function addPreparation() {
    const box = document.querySelector('.box-preparation');

    btnAddPreparation.addEventListener('click', () => {
        const newInput = document.createElement('input');
        
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('name', 'preparation[]');

        box.appendChild(newInput);
    });
}

const pagination = document.querySelector('.pagination');
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total);

let elements = "";

for(let page of pages) {
    if(String(page).includes("...")) {
        elements += `<span href="?page=${page}"> ${page} </span>`
    } else {
        elements += `<a href="?page=${page}"> ${page} </a>`
    }

}

pagination.innerHTML = elements;

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage;

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
        
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...");
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1);
            }
            
            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}
